# DnD Command Sheet

Interactive offline-first Dungeons & Dragons 5e character sheet built as a static web app. No accounts, no servers — your data stays in your browser.

**Live app:** https://petecomsci.github.io/dnd-command-sheet/

## Features

- Character identity, class, race, alignment, XP, player, campaign, and portrait
- All six abilities with automatic modifiers and configurable saving throw training
- Skills with proficiency or expertise, misc bonuses, and one-click rolls
- AC, initiative, speed, hit points, hit dice, death saves, rest buttons, and custom resources with +/- buttons
- Attacks with hit and damage roll buttons, spellcasting, spell save DC, spell attack, spell slots, and spellbook
- Dice roller with d4, d6, d8, d10, d12, d20, and custom formulas; timestamped roll log
- Inventory, currency, carrying weight, encumbrance, proficiencies, languages, and custom checks
- Features and traits with search filtering
- Multiple character slots with duplicate, rename, and delete
- Theme presets, color customization, compact mode, and section visibility toggles
- Import/export JSON (single character or all characters), print-friendly layout
- Automatic local storage saves with optional passphrase encryption
- Onboarding walkthrough, contextual tooltips, and FAQ help system
- Installable as a Progressive Web App with full offline support

## Getting Started

1. Open the app: https://petecomsci.github.io/dnd-command-sheet/
2. Fill in your character name, class, level, race, background, and alignment.
3. Enter your ability scores. The app calculates modifiers, saves, and skills automatically.
4. Add your attacks, spells, inventory, features, and other details.
5. During a game, use the `Roll` buttons, `Short Rest`, `Long Rest`, and the dice roller.
6. Use `Load Demo` to see a completed example character.

Your data saves automatically. Use `Export JSON` or `Export All` to keep backups.

### Tips

- Use `New Character` for a fresh sheet, `Duplicate` to copy an existing one.
- Use `Upload Portrait` instead of pasting image links.
- Use `Export All` to back up all characters before clearing browser data.
- Use `Print` for a paper-friendly version of your sheet.

## Install on Phone

The app works as a Progressive Web App and can be installed for offline use.

### Android

1. Open the app link in Chrome.
2. Tap `Install App` if the button appears, or open the Chrome menu and tap `Add to Home screen`.

### iPhone / iPad

1. Open the app link in Safari.
2. Tap the `Share` button.
3. Tap `Add to Home Screen`, then `Add`.

After installing, the app works offline.

## Data and Privacy

- Character data is saved in your browser's local storage and persists between visits.
- No data is sent to any server. Everything stays on your device.
- For extra privacy on shared devices, set a passphrase in `Customize` > `Security` to encrypt your data.
- If you forget the passphrase, the encrypted save cannot be recovered. Always keep an exported backup.

## Development

The app is plain HTML, CSS, and JavaScript with no build step or dependencies.

### Project Structure

```
index.html             Main page
app.js                 All application logic
styles.css             All styles
service-worker.js      PWA caching and offline support
manifest.webmanifest   PWA manifest
icons/                 App icons
```

### Run Locally

```bash
git clone https://github.com/PeteComSci/dnd-command-sheet.git
cd dnd-command-sheet
python3 -m http.server 4173
# Open http://localhost:4173
```

Or just open `index.html` directly in a browser. PWA install requires `https://` or `localhost`.

### Deploy Your Own Copy

This project includes a GitHub Actions workflow for GitHub Pages.

1. Fork or clone this repository.
2. In your repo, go to `Settings` > `Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` — the workflow deploys automatically.
5. Your site will be at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

The app is fully static, so any web host works — just upload the files.

### Notes for Contributors

- No frameworks or build tools — keep it vanilla.
- Bump the `CACHE_NAME` version in `service-worker.js` when deploying changes.
- All user-rendered content is escaped via `escapeHtml()` to prevent XSS.
- Test on mobile (320px+) and desktop. Check print layout with `Ctrl+P`.

## License

MIT
