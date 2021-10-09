import { MessageEmbed } from "discord.js";
import { COLLECTIONS } from "../config.js";

const handleHelpQuery = async (message) => {
  console.log(message.content);
  let helpString = "";
  for (const collection of COLLECTIONS) {
    helpString =
      helpString +
      `\n**${collection.name}** \`${collection.trigger}\`\n${collection.description}\n`;
  }
  const helpEmbed = new MessageEmbed()
    .setTitle("Collections Help")
    .setColor("GREEN")
    .setDescription(helpString);
  message.channel.send({ embeds: [helpEmbed] });
};

export { handleHelpQuery };
