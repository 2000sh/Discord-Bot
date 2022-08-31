// Require the necessary discord.js classes
const { Client, GatewayIntentBits, userMention, messageLink, time } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)

client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

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
    }
});

// Login to Discord with your client's token
client.login(token);