import axios from "axios";
import { COLLECTIONS } from "../config.js";

const getCollectionInfo = async (trigger) => {
  const collection = COLLECTIONS.find((c) => c.trigger === trigger);
  if (collection) {
    const collectionDetails = await axios
      .get(`https://api.opencnft.io/1/policy/${collection.policy}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        console.log(error);
        return {
          collection: null,
          collectionDetails: null,
        };
      });
    return {
      collection,
      collectionDetails: collectionDetails.data,
    };
  }
};

export { getCollectionInfo };
