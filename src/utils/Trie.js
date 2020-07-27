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

  remove(word) {
    if(!this.root) {
      return;
    }
    // This seems wrong. remove subtree too?
    if(this.contains(word)) {
      this._removeNode(this.root, word);
    }
  }

  _removeNode(node, word) {
    if(!node || !word) {
      return;
    }
    node.prefixes--;
    var letter = word.charAt(0);
  
    var child = node.children[letter];
    if(child) {
      var remainder = word.substring(1);
      if(remainder) {
        if(child.prefixes === 1) {
          delete node.children[letter];
        } else {
          this._removeNode(child, remainder);
        }
      } else {
        if(child.prefixes === 0) {
          delete node.children[letter];
        } else {
          child.isWord = false;
        }
      }
    }
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

  print() {
    if(!this.root) {
      return console.log('No root node found');
    }
    var newline = new Node('|');
    var queue = [this.root, newline];
    var string = '';
    while(queue.length) {
      var node = queue.shift();
      string += node.data.toString() + ' ';
      if(node === newline && queue.length) {
        queue.push(newline);
      }
      for(var child in node.children) {
        if(node.children.hasOwnProperty(child)) {
          queue.push(node.children[child]);
        }
      }
    }
    console.log(string.slice(0, -2).trim());
  }

  printByLevel() {
    if(!this.root) {
      return console.log('No root node found');
    }
    var newline = new Node('\n');
    var queue = [this.root, newline];
    var string = '';
    while(queue.length) {
      var node = queue.shift();
      string += node.data.toString() + (node.data !== '\n' ? ' ' : '');
      if(node === newline && queue.length) {
        queue.push(newline);
      }
      for(var child in node.children) {
        if(node.children.hasOwnProperty(child)) {
          queue.push(node.children[child]);
        }
      }
    }
    console.log(string.trim());
  }
}

// trie.add('one');
// trie.add('two');
// trie.add('fifth');
// trie.add('fifty');
// trie.print(); // => | o t f | n w i | e o f | t | h y
// trie.printByLevel(); // => o t f \n n w i \n e o f \n t \n h y
// console.log('words are: one, two, fifth, fifty:', trie.getWords()); // => [ 'one', 'two', 'fifth', 'fifty' ]
// console.log('trie count words is 4:', trie.countWords()); // => 4
// console.log('trie contains one is true:', trie.contains('one')); // => true
// console.log('trie contains on is false:', trie.contains('on')); // => false
// trie.remove('one');
// console.log('trie contains one is false:', trie.contains('one')); // => false
// console.log('trie count words is 3:', trie.countWords()); // => 3
// console.log('words are two, fifth, fifty:', trie.getWords()); // => [ 'two', 'fifth', 'fifty' ]