# KSB Flashcards

Spaced-repetition flashcards for the Level 4 Data Analyst EPA (Knowledge and Skills). Built to be used mainly on a phone. Progress is stored on the device only.

## Set up on GitHub Pages (about 10 minutes)

1. Create a new repository on GitHub, e.g. `ksb-flashcards`.
   - On a free GitHub account, Pages only works with a **public** repository. That's fine here: the repo only holds the app and cards, and your progress never leaves your phone.
2. Upload everything in this folder to the repository: **Add file → Upload files**, then drag the whole folder contents in, keeping the `cards`, `icons` and `vendor` folders.
3. Go to **Settings → Pages**. Under *Build and deployment*, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. After a minute or two, your site will be at `https://<your-username>.github.io/ksb-flashcards/`.

## Put it on your phone

- **iPhone (Safari):** open the link → Share → **Add to Home Screen**.
- **Android (Chrome):** open the link → ⋮ menu → **Install app** / **Add to Home screen**.

Open it from the home-screen icon from then on. This works offline, and iOS is much less likely to clear your progress for a home-screen app than for a website in Safari.

## Back up your progress

Settings → **Download backup** (or **Copy backup**). Do this every few weeks, and before changing phone. **Restore from file** brings it back.

## Edit or add cards

Cards live in `cards/*.md` as plain text, so you can edit them directly on GitHub (open the file → pencil icon).

```
---
id: stats-sd-def            ← never change this once you've studied the card
concept: Standard deviation
type: definition            ← definition | formula | distinguish | when | pitfall | scenario | justify | project
ksb: K13, S10               ← optional; defaults to the file's ksb line
distinction: yes            ← optional; puts it in the ★ Distinction filter
Q: Question text
A: Answer text. Supports **bold**, *italics*, `code`, bullet lists (- ),
numbered lists (1. ), tables with | pipes |, and maths in $...$ or $$...$$.
```

To add a new topic file, create `cards/<name>.md` and add its file name to `cards/decks.json`.

**After changing any file**, open `sw.js` and bump the version (`ksbflash-v1` → `ksbflash-v2`), so phones pick up the change. The update appears the second time you open the app.

## How scheduling works

A simplified SM-2 algorithm (the approach behind Anki):
- New cards go through short learning steps (1 min, 10 min), then come back the next day.
- **Again** resets a card. **Hard** grows the gap slowly, **Good** grows it by the card's ease (starting at 2.5×), and **Easy** grows it faster.
- The longest gap is capped (default 30 days, set in Settings), so every card keeps coming back before the EPA.
- Focus modes (★ Distinction, Formulae, Scenarios, topics) use due and new cards first. If nothing is due, they offer practice, which doesn't change the schedule. **Weak spots** is always practice.

Flag a card (⚑) while studying if something is wrong. Settings → **Copy flagged list** gives you text to paste to Claude for fixes.
