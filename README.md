# Inicjatywa WSCHÓD — website

A static site built with [Eleventy](https://www.11ty.dev/) and managed with
[Decap CMS](https://decapcms.org/) (formerly Netlify CMS). Hosted on
[Netlify](https://www.netlify.com/).

The only dynamic content is the blog (articles + photos) and the
“Plan Na Pokolenia” PDF — everything is editable through the `/admin/` panel.

## Requirements

- Node.js 20+ (the repo ships an `.npmrc` pointing at `https://registry.npmjs.org/`)

## Local development

```bash
npm install
npm start            # dev server at http://localhost:8080
```

Build to the `_site/` directory:

```bash
npm run build
```

### Editing content locally (no login)

Decap can write changes straight to local files thanks to `local_backend: true`
in `admin/config.yml`. In two terminals:

```bash
npm start            # terminal 1 — the site
npm run cms          # terminal 2 — the decap-server proxy
```

Then open <http://localhost:8080/admin/>. Changes are saved to files in
`src/posts/` and `src/_data/plan.json`.

## Project structure

```
src/
  _includes/
    base.njk            # main layout (head + header + footer + scripts)
    post.njk            # single blog-post layout
    partials/           # head, header, footer (shared chrome)
  _data/
    site.js             # global data (year, social links)
    nav.js              # navigation
    plan.json           # path to the PDF (managed by Decap)
  css/style.css         # all CSS (cross-document View Transitions)
  js/main.js            # progressive enhancements (mobile menu, copy IBAN)
  index.njk             # home                     → /
  kim-jestesmy.njk      # → /kim-jestesmy/
  o-co-walczymy.njk     # → /o-co-walczymy/
  plan-na-pokolenia.njk # → /plan-na-pokolenia/
  blog.njk              # article list             → /blog/
  posts/                # articles (Markdown)      → /blog/<slug>/
  admin/                # Decap CMS panel          → /admin/
  images/               # static assets; images/uploads = CMS media
```

Everything the site is made of lives under `src/`. Only tooling/config stays at
the repo root (`eleventy.config.js`, `package.json`, `netlify.toml`, `.npmrc`).

Pages work **without JavaScript** (real URLs, the footer year is rendered on the
server). JS only adds the mobile menu and the copy-account-number button.
Navigation between pages uses cross-document **View Transitions**
(`@view-transition { navigation: auto; }`).

## Deploying to Netlify

1. Log in and link the repo:
   ```bash
   netlify login
   netlify init          # choose “Create & configure a new site”, connect to GitHub
   ```
   The build command (`npm run build`) and publish directory (`_site`) are
   already defined in `netlify.toml`.
2. Deploy to production:
   ```bash
   netlify deploy --build --prod
   ```

### Enabling the CMS (one-time, in the Netlify dashboard)

In production Decap uses `git-gateway` + Netlify Identity:

1. **Site settings → Identity → Enable Identity**.
2. **Identity → Services → Git Gateway → Enable Git Gateway**.
3. Set **Identity → Registration** to *Invite only* and invite editors
   (**Identity → Invite users**).
4. An editor opens `/admin/`, accepts the invitation and logs in.

## Migrating to another GitHub / Netlify account

The repo is intentionally portable — it contains no hard-coded account IDs:

1. **GitHub**: create a new repo on the target account and update the remote:
   ```bash
   git remote set-url origin git@github.com:NEW-ACCOUNT/wschod-website.git
   git push -u origin main
   ```
   In `admin/config.yml`, `backend.branch` is `main` — adjust if you use another.
2. **Netlify**: on the target account run `netlify init` (or “Add new site →
   Import from Git”), then repeat the “Enabling the CMS” steps. `netlify.toml`
   works unchanged.
3. Update `site.url` in `src/_data/site.js` to the target address (used in
   Open Graph meta tags and share links).
