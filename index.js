// Require the necessary discord.js classes
const { Client, GatewayIntentBits, version, SlashCommandBuilder} = require('discord.js');
const { token, clientId, guildId } = require('./config.json');
const { Routes } = require('discord.js');
const {REST} = require("@discordjs/rest");

// Create a new client instance
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent] });

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if(interaction.isChatInputCommand()){
        console.log(interaction.options)
        interaction.reply({content: 'Added'})

}});

// Login to Discord with your client's token
client.login(token);