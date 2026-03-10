# DnD Command Sheet

Interactive offline-first Dungeons & Dragons character sheet built as a static web app.

## Open It

- Double-click `index.html`, or
- In the project folder, run `python3 -m http.server 4173` and open `http://127.0.0.1:4173`

## Simple User Guide

1. Open the app in your browser.
2. Fill in your character name, class, level, race, background, and alignment.
3. Enter your ability scores. The app will calculate the modifiers for you.
4. Mark your saving throws, skills, attacks, spell slots, items, resources, and features.
5. If you want to keep the character after closing the browser, open `Customize` -> `Security` and set a passphrase.
6. Use `Export JSON` to save a backup copy of your character file.
7. During a game, use the `Roll` buttons, `Short Rest`, `Long Rest`, and the dice roller to update your sheet quickly.
8. If you want the app on your phone, open the hosted site and install it from your browser menu or the in-app install button.

### Phone install steps

#### Android

1. Open the hosted app in Chrome.
2. Let the page load fully once.
3. Tap `Install App` if the button appears.
4. If the button does not appear, open the Chrome menu.
5. Tap `Install app` or `Add to Home screen`.

#### iPhone or iPad

1. Open the hosted app in Safari.
2. Let the page load fully once.
3. Tap the `Share` button.
4. Tap `Add to Home Screen`.
5. Tap `Add`.

### Simple tips

- Use `New Character` if you want a fresh sheet.
- Use `Duplicate` if you want to copy an existing character.
- Use `Load Demo` if you want to see a finished example first.
- Use `Upload Portrait` instead of pasting image links.
- If you clear your browser data, use your `Export JSON` backup to restore the character.

## Mobile Install

- Install support is built in as a Progressive Web App.
- For Android/Chrome-class browsers, use the in-app `Install App` button when it appears.
- For iPhone/iPad, open the hosted app in Safari, tap `Share`, then `Add to Home Screen`.
- Service worker caching enables offline reuse after the first successful load.
- Installation requires `https://` hosting or `localhost`. A raw `file://` open is fine for desktop use, but it is not installable.

## Save Security

- By default, character changes are kept only for the current browser session.
- To keep characters between visits, open `Customize` -> `Security` and set a passphrase.
- Persistent saves are encrypted in the browser before they are written to storage.
- If you forget the passphrase, the encrypted save cannot be recovered.
- `Export JSON` is still the safest backup option before major edits.

## Deploy To GitHub Pages

This project is already set up for GitHub Pages with the workflow in `.github/workflows/deploy-pages.yml`.

### Simple setup

1. Create a new GitHub repository.
2. Make the repository `Public` if you want free GitHub Pages on a GitHub Free account.
3. Upload everything from this folder to the repository root.
4. Push to the `main` branch.
5. In GitHub, open `Settings` -> `Pages`.
6. Under `Build and deployment`, set `Source` to `GitHub Actions` if it is not already selected.
7. Open the `Actions` tab and wait for `Deploy GitHub Pages` to finish.
8. Your site will be available at:
   `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

### If you want to use git from Terminal

```bash
cd /path/to/your/project
git init
git branch -M main
git add .
git commit -m "Add DnD character sheet app"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY-NAME.git
git push -u origin main
```

### Important notes

- The app is static, so GitHub Pages can host it without a build step.
- The PWA install feature works on GitHub Pages because Pages serves over `https://`.
- If you update the app later, just push to `main` again.
- The install prompt may appear only after the page has been visited once and meets the browser's install rules.
- For privacy, avoid adding remote portrait image URLs. Use uploaded portraits instead.

## Included

- Character identity, class, race, alignment, XP, player, campaign, and portrait
- All six abilities with automatic modifiers and configurable saving throw training
- Skills with proficiency or expertise, misc bonuses, and one-click rolls
- AC, initiative, speed, hit points, hit dice, death saves, rest buttons, and custom resources
- Attacks, spellcasting ability, spell save DC, spell attack, spell slots, and spellbook entries
- Inventory, currency, carrying weight, encumbrance tracking, proficiencies, languages, and custom checks
- Features and traits with filtering
- Theme presets, color customization, compact mode, section visibility toggles, import/export JSON, print, session autosave, and optional encrypted persistent saves

## Demo

Use `Load Demo` to preload the Theron Vaelmont example character.
