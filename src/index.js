import 'dotenv/config';
import lore from '../lore.json' with { type: 'json' };
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
    ),
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
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'lore') {
    const topic = interaction.options
      .getString('topic', true)
      .toLowerCase()
      .trim();

    const entry = lore[topic];

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
      .setFooter({
        text: 'Ministry of Truth • Super Earth',
      });

    if (entry.image) {
      embed.setImage(entry.image);
    }

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.BOT_TOKEN);
