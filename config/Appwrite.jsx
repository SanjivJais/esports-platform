import { Client, Account, ID, Databases, Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_APPWRITE_PROJ); // Replace with your project ID

export const account = new Account(client);
export const database = new Databases(client);
export const storage = new Storage(client);
export const db_id = import.meta.env.VITE_DB_ID;
export { ID } from 'appwrite'
