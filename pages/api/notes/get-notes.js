// /api/notes/get-note

// POST /api/notes/get-note

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const data = req.body;
  const { userId } = data;
  const client = await MongoClient.connect(
    "mongodb+srv://berdia21:Xinkali21@cluster0.h5z4lln.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const notesCollection = db.collection("notes"); // this name can be changed

  const notes = await notesCollection
    .find({ userId: userId })
    .sort({ createDate: -1 })
    .toArray();

  client.close();

  res.status(200).json(notes);
}
