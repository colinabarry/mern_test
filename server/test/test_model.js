import { Model, Board, List, Card, Checklist } from "../model.js";
import assert from "assert";

describe("Board", () => {
  describe("#addList", () => {
    it("should add a new List object to Board.lists", () => {
      let board = new Board();
      board.addList("New List");

      assert(board.lists.length == 1);
    });
    it("should set the `title` property correctly", () => {
      let board = new Board();
      board.addList("New List");

      assert(board.lists[0].title == "New List");
    });
  });

  describe("#deleteList", () => {
    it("should remove the list from the lists array if passed list is the same object", () => {
      let board = new Board();
      let list1 = new List("one");
      let list2 = new List("two");
      board.lists = [list1, list2];
      board.deleteList(list1);

      assert(board.lists[0].metadata.id == list2.metadata.id);
    });
  });
});
