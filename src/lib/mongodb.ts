import dns from "node:dns";
import { MongoClient } from "mongodb";

// Same DNS fix as the server, only for local development
if (process.env.NODE_ENV === "development") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("MONGODB_URI is not set in .env.local");
}

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

// Reuse one client while the dev server hot reloads
export const mongoClient = globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

export const db = mongoClient.db(process.env.DB_NAME || "booknook");
