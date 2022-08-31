// Require the necessary discord.js classes
const { Client, GatewayIntentBits, userMention, messageLink, time } = require('discord.js');
const { token } = require('./config.json');

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

    if (commandName === 'ping') {
        await interaction.reply('Pong!');
    } else if (commandName === 'server') {
        await interaction.reply('Server info.');
    } else if (commandName === 'user') {
        await interaction.reply('User info.');
    } else if (commandName === 'vote') {
        const message = await interaction.reply({ content: "Give me your 3 favourite games then everyone can vote. Give them like this: 'Halo, fortnite, fall guys, amongus'", fetchReply: true});
		message.react('😄');
        message.awaitReactions({time:6000, errors:['time']})
        .then(collected => {
            const reaction = collected.first();
            if(reaction.emoji.name === '😄'){
                message.reply('You reacted with a smile!');
            }
        });

    try {
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: command },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        console.error(error);

    }
});

// Login to Discord with your client's token
client.login(token);