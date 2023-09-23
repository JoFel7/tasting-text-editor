import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'jate';

const initDb = async () => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
          const store = db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true });
          console.log('jate database created', store);
        } else {
          console.log('jate database already exists');
        }
      },
    });
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

export const putDb = async (content) => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const req = store.add({ value: content });
    const result = await req;
    console.log('Content added to the database:', result.value);
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

export const getDb = async () => {
  try {
    const db = await openDB(DB_NAME, DB_VERSION);
    const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    const content = await store.get(1);
    return content;
  } catch (error) {
    console.error('Error getting content from the database:', error);
    return null;
  }
};

// Initialize the database
initDb();
