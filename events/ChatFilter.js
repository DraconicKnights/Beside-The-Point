const { Collection, Events } = require('discord.js');
require('dotenv/config');

const Filter = Object.freeze({
  Word1: 'test',
  Word2: 'shadow',
  Word3: 'example'
});

const filter = new Collection(Object.entries(Filter));

module.exports = {
    name: Events.ClientReady,
    once: false,
    execute(client) {
        client.on('messageCreate', async (message) => {
            const content = message.content.toLowerCase();
            if (filter.some((word) => content.includes(word)) && message.author.id !== process.env.CLIENTID) {
                await message.reply('Please refrain from using inappropriate language.');
                console.log("Member: " + message.author.name + " Triggered the filter in Channel: " + message.channel.name + " Content: " + message.content);
                await message.delete();
            }
          });
    }
}