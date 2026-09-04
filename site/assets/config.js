// Everything that changes when this index is forked or rehosted lives here.
export const CONFIG = {
  // The index repository submissions are opened against.
  owner: 'FAFF0x',
  repo: 'gen2recomp-mod-index',
  branch: 'main',

  // Where the mod API itself is documented.
  wiki: 'https://github.com/DramaticShape/pokemon-gen1-recomp-project/wiki',
  engine: 'https://github.com/DramaticShape/pokemon-gen1-recomp-project',

  // Optional. A GitHub OAuth code->token exchange endpoint, because the
  // exchange needs a client secret and a static page cannot hold one.
  // Deploy oauth-worker/ and put its URL here to light up "Sign in with
  // GitHub"; leave empty and the submit page falls back to a personal access
  // token (still a full API submission) or a prefilled github.com form.
  oauthProxy: '',
  oauthClientId: '',
};
