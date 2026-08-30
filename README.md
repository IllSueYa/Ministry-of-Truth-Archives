[README.md](https://github.com/user-attachments/files/31607618/README.md)
# Ministry of Truth Archives

> **A community-built Helldivers 2 lore encyclopedia for Discord.**

**Ministry of Truth Archives** is a Discord bot designed to make Helldivers lore, history, factions, people, technology, planets, vehicles, and Galactic War information easy to search directly from Discord.

Use the `/lore` command, begin typing a topic, and the Archives will search its curated encyclopedia and return a sourced entry in a Discord embed.

---

## Features

- **`/lore` encyclopedia command** — Search the Archives without leaving Discord.
- **Autocomplete** — Suggestions appear as you type.
- **Flexible search** — Entries include aliases so common names and alternate terms are easier to find.
- **Sourced lore** — Encyclopedia entries include a source for further reading.
- **Hundreds of curated entries** — Covering the major areas of the Helldivers universe.
- **Organized database** — Lore is separated into focused JSON collections for easier maintenance.
- **Discord-native presentation** — Results are returned as clean embeds instead of walls of text.
- **Continuously maintained** — Entries can be corrected and expanded as the Galactic War develops.

## Using the Archives

The primary command is:

```text
/lore topic
```

Start typing a subject in the `topic` field and choose a suggestion from autocomplete.

Examples:

```text
/lore topic: automatons
/lore topic: super earth
/lore topic: eagle-1
/lore topic: malevelon creek
/lore topic: element-710
/lore topic: democracy space station
```

If an exact match is not available, the bot can search for partial matches and help identify the intended entry.

## Encyclopedia

The database is currently organized into twelve collections:

```text
data/
├── automatons.json
├── factions.json
├── galactic-war.json
├── history.json
├── illuminate.json
├── organizations.json
├── people.json
├── planets.json
├── super-earth.json
├── technology.json
├── terminids.json
└── vehicles.json
```

Entries generally contain:

```json
{
  "example-entry": {
    "title": "Example Entry",
    "category": "Example Category",
    "description": "A concise encyclopedia description.",
    "source": "https://helldivers.wiki.gg/",
    "image": "",
    "aliases": [
      "example entry",
      "alternate name"
    ]
  }
}
```

Lore additions should be sourced and checked for duplicate entries and conflicting aliases before being added.

## Lore Sources

The Archives primarily uses the community-maintained **Helldivers Wiki** as its reference source:

https://helldivers.wiki.gg/

Source links are included with encyclopedia entries whenever possible so users can continue reading and verify information for themselves.

The Archives is intended to summarize and organize lore, not replace the work of the wiki's editors and contributors.

## Invite the Bot

**Public invite link:** Coming soon.

The bot is currently being prepared for public installation. This section will be updated with the official Discord installation link when the public release is ready.

## Support

**Support server:** Coming soon.

Until the public support server is available, bugs, incorrect lore, missing entries, and feature requests can be reported through the project's GitHub repository.

## Self-Hosting

> Self-hosting is intended for developers and contributors. Most users should use the official public bot once it becomes available.

### Requirements

- Node.js
- npm
- A Discord application and bot token

### Installation

Clone the repository:

```bash
git clone https://github.com/IllSueYa/Ministry-of-Truth-Archives.git
cd Ministry-of-Truth-Archives
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
BOT_TOKEN=your_discord_bot_token_here
```

Never commit your real bot token to GitHub.

Start the bot:

```bash
npm start
```

The project currently uses **discord.js** and loads encyclopedia entries from the JSON files inside `data/`.

## Project Structure

```text
Ministry-of-Truth-Archives/
├── data/
│   ├── automatons.json
│   ├── factions.json
│   ├── galactic-war.json
│   ├── history.json
│   ├── illuminate.json
│   ├── organizations.json
│   ├── people.json
│   ├── planets.json
│   ├── super-earth.json
│   ├── technology.json
│   ├── terminids.json
│   └── vehicles.json
├── src/
│   ├── index.js
│   └── loadEncyclopedia.js
├── package.json
└── README.md
```

## Contributing

Contributions will be welcome once the public contribution process is finalized.

Before submitting lore changes:

- Use reliable Helldivers sources.
- Prefer the Helldivers Wiki when an appropriate page exists.
- Do not submit fan theories as established lore.
- Check whether the topic already exists under another name.
- Avoid aliases that conflict with existing entries.
- Keep descriptions concise and encyclopedia-focused.
- Preserve valid JSON formatting.

Full contribution rules will be available in `CONTRIBUTING.md`.

## Privacy & Terms

Public-release privacy and terms documents are being prepared.

Once published, they will be available here:

- `PRIVACY.md`
- `TERMS.md`

## License

A project license will be added before the public source release.

Until a license is added, no permission is granted to copy, modify, redistribute, or reuse the source code merely because the repository is publicly viewable.

## Maintainer

Maintained by **IllSueYa**.

## Disclaimer

**Ministry of Truth Archives is an unofficial fan-created project.**

It is not affiliated with, authorized by, sponsored by, or endorsed by Arrowhead Game Studios, Sony Interactive Entertainment, PlayStation, or the official Helldivers franchise.

Helldivers, Helldivers 2, and related names, characters, imagery, and intellectual property belong to their respective rights holders.

This project is created for community information and educational purposes.

---

### Ministry of Truth Archives

**Knowledge is Managed. History is Archived. Democracy is Eternal.**
