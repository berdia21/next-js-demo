// /api/notes/get-note

// POST /api/notes/get-note

import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const data = req.body;
  const { userId } = data;
  const { limit, skip } = req.query;
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );

  const client = await MongoClient.connect(
    "mongodb+srv://berdia21:Xinkali21@cluster0.h5z4lln.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  const notesCollection = db.collection("notes"); // this name can be changed

  const totalNotes = await notesCollection.estimatedDocumentCount({
    userId: userId,
  });

  if (parseInt(skip) >= totalNotes) {
    client.close();
    return res.status(200).json([]);
  }

  const notes = await notesCollection
    .find({ userId: userId })
    .sort({ createDate: -1 })
    .skip(parseInt(skip))
    .limit(parseInt(limit))
    .toArray();

  client.close();

  res.status(200).json(notes);
}
