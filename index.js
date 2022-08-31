// Require the necessary discord.js classes
const { Client, GatewayIntentBits, version} = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const { Routes } = require('discord.js');
const {REST} = require("@discordjs/rest");

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    client.on('interactionCreate', (interaction) => {
        if(interaction.isChatInputCommand()){
            console.log(interaction.options)
            interaction.reply({content: 'Added'})
        }})

    const command = [{
        'name': 'game',
        'description': 'add game',
        'options': [
            {
                'name': 'game_name',
                'description': 'Name of the game',
                'type': 3,
                'required': true
            }
        ]
    }]

    try {
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: command },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
})();

// Login to Discord with your client's token
client.login(token);