---
title: Sudoku Solver
pubDate: 2022-10-20
description: How I've build a program that solves any Sudoku
keywords: ["Sudoku"]
---

I became interested in the Sudoku game after a failed opportunity to build it for a client.
I've never played Sudoku before (I'm a video game fan) but soon I found how complex this
little game is and how many things must be implemented for a great experience.

So I started to build it for myself. Soon I found that I need a lot of things:

- a solver: a program that solves the game by finding all the missing digits
- a generator: a program that can generate games of different difficulty, ideally automated, new games every day.
- a great UI: candidates support, a lot of helper functions like hints, auto check for mistakes,
  check if a cell is correct, check if all the cells are correct, and so on.

For the moment I've implemented the solver, and in this post, we'll detail how it was done. If you want to test it, find a Sudoku somewhere, put the digits in and press the “Solve” button. If the Sudoku can be solved you'll see the solution:
[Sudoku Solver](https://solving-sudoku.netlify.app/)

## Inspiration

I've found the ultra-elegant solution done by Peter Norvig, [Solving Every Sudoku Puzzle](http://norvig.com/sudoku.html)
written in Python. Sadly I needed the JavaScript version, and an easy port of that Python code is not possible because JavaScript doesn't
have the same iterators and built-in functions.

The solving strategy is:

1. For each cell with a single digit (known digit from the start) eliminate that digit
   from all the peer cells (the row, the column, and the box that contains the digit).
2. After these initial eliminations, is possible to have new cells with single digits,
   so we need to repeat step 1 for them. In the end, we'll have some cells with a single digit,
   some maybe with 2 or 3 digits, and some still with 9 digits - representing all the possible
   digits that might go in that cell.
3. Do a brute-force search for the solution by looping through each cell digit
   until we have the solution. (For example, using the above grid, we try 4,1,1,1...,
   then 4,6,1,1...).

## Data models

To create the data models we'll use a function that creates the "cross product"
of two arrays. Cross `[A, B]` with `[1, 2]` will result in `[A1, A2, B1, B2]`

```js
function cross(A, B){
    return A.map(a => B.map(b => a+b)).flat();
}
```

We also need some constants:

```js
const rows = ['A','B','C','D','E','F','G','H','I'];
const cols = ['1','2','3','4','5','6','7','8','9'];
const boxRows = [['A','B','C'], ['D','E','F'], ['G','H','I']];
const boxCols = [['1','2','3'], ['4','5','6'], ['7','8','9']];
const digits = "123456789";
```

We this, we can now define:

### All squares (cells)

```js
// 81 boards squares:  ['A1', 'A2'...., 'I8', 'I9'];
const squares = cross(rows, cols);
```

### Board units

When you fill a Sudoku the rule is that one digit can appear once in a `row`, a `column`,
or a `box`. So these are the `unitlist` we care about:

```js
// all columns, all rows, and all 3x3 boxes
const unitlist = [];

// add all columns
cols.forEach(c => unitlist.push(cross(rows, [c]) ) );

// add all rows
rows.forEach(r => unitlist.push(cross([r], cols) ) );

// add all boxes (3x3 boxes)
boxRows.forEach(rs => boxCols.forEach(cs => unitlist.push(cross(rs, cs))));
```

### Square units

Add the row, col, and box each square belongs to:

```js
const units = {};
squares.forEach(sq => {
    // find each unit that contains the square and add it here
    units[sq] = unitlist.filter(u => u.includes(sq))
});
```

### Square peers

All peers squares, all squares that cannot have the same value, basically the above units without the square itself

```js
const peers = {};
squares.forEach(sq => {
    // find all squares that are not equal to sq
    const peerSqs = units[sq].map(u => u.filter(s => s !== sq)).flat();
    // transform peer array to object where each sq value is true, e.g. { B1: true, C1: true, ... C2: true, C3: true }
    peers[sq] = peerSqs.reduce((acc, curr) => {acc[curr] = true; return acc}, {});
});
```

## Eliminating digits

We initialize the digits for each square to 123456789, meaning each digit can be the final value
in each square.

```
123456789  123456789  123456789 | 123456789  123456789  123456789 | 123456789  123456789  123456789
123456789  123456789  123456789 | 123456789  123456789  123456789 | 123456789  123456789  123456789
123456789  123456789  123456789 | 123456789  123456789  123456789 | 123456789  123456789  123456789
--------------------------------+---------------------------------+------------------------
123456789  123456789  123456789 | 123456789  123456789  123456789 | 123456789  123456789  123456789
123456789  123456789  123456789 | 123456789  123456789  123456789 | 123456789  123456789  123456789
123456789  123456789  123456789 | 123456789  123456789  123456789 | 123456789  123456789  123456789
--------------------------------+---------------------------------+------------------------
123456789  123456789  123456789 | 123456789  123456789  123456789 | 123456789  123456789  123456789
123456789  123456789  123456789 | 123456789  123456789  123456789 | 123456789  123456789  123456789
123456789  123456789  123456789 | 123456789  123456789  123456789 | 123456789  123456789  123456789
```

Each sudoku gives us some digits, so we know the digit in some squares from the start. We can safely remove those digits from the rest of the square peers. For example, if we know that 4 is the digit that goes in the first cell, A1, then we can remove 4 from all the row, column, and box squares that contain A1:

```
4         12356789  12356789  | 12356789  12356789  12356789  | 12356789  12356789  12356789
12356789  12356789  12356789  | 123456789 123456789 123456789 | 123456789 123456789 123456789
12356789  12356789  12356789  | 123456789 123456789 123456789 | 123456789 123456789 123456789
------------------------------+-------------------------------+-------------------------------
12356789  123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
12356789  123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
12356789  123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
------------------------------+-------------------------------+-------------------------------
12356789  123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
12356789  123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
12356789  123456789 123456789 | 123456789 123456789 123456789 | 123456789 123456789 123456789
```

After we reduce all the digits we know we end up with something like this:

```
4       1679    12679   | 139     2369    269     | 8       1239    5
26789   3       1256789 | 14589   24569   245689  | 12679   1249    124679
2689    15689   125689  | 7       234569  245689  | 12369   12349   123469
------------------------+-------------------------+-------------------------
3789    2       15789   | 3459    34579   4579    | 13579   6       13789
3679    15679   15679   | 359     8       25679   | 4       12359   12379
36789   4       56789   | 359     1       25679   | 23579   23589   23789
------------------------+-------------------------+-------------------------
289     89      289     | 6       459     3       | 1259    7       12489
5       6789    3       | 2       479     1       | 69      489     4689
1       6789    4       | 589     579     5789    | 23569   23589   23689
```

This is done by the `parseGrid`, `assign`, and `eliminate` functions (full code at the end).

After this phase is done, the `solve` function does a brute-force search for a solution:

1. Search for a square with the fewest digits (more than one).
2. Assume one of those digits is the correct one.
3. Try to eliminate the digit from peers and continue until we have a solution.
   If at some point the eliminations fail, go back to step 1.

## Full code

```js
/*
SUDOKU solver

Each square has a name, like A1, D4, F7:

    1  2  3   4  5  6   7  8  9
  -----------------------------
A | A1 A2 A3| A4 A5 A6| A7 A8 A9
B | B1 B2 B3| B4 B5 B6| B7 B8 B9
C | C1 C2 C3| C4 C5 C6| C7 C8 C9
    --------+---------+---------
D | D1 D2 D3| D4 D5 D6| D7 D8 D9
E | E1 E2 E3| E4 E5 E6| E7 E8 E9
F | F1 F2 F3| F4 F5 F6| F7 F8 F9
    --------+---------+---------
G | G1 G2 G3| G4 G5 G6| G7 G8 G9
H | H1 H2 H3| H4 H5 H6| H7 H8 H9
I | I1 I2 I3| I4 I5 I6| I7 I8 I9

We have rows, columns and 3x3 boxes, e.g.
* Row A: A1 A2 A3 A4 A5 A6 A7 A8 A9
* Col 1: A1 B1 C1 D1 E1 F1 G1 H1 I1
* Box 1: A1 A2 A3
         B1 B2 B3
         C1 C2 C3
*/

/* [A,B,..]+[1,2..] => [A1,A2..,B1,B2..] */
function cross(A, B){
    return A.map(a => B.map(b => a+b)).flat();
}

const rows = ['A','B','C','D','E','F','G','H','I'];
const cols = ['1','2','3','4','5','6','7','8','9'];
const boxRows = [['A','B','C'], ['D','E','F'], ['G','H','I']];
const boxCols = [['1','2','3'], ['4','5','6'], ['7','8','9']];
const digits = "123456789";

// 81 board squares:  ['A1', 'A2'...., 'I8', 'I9'];
const squares = cross(rows, cols);

// all colums, all rows and all 3x3 boxes
const unitlist = [];
// add all columns
cols.forEach(c => unitlist.push(cross(rows, [c]) ) );

// add all rows
rows.forEach(r => unitlist.push(cross([r], cols) ) );

// add all boxes (3x3 boxes)
boxRows.forEach(rs => boxCols.forEach(cs => unitlist.push(cross(rs, cs))));

// add the row, col and box each square belongs to
const units = {};
squares.forEach(sq => {
    // find each unit that contains the square and add it here
    units[sq] = unitlist.filter(u => u.includes(sq))
});

// all peers squares, all squares that cannot have the same value
// basically the above units without the square
const peers = {};
squares.forEach(sq => {
    // find all squares that are not equal to sq
    const peerSqs = units[sq].map(u => u.filter(s => s !== sq)).flat();
    // transform peer array to object where each sq value is true, e.g. { B1: true, C1: true, ... C2: true, C3: true }
    peers[sq] = peerSqs.reduce((acc, curr) => {acc[curr] = true; return acc}, {});
});


 // Given a string of 81 digits (or . or 0 or -), return an obj as {cell:values}
function parseGrid(rawGrid) {
  if(!rawGrid || rawGrid.length !== 81){
    throw new Error(`Invalid data, 81 characters expected`);
  }

  let grid = '';
  for(let ch of rawGrid) {
    if(/[0.\-123456789]/g.test(ch)) {
      grid += ch;
    } else {
      throw new Error(`Invalid character ${ch}. Accepted charcters are: 0.-123456789`)
    }
  }

  const values = {};
  // initialize the value of each square to 1234556789
  squares.forEach(sq => { values[sq] = digits });

  for (let s in squares) {
      const ch = grid.charAt(s);
      // if the value is a digit remove that value from all the peers
      if (digits.indexOf(ch) >= 0 && !assign(values, squares[s], ch))
        return false;
    }

  return values;
}

/*
  Eliminate all the other values (except dig) from values[sq] and propagate.
*/
function assign(values, sq, dig) {
  let result = true;
  const squareValues = values[sq];
  // eliminate each ch from peers, e.g squareValues=123456789, dig=1 => remove
  for(let ch of squareValues)
    if(ch !== dig)
      result &= !!eliminate(values, sq, ch);

  return result && values;
}

function eliminate(values, sq, dig) {
  // if already eliminated.
  if (values[sq].indexOf(dig) === -1)
    return values;

  // remove dig from square digits
  values[sq] = values[sq].replace(dig, "");

  // invalid input ?
  if (values[sq].length === 0) {
    return false; // bail out, wrong state
  }
  else if (values[sq].length === 1) {
    // (1) if there is only one digit left in square,
    // remove it from peers
    let result = true;
    for (let s in peers[sq])
      result &= !!eliminate(values, s, values[sq]);
    if (!result) return false; // bail out, wrong state
  }

  // (2) if a unit u is reduced to only one place for a value d,
  // then put it there.
  for(let unit of units[sq]) {
    // when we remove a digit from a square there is a chance that that digit
    // is now only once present in the square's row/col/box which means
    // that place is the digit's place on board
    const digitPlaces = unit.filter(unitSq => values[unitSq].indexOf(dig) !== -1);
    if(digitPlaces.length === 1) {
      if (!assign(values, digitPlaces[0], dig)){
        return false; // bail, no luck
      }
    }
  }
  return values;
}


function search(values){
  // bad state, can't solve
  if (!values)
    return false;

  // find square with biggest number of digits,
  // if max is 1 we are done, all squares should have 1 digit
  const max = squares.map(sq => values[sq]).reduce((max, val) => Math.max(max, val.length), 0);
  if(max === 1)
    return values;

  // chose the unfilled square s with the fewest possibilities
  const sortedSquares = [...squares].filter(sq => values[sq].length !== 1);
  sortedSquares.sort((a, b) => values[a].length > values[b].length ? 1 : -1);

  const minSquare = sortedSquares[0];
  const minSquareDigits = values[minSquare];

  for(let dig of minSquareDigits) {
    const valuesClone = {...values};
    const result = search(assign(valuesClone, minSquare, dig));
    if(result) {
      return result;
    }
  }

  return false; // no luck
}


// Display board
function display(values){
  if(!values) return;

  // find max square digits e.g can be 123456789 or less
  const width = squares.map(sq => values[sq]).reduce((max, val) => Math.max(max, val.length), 0);
  const boxBottom = '\n'+'-'.repeat(width*3+3)+'+'+'-'.repeat(width*3+4)+'+'+'-'.repeat(width*3+4);

  let board = rows.map((row, rindex) => {
    let rowString = cols
                      .map(col => values[row + col]) // get square digits e.g. '1234'
                      .map(val => val += ' '.repeat(width - val.length + 1)) // add extra empty spaces
                      .map((str, index) => index === 2 || index === 5 ? str +='| ': str) // add separator
                      .join('') // transform to string
    if(rindex === 2 || rindex === 5) {
      rowString+=boxBottom;
    }

    return rowString;
  }).join('\n');
  console.log('\n');
  console.log(board);
}

function solve(rawGrid) {
  return search(parseGrid(rawGrid));
}

// usage
display(solve('4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......'));
```

## Resources

- [Solving Every Sudoku Puzzle](http://norvig.com/sudoku.html)
- [Sudoku Solving Program : Translating Python to JavaScript](http://pankaj-k.net/weblog/2007/03/sudoku_solving_program_transla.html)
