❄️ Aurelia Music Bot

Aurelia is a premium Discord music bot built with a clean Winter Monarch aesthetic and powerful features.

---

✨ Features

- 🎧 High-quality music playback (Lavalink)
- 🎶 Supports YouTube & Spotify links
- 📜 Slash commands system
- 🔁 Autoplay (infinite music)
- 🔀 Queue + shuffle + loop
- 🎬 Animated now playing UI
- ❄️ Clean Winter Monarch themed embeds

---

📁 Project Structure

aurelia-bot/
├── commands/
├── events/
├── utils/
├── index.js
├── lavalink.js
├── deploy-commands.js
├── package.json
├── .env

---

⚙️ Setup Guide

1. Clone or Download

git clone https://github.com/your-username/aurelia-bot.git
cd aurelia-bot

---

2. Install Dependencies

npm install

---

3. Create ".env" File

Create a file named ".env" in the root folder:

TOKEN=your_discord_bot_token
CLIENT_ID=your_application_id

---

4. Deploy Slash Commands

npm run deploy

---

5. Start the Bot

npm start

---

🔑 Getting Token & Client ID

Go to Discord Developer Portal:

- Create an application
- Go to "Bot" → Copy TOKEN
- Go to "General Information" → Copy CLIENT_ID

---

🔗 Invite Bot

Go to OAuth2 → URL Generator
Select:

- bot
- applications.commands

Then invite to your server.

---

🎧 Commands

- "/play" — Play music
- "/skip" — Skip current song
- "/loop" — Toggle loop
- "/shuffle" — Shuffle queue
- "/nowplaying" — Show current track

---

⚠️ Important

- Do NOT share your bot token
- Do NOT upload ".env" file to GitHub
- Make sure bot has voice permissions

---

☁️ Deployment (Railway)

1. Push code to GitHub
2. Go to Railway
3. Deploy from GitHub
4. Add environment variables:
   - TOKEN
   - CLIENT_ID

---

👑 Credits

Made with ❤️ for Winter Monarch server
Aurelia — Your premium music experience ❄️

---

💎 Future Upgrades

- 🎛️ Button controls
- 🌐 Web dashboard
- 💰 Premium system
- 🎨 Advanced UI animations

---
