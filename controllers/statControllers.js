import { getCollectionInfo } from "../utils/collection.util.js";
import { MessageEmbed } from "discord.js";

const handleStatQuery = async (message) => {
  const info = await getCollectionInfo(message.content);

  const base = 1000000;

  if (info && info.collection && info.collectionDetails) {
    const { collection, collectionDetails } = info;
    const infoEmbed = new MessageEmbed()
      .setTitle(collection.name)
      .setDescription(collection.description)
      .addFields(
        {
          name: "Total Assets",
          value: String(collectionDetails.asset_minted),
        },
        {
          name: "Total Owners",
          value: String(collectionDetails.asset_holders),
        },
        {
          name: "Floor Price",
          value: `₳ ${String(collectionDetails.floor_price / base)}`,
        },
        {
          name: "Highest Sale",
          value: `₳ ${
            String(collectionDetails?.highest_sale?.price / base) ||
            "not available"
          }`,
        },
        {
          name: "Total Volume",
          value: `₳ ${String(collectionDetails.total_volume / base)}`,
        }
      );
    message.channel.send({ embeds: [infoEmbed] });
  } else if (message.content.startsWith(".")) {
    message.channel.send("unable to find data for the collection");
  }
};

export { handleStatQuery };
