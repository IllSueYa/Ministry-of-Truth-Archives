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
      .filter(([key, entry]) => {
        const matchesKey =
          key.includes(normalizedFocused);

        const matchesTitle =
          entry.title.toLowerCase().includes(focused);

        const matchesAlias =
          Array.isArray(entry.aliases) &&
          entry.aliases.some(alias =>
            normalizeSearch(alias).includes(normalizedFocused)
          );

        return matchesKey || matchesTitle || matchesAlias;
      })
      .slice(0, 25)
      .map(([key, entry]) => ({
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

    // SEARCH JSON ALIASES
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
