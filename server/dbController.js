import mongoose from "mongoose";

mongoose.set("strictQuery", false);

mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.yojgc.mongodb.net/SWENG411_ProjectCORE?retryWrites=true&w=majority"
);

// !----------------------------- Schemas -----------------------------! //
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

// !------------------------------- Models -------------------------------! //
const User = mongoose.model("User", userSchema);

const Board = mongoose.model("Board", boardSchema);

const List = mongoose.model("List", listSchema);

const Card = mongoose.model("Card", cardSchema);

const Metadata = mongoose.model("Metadata", metadataSchema);

// !------------------------------ Functions ------------------------------! //
export async function getBoard(boardId) {
  const board = await Board.findById(
    boardId.replace(/-/g, "").substring(0, 24)
  );
  return board;
}

export async function getList(listId, boardId) {
  const board = await getBoard(boardId);
  const list = board.lists.filter((list) => list._id == listId)[0];

  return list;
}

export async function addBoard(userId, roomId) {
  const board = new Board();
  board._id = roomId.replace(/-/g, "").substring(0, 24); // ! this is bad!!! It's cutting characters off the end of the uuid of the room because _id needs to be 24 chars. Look for alternative OR find 24char uuid generator for room
  board.metadata.createdByUser = User.findById(userId);
  await board.save();
  return board;
}

export async function addList(boardId) {
  const board = await getBoard(boardId.replace(/-/g, "").substring(0, 24));
  const newList = new List();

  board.lists.push(newList);
  await board.save();
  return board.lists;
}

export async function addCard(listId, boardId) {
  const board = await getBoard(boardId);
  const list = board.lists.filter((list) => list._id == listId)[0];
  const newCard = new Card();
  list.cards.push(newCard);

  await board.save();
  return list.cards;
}
