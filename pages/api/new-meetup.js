// /api/new-meetup

// POST /api/new-meetup

import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { title, image, description, address } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://berdia21:Xinkali21@cluster0.h5z4lln.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups"); // this name can be changed

    const result = await meetupsCollection.insertOne(data);
    client.close();

    res.status(201).json({ message: "meetup inserted" });
  }
}
