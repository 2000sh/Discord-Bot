const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');
const { SlashCommandBuilder, Routes, Client, GatewayIntentBits} = require('discord.js');


const rest = new REST({ version: '10' }).setToken(token);

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

client.on('interactionCreate',  (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'game'){
        interaction.reply({content: 'Listed'})
    }

});

async function main() {
    const commands = [
        new SlashCommandBuilder().setName('game').setDescription('Adds a game to the game'),
    ]
        .map(command => command.toJSON());

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
            body: commands,
        });
        client.login(token);
    } catch (err) {
        console.log(err);
    }
}

main();













1