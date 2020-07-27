import { Boggle, BoggleBuilder } from "./Boggle";

describe("Boggle", () => {
  let Game;

  beforeEach(() => {
    Game = new BoggleBuilder().build();
  });

  describe("#randomIntExclusive", () => {
    it("should generate random int between [min, max)", () => {
      const [min, max] = [1, 5];
      const int = Boggle.randomIntExclusive(min, max);
      expect(int).toBeLessThan(max);
      expect(int).toBeGreaterThanOrEqual(min);
    });
  });
  describe("#randomChoice", () => {
    it("should generate random choice in `collection`", () => {
      const collection = [1, 7, 3, 9, 4, 0];
      const choice = Boggle.randomChoice(collection);
      expect(collection).toContain(choice);
    });
  });
  describe("#shuffle", () => {
    it("should shuffle `collection`", () => {
      const collection = [1, 7, 3, 9, 4, 0];
      const collectionOrig = [1, 7, 3, 9, 4, 0].slice();

      Boggle.shuffle(collection);

      expect(collectionOrig).not.toEqual(collection);
      expect(collectionOrig.sort()).toEqual(collection.sort());
    });
  });
  describe("#createBoard", () => {
    it("should create 2D `board` matrix with `defaultValue` at each position", () => {
      const N = 10;
      const defaultValue = "r";
      const board = Game.createBoard(N, defaultValue);

      expect(board.length).toEqual(N);
      expect(board[0].length).toEqual(N);
      expect(board[0][0]).toEqual(defaultValue);
    });
  });
  describe("#populateBoard", () => {
    it("shouldpopulate board with at least `minVowelCount` vowels, `minConsonantCount` consonants", () => {
      Game.boardSize = 3;
      Game.minVowelCount = 4;
      Game.minConsonantCount = 5;

      Game.populateBoard();

      let vowelCount = 0;
      let consonantCount = 0;

      for (let r = 0; r < Game.boardSize; r++) {
        for (let c = 0; c < Game.boardSize; c++) {
          if (Boggle.VOWELS.includes(Game.board[r][c])) vowelCount++;
          else if (Boggle.CONSONANTS.includes(Game.board[r][c])) consonantCount++;
        }
      }

      expect(vowelCount).toBeGreaterThanOrEqual(Game.minVowelCount);
      expect(consonantCount).toBeGreaterThanOrEqual(Game.minConsonantCount);
    });
  });
  describe("#isValidPos", () => {
    it("should return `true` if valid position", () => {
      const valid = Game.isValidPos(1, 2);
      expect(valid).toBe(true);
    });
    it("should return `false` if invalid position", () => {
      const valid = Game.isValidPos(1, -5);
      expect(valid).toBe(false);
    });
  });
  describe("#validateSelect", () => {
    it("should return `true` if valid selection", () => {
      const word = [[1, 2]];
      const next = [1, 3];
      const valid = Game.validateSelect(word, next);
      expect(valid).toBe(true);
    });
    it("should return `false` if invalid selection", () => {
      const word = [[1, 2]];
      const next = [1, 4];
      const valid = Game.validateSelect(word, next);
      expect(valid).toBe(false);
    });
  });
  describe("#validateUnselect", () => {
    it("should return `true` if valid unselection", () => {
      const word = [[1, 2]];
      const next = [1, 2];
      const valid = Game.validateUnselect(word, next);
      expect(valid).toBe(true);
    });
    it("should return `false` if invalid unselection", () => {
      const word = [[1, 2]];
      const next = [1, 3];
      const valid = Game.validateUnselect(word, next);
      expect(valid).toBe(false);
    });
  });
});
