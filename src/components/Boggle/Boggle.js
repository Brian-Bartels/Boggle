import { Trie } from "../../utils/Trie";

export class Boggle {
  static ALLCHARS = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

  // Board
  static DEFAULT_BOARD_SIZE = 4;
  static DEFAULT_MINIMUM_WORD_SIZE = 3;
  static DEFAULT_MINIMUM_VOWEL_COUNT = 4;
  static DEFAULT_MINIMUM_CONSONANT_COUNT = 4;
  static MAXIMUM_REPEAT_COUNT = 4;
  static MAXIMUM_Q_COUNT = 1;

  static randomIntExclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  static randomChoice(collection) {
    return collection[Boggle.randomIntExclusive(0, collection.length)];
  }

  constructor(build, minDensity) {
    this.boardSize = build.boardSize || Boggle.DEFAULT_BOARD_SIZE;
    this.minWordSize = build.minWordSize || Boggle.DEFAULT_MINIMUM_WORD_SIZE;
    this.minConsonantCount = build.minConsonantCount || Boggle.DEFAULT_MINIMUM_CONSONANT_COUNT;
    this.minVowelCount = build.minVowelCount || Boggle.DEFAULT_MINIMUM_VOWEL_COUNT;
    this.populateBoardFullRand();
    var uniq = this.findAllWords();
    // Counts points on the board. Makes sure that it's above the min density
    while ((uniq.join("").length - (uniq.length * 2)) < minDensity) {
      this.populateBoardFullRand();
      uniq = this.findAllWords();
    }
  }

  createBoard(N, defaultValue) {
    return Array.from(new Array(N), () => new Array(N).fill(defaultValue));
  }

  populateBoardFullRand() {
    const N = this.boardSize;
    this.board = this.createBoard(N);
    this.boardState = this.createBoard(N, false);

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        this.board[r][c] = Boggle.randomChoice(Boggle.ALLCHARS);
      }
    }
  }

  findAllWords() {
    var allWords = []
    for (var i = 0; i < this.boardSize; i++) {
      for (var j = 0; j < this.boardSize; j++) {
        var currWords = [];
        this.findAllWordsFromStart([[i, j]], currWords);
        allWords.push(...currWords);
      }
    }
    var uniq = [...new Set(allWords)];
    uniq.sort(function(a, b){
      return b.length - a.length;
    });
    return uniq;
  }

  // Make sure that word doesn't already contain next char coords
  coordContains(coords, word) {
    for (const f of word) {
      if (f[0] === coords[0] && f[1] === coords[1]) {
        return true;
      }
    }
    return false;
  }

  findAllWordsFromStart(word, wordList) {
    const N = this.boardSize;
    var [i, j] = word[word.length - 1];
    if (i < 0 || i >= N || j < 0 || j >= N) {
      return false;
    }
    var engWord = word.map(([i, j]) => this.board[i][j]).join("");
    var validity = Trie.trie.contains(engWord)
    if (validity === 0) {
      return false;
    } else if (validity === 1){
      wordList.push(engWord);
    }
    if (!this.coordContains([i + 1, j + 1], word)) {
      word.push([i + 1, j + 1]);
      this.findAllWordsFromStart(word, wordList);
      word.pop();
    }
    if (!this.coordContains([i + 1, j], word)) {
      word.push([i + 1, j]);
      this.findAllWordsFromStart(word, wordList);
      word.pop();
    }
    if (!this.coordContains([i, j + 1], word)) {
      word.push([i, j + 1]);
      this.findAllWordsFromStart(word, wordList);
      word.pop();
    }
    if (!this.coordContains([i - 1, j - 1], word)) {
      word.push([i - 1, j - 1]);
      this.findAllWordsFromStart(word, wordList);
      word.pop();
    }
    if (!this.coordContains([i - 1, j], word)) {
      word.push([i - 1, j]);
      this.findAllWordsFromStart(word, wordList);
      word.pop();
    }
    if (!this.coordContains([i, j - 1], word)) {
      word.push([i, j - 1]);
      this.findAllWordsFromStart(word, wordList);
      word.pop();
    }
    if (!this.coordContains([i + 1, j - 1], word)) {
      word.push([i + 1, j - 1]);
      this.findAllWordsFromStart(word, wordList);
      word.pop();
    }
    if (!this.coordContains([i - 1, j + 1], word)) {
      word.push([i - 1, j + 1]);
      this.findAllWordsFromStart(word, wordList);
      word.pop();
    }
  }

  isValidPos(px, nx) {
    const N = this.boardSize;
    return nx >= 0 && nx < N && Math.abs(px - nx) <= 1;
  }

  validateSelect(word, [nr, nc]) {
    if (!word.length) return true;

    const [pr, pc] = word[word.length - 1];

    return this.isValidPos(pr, nr) && this.isValidPos(pc, nc);
  }

  validateUnselect(word, [nr, nc]) {
    if (!word.length) return false;

    const [pr, pc] = word[word.length - 1];

    return pr === nr && pc === nc;
  }
}

export class BoggleBuilder {
  withWordSize({ wordSize }) {
    this.minWordSize = wordSize;
    return this;
  }

  withVowelCount({ vowelCount }) {
    this.minVowelCount = vowelCount;
    return this;
  }

  withConsonantCount({ consonantCount }) {
    this.minConsonantCount = consonantCount;
    return this;
  }

  build(minDensity) {
    return new Boggle(this, minDensity);
  }
}
