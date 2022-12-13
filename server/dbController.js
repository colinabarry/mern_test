import mongoose from "mongoose";

export class DBController {
  constructor() {
    mongoose.connect(
      "mongodb+srv://admin:admin123@cluster0.yojgc.mongodb.net/SWENG411_ProjectCORE?retryWrites=true&w=majority"
    );

    const userSchema = new mongoose.Schema({
      username: String,
      password: String,
    });

    const metadataSchema = new mongoose.Schema({
      id: Number,
      timeCreated: { type: Date, default: Date.now },
      createdByUser: userSchema,
    });

    const messageSchema = new mongoose.Schema({
      message: String,
      metadata: metadataSchema,
    });

    const checklistSchema = new mongoose.Schema({
      title: String,
      completed: Boolean,
      items: [String],
      metadata: metadataSchema,
    });

    const cardSchema = new mongoose.Schema({
      title: String,
      description: String,
      checklists: [checklistSchema],
      assignedUsers: [userSchema],
      metadata: metadataSchema,
    });

    const listSchema = new mongoose.Schema({
      title: String,
      cards: [cardSchema],
      metadata: metadataSchema,
    });

    const boardSchema = new mongoose.Schema({
      title: String,
      lists: [listSchema],
      messages: [messageSchema],
      metadata: metadataSchema,
    });
  }
}
