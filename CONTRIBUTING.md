# Contributing to Ministry of Truth Archives

Thank you for helping improve **Ministry of Truth Archives**.

The Archives is intended to provide accurate, concise, and well-sourced Helldivers lore through Discord. Contributions are welcome when they improve accuracy, fix bugs, expand documented lore, or improve the bot itself.

Please read these guidelines before submitting an issue or pull request.

## Lore Standards

Lore submissions and corrections should:

- Be based on documented Helldivers information rather than fan theories or headcanon.
- Include a reliable source.
- Prefer the community-maintained Helldivers Wiki at https://helldivers.wiki.gg/ when an appropriate page exists.
- Use concise, encyclopedia-style descriptions.
- Avoid unnecessary speculation.
- Check whether the subject already exists under another key, title, or alias.
- Use the most appropriate existing data file and category.
- Avoid aliases that could conflict with another encyclopedia entry.

Information concerning the ongoing Galactic War should be checked against current sources before submission because campaign information can change.

## Encyclopedia Files

Lore entries are organized under:

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

Choose the file that best represents the subject rather than duplicating an entry across multiple files.

## Entry Format

Use the existing encyclopedia schema:

```json
{
  "example-entry": {
    "title": "Example Entry",
    "category": "Example Category",
    "description": "A concise and factual encyclopedia description.",
    "source": "https://helldivers.wiki.gg/wiki/Example",
    "image": "",
    "aliases": [
      "example entry",
      "alternate name"
    ]
  }
}
```

### Keys

Keys should:

- Be lowercase.
- Use hyphens between words.
- Be unique across the entire encyclopedia.
- Represent the canonical subject rather than an overly specific alias.

Example:

```text
democracy-space-station
```

### Titles

Use the subject's established or canonical name whenever possible.

### Categories

Reuse an existing appropriate category when possible. Do not create a new category merely to describe a single entry more precisely unless there is a clear organizational reason.

### Descriptions

Descriptions should be:

- Factual.
- Concise.
- Written in neutral encyclopedia language.
- Understandable without requiring another entry for basic context.
- Paraphrased rather than copied at length from a source.

Short in-universe flavor is acceptable when it does not obscure the factual information.

### Sources

Every lore entry should include a source whenever a reliable source is available.

Use:

```json
"source": "https://helldivers.wiki.gg/wiki/Example"
```

Do not change `source` to a `sources` array unless the bot's schema is intentionally updated to support it.

### Aliases

Aliases improve `/lore` search and autocomplete.

Aliases should:

- Include useful alternate names and common search terms.
- Be specific enough to identify the intended subject.
- Not duplicate another entry's canonical search term.
- Not use extremely broad words that could refer to multiple subjects.

Before adding an alias, check whether another entry already uses it.

## Avoid Duplicate Lore

Before creating an entry, search all encyclopedia files for:

1. The proposed key.
2. The proposed title.
3. Major alternate names.
4. Proposed aliases.
5. An existing entry describing the same concept under another name.

A topic that relates to several categories should normally have one canonical entry rather than copies in several files.

## JSON Validation

All edited JSON files must remain valid JSON.

Common problems include:

- Missing commas.
- Extra commas.
- Missing closing braces.
- Duplicate object keys.
- Incorrect quotation marks.
- Accidentally nesting one entry inside another.

Please validate changed JSON before submitting a pull request.

## Lore Corrections

If an existing entry is inaccurate or outdated, include:

- The entry name.
- What is incorrect.
- The proposed correction.
- A source supporting the correction.

For ongoing Galactic War events, include enough context to distinguish a genuinely outdated entry from an event that is intentionally documented historically.

## Code Contributions

Code changes should:

- Have a clear purpose.
- Avoid exposing secrets or credentials.
- Preserve existing functionality unless the change intentionally replaces it.
- Avoid unnecessary dependencies.
- Be tested before submission.

Never include a Discord bot token, API key, password, `.env` contents, or other secret in an issue, commit, pull request, screenshot, or log.

## Pull Requests

Keep pull requests focused. A lore correction does not need to include unrelated formatting or code changes.

A useful pull request description should explain:

- What changed.
- Why it changed.
- Which files were affected.
- Which sources support lore changes.
- How code changes were tested, when applicable.

Maintainers may request changes before accepting a contribution.

Submission of a pull request does not guarantee that it will be merged.

## Contribution Rights

**Ministry of Truth Archives is publicly viewable source code but is not currently distributed under an open-source license.**

By intentionally submitting an original contribution for inclusion in this repository, you represent that you have the right to submit that contribution.

You grant the maintainer of Ministry of Truth Archives a perpetual, worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, distribute, display, perform, and incorporate your submitted contribution as part of Ministry of Truth Archives and related project materials.

You retain copyright in your original contribution unless a separate written agreement states otherwise.

Do not submit third-party code, text, artwork, or other material that you do not have the right to contribute.

This contribution permission applies to the contributor's submitted material. It does not change the copyright status of the rest of the Ministry of Truth Archives project or grant contributors a license to reuse unrelated project material.

## Third-Party Intellectual Property

Helldivers, Helldivers 2, and related intellectual property belong to their respective rights holders.

Contributors should not upload copyrighted game assets, artwork, music, or other third-party material unless its use is permitted.

Lore entries should summarize and reference sources rather than reproduce substantial copyrighted text.

## Conduct

Be constructive when reporting inaccuracies or reviewing contributions. Disagreements about lore should be resolved through reliable sources rather than personal attacks.

Spam, malicious submissions, knowingly false information, credential theft, and intentionally destructive contributions are not welcome.

## Questions

If you are unsure where a lore entry belongs or whether a proposed change fits the Archives, open an issue before making a large change.

Thank you for helping maintain the Archives.

**Knowledge is Managed. History is Archived. Democracy is Eternal.**
