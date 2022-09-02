const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
	new SlashCommandBuilder().setName('vote').setDescription('Replies with user info!'),
]
	.map(command => command.toJSON());

const gameAdd = [{
	'name': 'game',
	'description': 'add game',
	'option': [
		{
			'name': 'game_name',
			'description': 'Name of the game',
			'type': 3,
			'required': true
		}
	]
}]

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: gameAdd, commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
















1