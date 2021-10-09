import { getCollectionInfo } from "../utils/collection.util.js";
import { MessageEmbed } from "discord.js";

const handleStatQuery = async (message) => {
  const info = await getCollectionInfo(message.content);

  if (info && info.collection && info.collectionDetails) {
    const { collection, collectionDetails } = info;
    const infoEmbed = new MessageEmbed()
      .setTitle(collection.name)
      .setDescription(collection.description)
      .addFields(
        {
          name: "Total Assets",
          value: String(collectionDetails.total_minted[0]),
        },
        {
          name: "Total Owners",
          value: String(collectionDetails.total_owners[0]),
        },
        {
          name: "Floor Price",
          value: `₳ ${String(collectionDetails.floor_price)}`,
        }
      );
    message.channel.send({ embeds: [infoEmbed] });
  } else if (message.content.startsWith(".")) {
    message.channel.send("unable to find data for the collection");
  }
};

export { handleStatQuery };
