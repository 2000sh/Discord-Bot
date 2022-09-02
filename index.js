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

    if(interaction.isChatInputCommand()) {
        const data = 'abc'
        if(interaction.commandName === 'game') {
            let user = interaction.user.username + '#' + interaction.user.discriminator
            console.log(interaction.options)
            console.log(user)
            interaction.reply({content: 'listed'})
        }
    }

});

async function main() {
    //Opportunity to add a game
    const commands = [
        {
            name: 'game',
            description: 'add game',
            options: [
                {
                    name: 'add',
                    description: 'which game you try to add',
                    type: '3'
                }
            ]
        },
        {
            name: 'games',
            description: 'data logs'
        }
    ]

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