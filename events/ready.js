const { initDB } = require('../utils/database');

module.exports = (client) => {
  client.once('ready', async () => {
    await initDB();
    console.log(`Aurelia DB connected as ${client.user.tag}`);
  });
};
