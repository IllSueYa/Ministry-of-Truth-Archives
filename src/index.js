import 'dotenv/config';
import { loadEncyclopedia } from './loadEncyclopedia.js';
import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  EmbedBuilder,
} from 'discord.js';

const lore = loadEncyclopedia();

console.log(`Loaded ${Object.keys(lore).length} encyclopedia entries`);

function normalizeSearch(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-');
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const commands = [
  new SlashCommandBuilder()
    .setName('lore')
    .setDescription('Search the Ministry of Truth Archives')
    .addStringOption(option =>
      option
        .setName('topic')
        .setDescription('What would you like to learn about?')
        .setRequired(true)
        .setAutocomplete(true)
    )
];

client.once('ready', async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

  await rest.put(Routes.applicationCommands(client.user.id), {
    body: commands.map(command => command.toJSON()),
  });

  console.log('Registered /lore command');
});

client.on('interactionCreate', async interaction => {

  // AUTOCOMPLETE
  if (interaction.isAutocomplete()) {
    const focused = interaction.options
      .getFocused()
      .toLowerCase()
      .trim();

    const normalizedFocused = normalizeSearch(focused);

    const choices = Object.entries(lore)
  .map(([key, entry]) => {
    const normalizedTitle = normalizeSearch(entry.title);

    const aliases = Array.isArray(entry.aliases)
      ? entry.aliases.map(alias => normalizeSearch(alias))
      : [];

    let score = 0;

    if (key === normalizedFocused) {
      score = 100;
    } else if (normalizedTitle === normalizedFocused) {
      score = 95;
    } else if (aliases.includes(normalizedFocused)) {
      score = 90;
    } else if (key.startsWith(normalizedFocused)) {
      score = 80;
    } else if (normalizedTitle.startsWith(normalizedFocused)) {
      score = 75;
    } else if (aliases.some(alias => alias.startsWith(normalizedFocused))) {
      score = 70;
    } else if (key.includes(normalizedFocused)) {
      score = 60;
    } else if (normalizedTitle.includes(normalizedFocused)) {
      score = 55;
    } else if (aliases.some(alias => alias.includes(normalizedFocused))) {
      score = 50;
    }

    return {
      key,
      entry,
      score
    };
  })
  .filter(result => result.score > 0)
  .sort((a, b) => b.score - a.score)
  .slice(0, 25)
  .map(({ key, entry }) => ({
    name: entry.title,
    value: key
  }));

    await interaction.respond(choices);
    return;
  }

  // SLASH COMMANDS
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'lore') {
    const rawTopic = interaction.options
      .getString('topic', true);

    const topic = normalizeSearch(rawTopic);

   let resolvedTopic = topic;

// EXACT ALIAS MATCH
if (!lore[resolvedTopic]) {
  const aliasMatch = Object.entries(lore).find(([key, entry]) =>
    Array.isArray(entry.aliases) &&
    entry.aliases.some(alias =>
      normalizeSearch(alias) === topic
    )
  );

  if (aliasMatch) {
    resolvedTopic = aliasMatch[0];
  }
}

// PARTIAL SEARCH FALLBACK
if (!lore[resolvedTopic]) {
  const partialMatch = Object.entries(lore)
    .map(([key, entry]) => {
      const normalizedTitle = normalizeSearch(entry.title);

      const aliases = Array.isArray(entry.aliases)
        ? entry.aliases.map(alias => normalizeSearch(alias))
        : [];

      let score = 0;

      if (key.startsWith(topic)) {
        score = 80;
      } else if (normalizedTitle.startsWith(topic)) {
        score = 75;
      } else if (aliases.some(alias => alias.startsWith(topic))) {
        score = 70;
      } else if (key.includes(topic)) {
        score = 60;
      } else if (normalizedTitle.includes(topic)) {
        score = 55;
      } else if (aliases.some(alias => alias.includes(topic))) {
        score = 50;
      }

      return {
        key,
        score
      };
    })
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score)[0];

  if (partialMatch) {
    resolvedTopic = partialMatch.key;
  }
}

const entry = lore[resolvedTopic];

    if (!entry) {
      await interaction.reply({
        content: `No archive entry was found for **${rawTopic}**.`,
        ephemeral: true,
      });
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle(entry.title)
      .setDescription(entry.description)
      .setColor(0xD4AF37)
      .setFooter({
        text: 'Ministry of Truth • Super Earth',
      });

    if (entry.category) {
      embed.addFields({
        name: 'Category',
        value: entry.category,
        inline: true
      });
    }

    if (entry.source) {
      embed.addFields({
        name: 'Archive Source',
        value: `[View Full Record](${entry.source})`
      });
    }

    if (entry.image) {
      embed.setImage(entry.image);
    }

    await interaction.reply({
      embeds: [embed]
    });
  }
});

client.login(process.env.BOT_TOKEN);
