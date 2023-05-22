// /api/notes/get-note-detail

// POST /api/notes/get-note-detail

import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const data = req.body;
  const { noteId } = data;

  const client = await MongoClient.connect(
    "mongodb+srv://berdia21:Xinkali21@cluster0.h5z4lln.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const notesCollection = db.collection("notes"); // this name can be changed

  const targetNote = await notesCollection.findOne({
    _id: new ObjectId(noteId),
  });

  client.close();

  res.status(200).json(targetNote);
}
