import 'dotenv/config';
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
    const topic = interaction.options.getString('topic', true);

    const embed = new EmbedBuilder()
      .setTitle('Ministry of Truth Archives')
      .setDescription(
        `Archive search received for **${topic}**.\n\nThe Ministry's historical database is now operational.`
      )
      .setFooter({
        text: 'Ministry of Truth • Super Earth',
      });

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.BOT_TOKEN);
