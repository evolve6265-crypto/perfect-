const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// 🧊 Create table
async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS guild_settings (
      guild_id TEXT PRIMARY KEY,
      volume INTEGER DEFAULT 100
    )
  `);
}

// 🔊 Get volume
async function getVolume(guildId) {
  const res = await pool.query(
    'SELECT volume FROM guild_settings WHERE guild_id = $1',
    [guildId]
  );
  return res.rows[0]?.volume || 100;
}

// 🔊 Set volume
async function setVolume(guildId, volume) {
  await pool.query(`
    INSERT INTO guild_settings (guild_id, volume)
    VALUES ($1, $2)
    ON CONFLICT (guild_id)
    DO UPDATE SET volume = $2
  `, [guildId, volume]);
}

module.exports = { initDB, getVolume, setVolume };
