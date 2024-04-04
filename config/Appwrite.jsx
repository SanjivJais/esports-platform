import { Client, Account, ID, Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(import.meta.env.VITE_APPWRITE_PROJ); // Replace with your project ID

export const account = new Account(client);
export const database = new Databases(client, import.meta.env.VITE_DB_ID);
export { ID } from 'appwrite'
