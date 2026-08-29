import 'dotenv/config';
import { loadEncyclopedia } from './loadEncyclopedia.js';

const lore = loadEncyclopedia();
import {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  EmbedBuilder,
} from 'discord.js';

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
 if (interaction.isAutocomplete()) {
  const focused = interaction.options
    .getFocused()
    .toLowerCase()
    .trim();

  const normalizedFocused = focused.replace(/\s+/g, '-');

  const choices = Object.entries(lore)
    .filter(([key, entry]) =>
      key.includes(normalizedFocused) ||
      entry.title.toLowerCase().includes(focused)
    )
    .slice(0, 25)
    .map(([key, entry]) => ({
      name: entry.title,
      value: key
    }));

  await interaction.respond(choices);
  return;
}
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'lore') {
   const rawTopic = interaction.options
  .getString('topic', true)
  .toLowerCase()
  .trim();

const topic = rawTopic.replace(/\s+/g, '-');

 const aliases = {
  "bots": "automatons",
  "automaton": "automatons",
  "bugs": "terminids",
  "terminid": "terminids",
  "squids": "illuminate",
  "illuminates": "illuminate",
  "creek": "malevelon-creek",
  "malevelon creek": "malevelon-creek",
  "managed democracy": "managed-democracy",
  "super earth": "super-earth",
   "pelican": "pelican-1",
"pelican 1": "pelican-1",
"extraction shuttle": "pelican-1",
"eagle": "eagle-1",
"eagle 1": "eagle-1",
"super destroyer": "super-destroyer",
"destroyer": "super-destroyer",
"element 710": "element-710",
"710": "element-710",
"super earth armed forces": "seaf"
};

let resolvedTopic = aliases[topic] || topic;

if (!lore[resolvedTopic]) {
  const aliasMatch = Object.entries(lore).find(([key, entry]) =>
    Array.isArray(entry.aliases) &&
    entry.aliases.some(alias =>
      alias.toLowerCase().replace(/\s+/g, '-') === topic
    )
  );

  if (aliasMatch) {
    resolvedTopic = aliasMatch[0];
  }
}

const entry = lore[resolvedTopic];
    if (!entry) {
      await interaction.reply({
        content: `No archive entry was found for **${topic}**.`,
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

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.BOT_TOKEN);
