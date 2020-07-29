import { words } from "../Resources/words"

class Node {
  constructor(data) {
    this.data = data;
    this.isWord = false;
    this.prefixes = 0;
    this.children = {};
  }
}

export class Trie {

  static trie = new Trie();
  
  constructor() {
    this.root = new Node('');

    for (var x in words) {
      this.add(words[x]);
    }
  }
  
  add(word) {
    if(!this.root) {
      return null;
    }
    this._addNode(this.root, word);
  }

  _addNode(node, word) {
    if(!node || !word) {
      return null;
    }
    node.prefixes++;
    var letter = word.charAt(0);
    var child = node.children[letter];
    if(!child) {
      child = new Node(letter);
      node.children[letter] = child;
    }
    var remainder = word.substring(1);
    if(!remainder) {
      child.isWord = true;
    }
    this._addNode(child, remainder);
  }

  // 0, not a word
  // 1, Yes a word
  // 2, Not a word but it might be
  contains(word) {
    if(!this.root) {
      return false;
    }
    return this._contains(this.root, word);
  }

  _contains(node, word) {
    if(!node || !word) {
      return 0;
    }
    var letter = word.charAt(0);
    var child = node.children[letter];
    if(child) {
      var remainder = word.substring(1);
      if(!remainder) {
        if(child.isWord) {
          return 1;
        } else {
          return 2;
        }
      } else {
        return this._contains(child, remainder);
      }
    } else {
      return 0;
    }
  }

  countWords() {
    if(!this.root) {
      return console.log('No root node found');
    }
    var queue = [this.root];
    var counter = 0;
    while(queue.length) {
      var node = queue.shift();
      if(node.isWord) {
        counter++;
      }
      for(var child in node.children) {
        if(node.children.hasOwnProperty(child)) {
          queue.push(node.children[child]);
        }
      }
    }
    return counter;
  }

  getWords() {
    var words = [];
    var word = '';
    this._getWords(this.root, words, words, word);
    return words;
  }

  _getWords(node, words, word) {
    for(var child in node.children) {
      if(node.children.hasOwnProperty(child)) {
        word += child;
        if (node.children[child].isWord) {
          words.push(word);
        }
        this._getWords(node.children[child], words, word);
        word = word.substring(0, word.length - 1);
      }
    }
  }
}
