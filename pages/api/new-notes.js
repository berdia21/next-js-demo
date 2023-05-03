// /api/new-note

// POST /api/new-note

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { title, content } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://berdia21:Xinkali21@cluster0.h5z4lln.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();

    const notesCollection = db.collection("notes"); // this name can be changed

    const result = await notesCollection.insertOne(data);
    client.close();

    res.status(201).json({ message: "note inserted" });
  }
}
