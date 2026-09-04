# Submitting a mod

## The easy way

Open the [submission helper](https://faff0x.github.io/gen2recomp-mod-index/),
fill in the form, sign in with GitHub, press **Open pull request**. The page
forks this repo to your account, commits `mods/<Author>@<id>/`, and opens the
PR. It validates against the same schema CI does, so if the form is happy the
build usually is too.

No account, or you would rather not hand a token to a web page? The same page's
**Submit by hand** button gives you prefilled github.com links, and the layout
below is all you actually need.

## The manual way

Add one folder:

```
mods/<Author>@<mod id>/
  meta.json
  description.md
  thumbnail.png      (optional; or .jpg, 2 MB max)
```

`<mod id>` must be your `manifest.json`'s `id`. `<Author>` is your name with
`@`, `/` and `\` removed. Copy [`examples/YourName@example_mod/`](examples/YourName@example_mod)
and edit it, then check your work:

```sh
node scripts/validate.mjs mods/YourName@your_mod
```

## Before you submit

- `python3 tools/modkit.py validate your_mod --strict` passes in the engine repo.
- `python3 tools/modkit.py lint your_mod` passes — **no ROM-derived content**
  in anything you distribute. No extracted PNGs, no chip-audio banks, no ROM
  images, no IPS/BPS/UPS patches. Derived art ships as an asset transform.
- Your download is a `.zip` with the mod's files **at the archive root**, not
  nested in a folder. `python3 tools/modkit.py add-release-workflow your_mod`
  produces exactly that.
- `meta.json` matches your `manifest.json` — same `id`, `api`, `profile`,
  `permissions`, `dependencies`, `conflicts`.

## Keeping the listing current

If your entry has `"github": "owner/repo"` and leaves `automatic_version_check`
on, **do not open a pull request to bump a version**. Tag a release in your own
repo; the nightly job picks it up.

Open a PR to change the listing itself: description, categories, tags,
thumbnail, a moved repository, or a mod that is no longer maintained (say so in
the description — a listing that quietly rots helps nobody).

## What review looks at

CI checks shape, naming, and that the download resolves. A maintainer then
checks the parts a machine cannot:

- the metadata describes the mod that is actually there
- the archive installs the way the launcher expects
- declared permissions match what the code does
- nothing distributed is ROM-derived
- the mod is presented as its author's own work, not as an official product

## House rules

- One entry per mod. Reuploads of someone else's work get closed — link to the
  original instead.
- Name and present your mod as yours. No official branding.
- Descriptions are rendered as markdown with HTML stripped. Do not bother with
  script tags.
- A listing is not an endorsement, and the index makes no claim that a mod is
  safe to run.
