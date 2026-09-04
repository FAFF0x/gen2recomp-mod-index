// The one piece the static site cannot do itself.
//
// GitHub's OAuth code->token exchange needs the client secret, and a GitHub
// Pages site has nowhere to hide one. This worker is that exchange and nothing
// else: it takes a `code`, adds the secret, returns the token, and keeps no
// state. Deploy it once, put its URL in site/assets/config.js, and the
// submission page gets a real "Sign in with GitHub" button.
//
// Deploy (Cloudflare Workers free tier is plenty):
//   npm i -g wrangler
//   wrangler secret put GITHUB_CLIENT_SECRET
//   wrangler deploy
//
// Secrets/vars this expects:
//   GITHUB_CLIENT_ID       (var, in wrangler.toml)
//   GITHUB_CLIENT_SECRET   (secret)
//   ALLOWED_ORIGIN         (var, e.g. https://you.github.io)

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = env.ALLOWED_ORIGIN || '';
    const cors = {
      'Access-Control-Allow-Origin': origin === allowed ? origin : allowed,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    };

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405, cors);
    // The token is only ever useful to the page we published; anything else
    // asking is not our submission helper.
    if (allowed && origin !== allowed) return json({ error: 'origin_not_allowed' }, 403, cors);

    let code;
    try {
      ({ code } = await request.json());
    } catch {
      return json({ error: 'bad_request' }, 400, cors);
    }
    if (!code) return json({ error: 'missing_code' }, 400, cors);

    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const doc = await res.json();
    if (doc.error) return json(doc, 400, cors);

    // Hand back the token and nothing else — scope is fixed at authorize time.
    return json({ access_token: doc.access_token, token_type: doc.token_type }, 200, cors);
  },
};

const json = (body, status, headers) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...headers },
  });
