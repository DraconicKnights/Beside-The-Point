const { ActivityType, Events } = require('discord.js');

const Status = Object.freeze({
  Status1: 'Status 1',
  Status2: 'Status 2',
  Status3: 'Status 3'
});

module.exports = {
  name: Events.ClientReady,
  async execute(client) {

    const customStatus = Object.values(Status);
    setInterval(() => {
      client.user.setActivity(customStatus[Math.floor(Math.random() * customStatus.length)], { type: ActivityType.Playing });
    }, 10000);
  }
}