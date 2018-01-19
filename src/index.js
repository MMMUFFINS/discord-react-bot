'use strict';

const Discord = require('discord.js');
const fs = require('fs');

let config = JSON.parse(fs.readFileSync('./config.json'));
let discordToken = config.tokens.discord;
let targetUsers = config.targets;
let botmasters = config.botmasters;

const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
    // ignore bots, including itself! THIS IS IMPORTANT
    if (message.author.bot) return;

    // use message.author.tag to get full discord tag with discriminator
    for (let i = 0; i < targetUsers.length; i++) {
        let target = targetUsers[i];

        if (message.author.tag === target.tag) {
            let emoji;
            for (let j = 0; j < target.reactions.length; j++) {
                message.react(target.reactions[j])
                .catch(err => {
                    console.error(err)
                });
            }
        }
    }
});

// program start
client.login(discordToken);