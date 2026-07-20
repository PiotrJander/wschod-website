# Inicjatywa WSCHÓD — strona

Statyczna strona zbudowana w [Eleventy](https://www.11ty.dev/) z systemem
zarządzania treścią [Decap CMS](https://decapcms.org/) (dawniej Netlify CMS).
Hostowana na [Netlify](https://www.netlify.com/).

Dynamiczna jest wyłącznie sekcja bloga (artykuły + zdjęcia) oraz plik PDF
„Plan Na Pokolenia” — wszystko edytowalne przez panel `/admin/`.

## Wymagania

- Node.js 20+ (repo zawiera `.npmrc` wskazujące na `https://registry.npmjs.org/`)

## Lokalne uruchomienie

```bash
npm install
npm start            # serwer deweloperski na http://localhost:8080
```

Budowanie do katalogu `_site/`:

```bash
npm run build
```

### Edycja treści lokalnie (bez logowania)

Decap potrafi zapisywać zmiany bezpośrednio do lokalnych plików dzięki
`local_backend: true` w `admin/config.yml`. W dwóch terminalach:

```bash
npm start            # terminal 1 — strona
npm run cms          # terminal 2 — proxy decap-server
```

Następnie otwórz <http://localhost:8080/admin/>. Zmiany zapisują się do
plików w `src/posts/` oraz `src/_data/plan.json`.

## Struktura projektu

```
src/
  _includes/
    base.njk            # główny layout (head + header + footer + skrypty)
    post.njk            # layout pojedynczego artykułu
    partials/           # head, header, footer (wspólny „chrome”)
  _data/
    site.js             # dane globalne (rok, linki społecznościowe)
    nav.js              # nawigacja
    plan.json           # ścieżka do PDF (zarządzane przez Decap)
  css/style.css         # cały CSS (View Transitions między stronami)
  js/main.js            # progresywne ulepszenia (menu mobilne, kopiowanie IBAN)
  index.njk             # strona główna            → /
  kim-jestesmy.njk      # → /kim-jestesmy/
  o-co-walczymy.njk     # → /o-co-walczymy/
  plan-na-pokolenia.njk # → /plan-na-pokolenia/
  blog.njk              # lista artykułów          → /blog/
  posts/                # artykuły (Markdown)      → /blog/<slug>/
admin/                  # panel Decap CMS          → /admin/
images/                 # zasoby statyczne; images/uploads = media z CMS
```

Strony działają **bez JavaScriptu** (prawdziwe adresy, rok w stopce renderowany
serwerowo). JS dodaje jedynie menu mobilne i kopiowanie numeru konta.
Przejścia między stronami korzystają z cross‑document **View Transitions**
(`@view-transition { navigation: auto; }`).

## Wdrożenie na Netlify

1. Zaloguj się i połącz repo:
   ```bash
   netlify login
   netlify init          # wybierz „Create & configure a new site”, połącz z GitHub
   ```
   Build command (`npm run build`) i katalog publikacji (`_site`) są już
   zdefiniowane w `netlify.toml`.
2. Wdróż produkcyjnie:
   ```bash
   netlify deploy --build --prod
   ```

### Włączenie CMS (jednorazowo, w panelu Netlify)

Decap w produkcji używa `git-gateway` + Netlify Identity:

1. **Site settings → Identity → Enable Identity**.
2. **Identity → Services → Git Gateway → Enable Git Gateway**.
3. **Identity → Registration** ustaw na *Invite only* i zaproś redaktorów
   (**Identity → Invite users**).
4. Redaktor otwiera `/admin/`, akceptuje zaproszenie i loguje się.

## Migracja na inne konto GitHub / Netlify

Repo jest celowo „przenośne” — nie zawiera zaszytych identyfikatorów konta:

1. **GitHub**: utwórz nowe repo na docelowym koncie i zmień remote:
   ```bash
   git remote set-url origin git@github.com:NOWE-KONTO/wschod-website.git
   git push -u origin main
   ```
   W `admin/config.yml` `backend.branch` to `main` — dostosuj, jeśli inny.
2. **Netlify**: na docelowym koncie `netlify init` (lub „Add new site → Import
   from Git”), a następnie powtórz kroki „Włączenie CMS”. `netlify.toml`
   zadziała bez zmian.
3. Zaktualizuj `site.url` w `src/_data/site.js` na docelowy adres (używane w
   metatagach Open Graph i linkach udostępniania).
