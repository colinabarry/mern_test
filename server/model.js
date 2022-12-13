import { v4 as uuidv4 } from "uuid";
// trying to make a backend representation of everything so straightforward a monke could understand it
export class Model {}

export class User {
  username;
  password;
}

export class Board {
  title;
  lists = [];
  messages = [];
  metadata;

  constructor() {
    this.metadata = new Metadata();
  }

  addList(listTitle) {
    this.lists.push(new List(listTitle));
  }

  deleteList(listToDelete) {
    this.lists = this.lists.filter((list) => {
      return list !== listToDelete;
    });
  }
}

export class List {
  title;
  cards = [];
  metadata;

  constructor(title) {
    this.title = title;
    this.metadata = new Metadata();
  }

  addCard(cardTitle) {
    this.cards.push(new Card(cardTitle));
  }
}

export class Card {
  title;
  description;
  checklists = [];
  assignedUsers = [];
  metadata;

  constructor(title) {
    this.title = title;
    this.metadata = new Metadata(user);
  }

  addChecklist(checklistTitle) {
    this.checklists.push(new Checklist(checklistTitle));
  }
}

export class Checklist {
  title;
  completed = false;
  items = [];
  metadata;

  constructor(title) {
    this.title = title;
    this.metadata = new Metadata(user);
  }

  addItem(itemText) {
    this.items.push({ text: itemText, itemCompleted: false });
  }
}

export class Metadata {
  constructor(createdByUser = null) {
    this.id = uuidv4();
    this.timeCreated = new Date();
    this.createdByUser = createdByUser;
  }
}
