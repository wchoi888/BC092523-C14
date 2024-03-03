import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const db = await openDB("jate", 1);
    const tx = db.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.add({ content });
    const result = await request;
  } catch (error) {
    console.error("putDb not implemented", error);
  }
};

// TODO: Add logic for amethod that gets all the content from the database
export const getDb = async () => {
  try {
    console.log("GET from the database");

    // Create a connection to the database database and version we want to use.
    const db = await openDB("jate", 1);

    // Create a new transaction and specify the database and data privileges.
    const tx = db.transaction("jate", "readonly");

    // Open up the desired object store.
    const store = tx.objectStore("jate");

    // Use the .getAll() method to get all data in the database.
    const request = store.getAll();

    // Get confirmation of the request.
    const result = await request;
    const position = result.length - 1;
    if (result.length === 0) {
      return null;
    } else {
      return result[position].content;
    }
  } catch (error) {
    console.error("getDb not implemented", error);
  }
};

initdb();
