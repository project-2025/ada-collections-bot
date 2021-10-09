import axios from "axios";
import { COLLECTIONS } from "../config.js";

const getCollectionInfo = async (trigger) => {
  const collection = COLLECTIONS.find((c) => c.trigger === trigger);
  if (collection) {
    const ada_collections = await axios
      .get("https://api.opencnft.io/api/ranking?t=all", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        return {
          collection: null,
          collectionDetails: null,
        };
      });
    const collectionDetails = ada_collections.data.find((c) =>
      c.policies.includes(collection.policy)
    );
    return {
      collection,
      collectionDetails,
    };
  }
};

export { getCollectionInfo };
