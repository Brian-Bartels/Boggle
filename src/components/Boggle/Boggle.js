import { Trie } from "../../utils/Trie";

export class Boggle {
  static VOWELS = ["a", "e", "i", "o", "u"];
  static CONSONANTS = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "qu", "r", "s", "t", "v", "w", "x", "y", "z"];
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
    const choice = Boggle.randomIntExclusive(0, collection.length);
    return collection[choice];
  }

  static swap(collection, A, B) {
    [collection[A], collection[B]] = [collection[B], collection[A]];
  }

  static shuffle(collection, rounds = 3) {
    const N = collection.length;

    for (let i = 0; i < N * rounds; i++) {
      const j = Boggle.randomIntExclusive(0, N);
      Boggle.swap(collection, i % N, j);
    }
  }

  constructor(build, minDensity) {
    this.boardSize = build.boardSize || Boggle.DEFAULT_BOARD_SIZE;
    this.minWordSize = build.minWordSize || Boggle.DEFAULT_MINIMUM_WORD_SIZE;
    this.minConsonantCount = build.minConsonantCount || Boggle.DEFAULT_MINIMUM_CONSONANT_COUNT;
    this.minVowelCount = build.minVowelCount || Boggle.DEFAULT_MINIMUM_VOWEL_COUNT;
    this.populateBoardFullRand();
    var uniq = this.findAllWords();
    while ((uniq.join("").length - (uniq.length * 2)) < minDensity) {
      this.populateBoardFullRand();
      uniq = this.findAllWords();
    }
  }

  createBoard(N, defaultValue) {
    return Array.from(new Array(N), () => new Array(N).fill(defaultValue));
  }

  populateBoardFullRand() {
    var chars = [];
    const N = this.boardSize;
    this.board = this.createBoard(N);
    this.boardState = this.createBoard(N, false);

    for (let i = 0; i < N * N; i++) {
      chars.push(Boggle.randomChoice(Boggle.ALLCHARS));
    }

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        this.board[r][c] = chars.pop();
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
    if (validity === 1){
      wordList.push(engWord);
    }
  }

  populateBoard() {
    var chars = [];
    const N = this.boardSize;
    this.board = this.createBoard(N);
    this.boardState = this.createBoard(N, false);
    while (true) {
      // Generate required vowel quantity
      for (let i = 0; i < this.minVowelCount; i++) {
        chars.push(Boggle.randomChoice(Boggle.VOWELS));
      }

      // Generate required consonant quantity
      for (let i = 0; i < this.minConsonantCount; i++) {
        chars.push(Boggle.randomChoice(Boggle.CONSONANTS));
      }

      // Generate remaining vowel/consonant quantity
      while (chars.length < N * N) {
        chars.push(Boggle.randomChoice(Boggle.VOWELS.concat(Boggle.CONSONANTS)));
      }

      var charCount = {};
      var badBoard = false;
      for (var i=0; i < chars.length; i++) {
        if (charCount[chars[i]]) {
          charCount[chars[i]]++;
        } else {
          charCount[chars[i]] = 1;
        }
      }
      
      // count of QU | J | Z | X
      var badCount = 0;
      if (charCount["u"] + charCount["qu"] >= 3) {
        console.log("Too Many U's");
        console.log(charCount);
        badBoard = true;
      }
      for (var key in charCount) {
        if (charCount[key] >= 4) {
          badBoard = true;
        } else if (key.toUpperCase() === "QU" || key.toUpperCase() === 'J' || key.toUpperCase() === 'Z' || key.toUpperCase() === 'X') {
          badCount += charCount[key];
          if (charCount[key] > 2) {
            badBoard = true;
          }
        }
      }
      if (badCount > 3) {
        badBoard = true;
      }
      if (!badBoard) {
        break;
      } else {
        // that board wasn't good, let's wipe it and try again
        chars = [];
      }
    }
    
    
    Boggle.shuffle(chars, 10);

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        this.board[r][c] = chars.pop();
      }
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
