import React from "react";
import {
    sudokuTable,
    buttons,    
    primary,    
    prefilled
} from "./sudoku.module.css"

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

// 81 boars squares:  ['A1', 'A2'...., 'I8', 'I9'];
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

  for (var s in squares) {
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

export function solve(rawGrid) {
  return search(parseGrid(rawGrid));
}

export function toLine(values) {
  return Object.values(values).join('');
}

export function emptyGrid(){
  return cross(rows, cols).reduce((acc, current) => ({...acc, [current]: 0}), {});
}

export function displayLine(rawGrid) {
  const squares = cross(rows, cols);
  const values = {};
  for (var s in squares) {
      const ch = rawGrid.charAt(s);  
      values[squares[s]] = ch;  
  }
  display(values);    
}

let grid = emptyGrid();
const acceptedKeys = ['1','2','3','4','5','6','7','8','9','Delete','Backspace','Tab','ArrowRight','ArrowLeft','ArrowUp','ArrowDown'];


function getInputTop(current) {
    const [row, col] = current.split('');
    if(row !== 'A'){
        const newRow = rows[rows.indexOf(row) - 1];
        return newRow+col;
    }
}
function getInputBottom(current) {
    const [row, col] = current.split('');
    if(row !== 'I'){
        const newRow = rows[rows.indexOf(row) + 1];
        return newRow+col;
    }
}

function getInputLeft(current) {
    const [row, col] = current.split('');
    if(col!=='1'){
        const newCol = cols[cols.indexOf(col) - 1];
        return row+newCol;
    }
}

function getInputRight(current) {
    const [row, col] = current.split('');
    if(col!=='9'){
        const newCol = cols[cols.indexOf(col) + 1];
        return row+newCol;
    }
}

// document.body.addEventListener('keydown',
function handleInput(event) {    
    if(/input/ig.test(event.target.tagName)){
        if(!acceptedKeys.includes(event.key)){
            event.preventDefault();
            return false;
        } 
        let next;
        if(event.key === 'ArrowRight'){
            next = getInputRight(event.target.name);            
        } else if(event.key === 'ArrowLeft') {
            next = getInputLeft(event.target.name);            
        } else if(event.key === 'ArrowUp') {
            next = getInputTop(event.target.name);            
        }  else if(event.key === 'ArrowDown') {
            next = getInputBottom(event.target.name);    
        }   
        if(next){
            document.querySelector(`input[name=${next}]`).focus();            
            return;
        }

        if(/[1-9]/.test(event.key)){
            event.preventDefault();
            event.target.value = event.key;
            event.target.className = prefilled;
            grid[event.target.name] = +event.key;             
        } else if(event.key === 'Delete' || event.key === 'Backspace') {
            grid[event.target.name] = 0;   
            event.target.className='';          
        }                  
        console.log('primary', primary);
        document.querySelector('.'+primary).disabled = false;
        document.querySelector('.'+primary).innerText = 'Solve';   

        return true;
    }
}

function handlePrimary(event){
    console.log('Press');
    const results = solve(toLine(grid));
    if(results){
        for(let result in results){
            document.querySelector(`input[name=${result}`).value=results[result];
        }
        event.target.innerText = 'Solved!';   
    } else{
        event.target.innerText = 'Cannot be solved :(';
    }
    event.target.disabled=true;
}


const Sudoku = () => {   

    return (<>
        <table className={sudokuTable} onKeyDown={handleInput}>
            <colgroup><col/><col/><col/></colgroup>
            <colgroup><col/><col/><col/></colgroup>
            <colgroup><col/><col/><col/></colgroup>
            <tbody>
                <tr>
                    <td><input name="A1" type="text" inputMode="numeric"  /></td>
                    <td><input name="A2" type="text" inputMode="numeric"  /></td>
                    <td><input name="A3" type="text" inputMode="numeric"  /></td>
                    <td><input name="A4" type="text" inputMode="numeric"  /></td>
                    <td><input name="A5" type="text" inputMode="numeric"  /></td>
                    <td><input name="A6" type="text" inputMode="numeric"  /></td>
                    <td><input name="A7" type="text" inputMode="numeric"  /></td>
                    <td><input name="A8" type="text" inputMode="numeric"  /></td>
                    <td><input name="A9" type="text" inputMode="numeric"  /></td>
                </tr>    
                <tr> 
                    <td><input name="B1" type="text" inputMode="numeric"  /></td>
                    <td><input name="B2" type="text" inputMode="numeric"  /></td>
                    <td><input name="B3" type="text" inputMode="numeric"  /></td>
                    <td><input name="B4" type="text" inputMode="numeric"  /></td>
                    <td><input name="B5" type="text" inputMode="numeric"  /></td>
                    <td><input name="B6" type="text" inputMode="numeric"  /></td>
                    <td><input name="B7" type="text" inputMode="numeric"  /></td>
                    <td><input name="B8" type="text" inputMode="numeric"  /></td>
                    <td><input name="B9" type="text" inputMode="numeric"  /></td>
                </tr>    
                <tr>
                    <td><input name="C1" type="text" inputMode="numeric"  /></td>
                    <td><input name="C2" type="text" inputMode="numeric"  /></td>
                    <td><input name="C3" type="text" inputMode="numeric"  /></td>
                    <td><input name="C4" type="text" inputMode="numeric"  /></td>
                    <td><input name="C5" type="text" inputMode="numeric"  /></td>
                    <td><input name="C6" type="text" inputMode="numeric"  /></td>
                    <td><input name="C7" type="text" inputMode="numeric"  /></td>
                    <td><input name="C8" type="text" inputMode="numeric"  /></td>
                    <td><input name="C9" type="text" inputMode="numeric"  /></td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td><input name="D1" type="text" inputMode="numeric"  /></td>
                    <td><input name="D2" type="text" inputMode="numeric"  /></td>
                    <td><input name="D3" type="text" inputMode="numeric"  /></td>
                    <td><input name="D4" type="text" inputMode="numeric"  /></td>
                    <td><input name="D5" type="text" inputMode="numeric"  /></td>
                    <td><input name="D6" type="text" inputMode="numeric"  /></td>
                    <td><input name="D7" type="text" inputMode="numeric"  /></td>
                    <td><input name="D8" type="text" inputMode="numeric"  /></td>
                    <td><input name="D9" type="text" inputMode="numeric"  /></td>
                </tr>
                <tr>
                    <td><input name="E1" type="text" inputMode="numeric"  /></td>
                    <td><input name="E2" type="text" inputMode="numeric"  /></td>
                    <td><input name="E3" type="text" inputMode="numeric"  /></td>
                    <td><input name="E4" type="text" inputMode="numeric"  /></td>
                    <td><input name="E5" type="text" inputMode="numeric"  /></td>
                    <td><input name="E6" type="text" inputMode="numeric"  /></td>
                    <td><input name="E7" type="text" inputMode="numeric"  /></td>
                    <td><input name="E8" type="text" inputMode="numeric"  /></td>
                    <td><input name="E9" type="text" inputMode="numeric"  /></td>
                </tr>
                <tr>
                    <td><input name="F1" type="text" inputMode="numeric"  /></td>
                    <td><input name="F2" type="text" inputMode="numeric"  /></td>
                    <td><input name="F3" type="text" inputMode="numeric"  /></td>
                    <td><input name="F4" type="text" inputMode="numeric"  /></td>
                    <td><input name="F5" type="text" inputMode="numeric"  /></td>
                    <td><input name="F6" type="text" inputMode="numeric"  /></td>
                    <td><input name="F7" type="text" inputMode="numeric"  /></td>
                    <td><input name="F8" type="text" inputMode="numeric"  /></td>
                    <td><input name="F9" type="text" inputMode="numeric"  /></td>
                </tr>
            </tbody>
            <tbody>
                <tr>
                    <td><input name="G1" type="text" inputMode="numeric"  /></td>
                    <td><input name="G2" type="text" inputMode="numeric"  /></td>
                    <td><input name="G3" type="text" inputMode="numeric"  /></td>
                    <td><input name="G4" type="text" inputMode="numeric"  /></td>
                    <td><input name="G5" type="text" inputMode="numeric"  /></td>
                    <td><input name="G6" type="text" inputMode="numeric"  /></td>
                    <td><input name="G7" type="text" inputMode="numeric"  /></td>
                    <td><input name="G8" type="text" inputMode="numeric"  /></td>
                    <td><input name="G9" type="text" inputMode="numeric"  /></td>
                </tr>
                <tr>
                    <td><input name="H1" type="text" inputMode="numeric"  /></td>
                    <td><input name="H2" type="text" inputMode="numeric"  /></td>
                    <td><input name="H3" type="text" inputMode="numeric"  /></td>
                    <td><input name="H4" type="text" inputMode="numeric"  /></td>
                    <td><input name="H5" type="text" inputMode="numeric"  /></td>
                    <td><input name="H6" type="text" inputMode="numeric"  /></td>
                    <td><input name="H7" type="text" inputMode="numeric"  /></td>
                    <td><input name="H8" type="text" inputMode="numeric"  /></td>
                    <td><input name="H9" type="text" inputMode="numeric"  /></td>
                </tr>
                <tr>
                    <td><input name="I1" type="text" inputMode="numeric"  /></td>
                    <td><input name="I2" type="text" inputMode="numeric"  /></td>
                    <td><input name="I3" type="text" inputMode="numeric"  /></td>
                    <td><input name="I4" type="text" inputMode="numeric"  /></td>
                    <td><input name="I5" type="text" inputMode="numeric"  /></td>
                    <td><input name="I6" type="text" inputMode="numeric"  /></td>
                    <td><input name="I7" type="text" inputMode="numeric"  /></td>
                    <td><input name="I8" type="text" inputMode="numeric"  /></td>
                    <td><input name="I9" type="text" inputMode="numeric"  /></td>
                </tr>
            </tbody>
        </table>    
        <div className={buttons}>
            <button onClick={handlePrimary} className={primary}>Solve</button>
        </div>
        
    </>)

}    



export default Sudoku;