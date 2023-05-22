// /api/notes/get-note-paths

// POST /api/notes/get-note-paths

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const client = await MongoClient.connect(
    "mongodb+srv://berdia21:Xinkali21@cluster0.h5z4lln.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const notesCollection = db.collection("notes"); // this name can be changed

  // to find all the collections (notes)
  const noteIds = await notesCollection.find({}, { _id: 1 }).toArray();

  client.close();

  res.status(200).json(noteIds);
}
