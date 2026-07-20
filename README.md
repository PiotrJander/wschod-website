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
  images/               # all media (brand assets + CMS uploads)
```

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
