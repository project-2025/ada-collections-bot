import { Client, Intents } from "discord.js";
import { BOT_TOKEN, HELP_TRIGGER } from "./config.js";
import { handleStatQuery } from "./controllers/statControllers.js";
import { handleHelpQuery } from "./controllers/helpControllers.js";

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  ],
});

client.on("messageCreate", async (message) => {
  switch (message.content) {
    case HELP_TRIGGER:
      return handleHelpQuery(message);
    default:
      return handleStatQuery(message);
  }
});

client.on("ready", () => {
  client.user.setPresence({
    status: "online",
    activity: {
      name: ".help",
      type: "LISTENING",
    },
  });
  console.log(`${client.user.username} is up and running!`);
});

client.login(BOT_TOKEN);
