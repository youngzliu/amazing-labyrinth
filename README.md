# _Amazing Labyrinth_

#### _The Amazing Labyrinth Board Game for Group Week of the Intro Class, 02/07/2019_

#### By _**Yulia Shidlovskaya, Olya Wysocky, Pavel Zanchuk, Aaron Taylor, Young Liu**_

## Description

_This website allows you to play The Amazing Labyrinth board game. It is made as a group project
for the Intro Programming Course._

## Live Deployment Link

#### [Check out our game here!](https://youngzliu.github.io/amazing-labyrinth/)

## Images:

![Game Screenshot](./screenshot.png)

## Specifications

- _Website will allow players to input their names and display them as the players._
  - _Example input: The player names are inputted in "Enter your name here:"._
  - _Example output: Names will be displayed on the game board._
- _Website will allow input for board size (must be an odd number), and adjust the board size accordingly._
  - _Example input: 7_
  - _Example output: A 7x7 size board is created._
- _Website will allow a user to click a button to see the rules of the game._
  - _Example input: Click the "Show Rules!" button._
  - _Example output: A pop up is displayed with the rules of the game._
- _Website will initialize random locations of the treasures, and a random order they are to be obtained in._
  - _Example input: When the board is created._
  - _Example output: Treasures will appear at random locations on the board, and the goal treasure is randomized._
- _Website will display the current goal treasure that should be obtained._
  - _Example input: The current goal treasure are the silver bars._
  - _Example output: The silver bars at displayed at the bottom of the page._
- _Website will display the current spare maze piece to be shifted in._
  - _Example input: There is currently a corner piece waiting to be shifted in._
  - _Example output: That corner piece will be displayed at the bottom._
- _The player turn order is clockwise, starting from top left._
  - _Example input: Game starts._
  - _Example output: Player 1 (top left) goes first, player 2 (top right) goes next, etc._
- _A message is displayed indicating whose turn it is._
  - _Example input: It is Bob's turn._
  - _Example output: Website will display "It is Bob's turn to [insert action here]"_
- _The current player whose turn it is will be have their player icon colored red._
  - _Example input: It is player 2's turn._
  - _Example output: Player 2's icon will turn red on the board and in the score area._
- _Website will indicate what action the player should be doing on their turn._
  - _Example input: It is Bob's turn to shift a piece in._
  - _Example output: Website will display "It is Bob's turn to shift in a maze piece"_
  - _Example input: It is Bob's turn to move their piece._
  - _Example output: Website will display "It is Bob's turn to move their piece."_
- _The goal treasure is circled with a red border._
  - _Example input: The gold bars are the goal treasure._
  - _Example output: The gold bars are circled with a red border._
- _Website will rotate the current spare maze piece when it is clicked on._
  - _Example input: Click on the spare maze piece._
  - _Example output: The spare piece is rotated 90 degrees clockwise._
- _Website will push the spare piece into the maze are the location of the red arrow click on by the player._
  - _Example input: Player clicks on the left (therefore left to right shift) red arrow on row 2._
  - _Example output: The spare piece is shifted into the maze in row 2 on the left side, and all other pieces are moved to the right one space._
- _Website will display the available spots that the current player can move to after a piece is shifted in._
  - _Example input: Right after a maze piece is shifted in._
  - _Example output: The available spots to move are highlighted with an orange border._
- _Website will move the player to an available spot that is clicked on._
  - _Example input: Player clicks on a spot that is highlighted orange._
  - _Example output: Player moves to that spot._
- _Website will not allow players to move to a unavailable spot (a spot that is unreachable due to the walls of the maze)._
  - _Example input: Player clicks on a spot that is not highlighted orange._
  - _Example output: Nothing happens._
- _Moving to an available spot that has the current goal treasure collects that treasure, giving the player a point and displaying it on the left scoreboard._
  - _Example input: Player 3 moves to an available space that has the current goal treasure._
  - _Example output: The treasure is collected and taken off the board, and displayed under that players name in the left scoreboard._
- _Moving to an available spot that has a current treasure that is NOT the current treasure will not collect that treasure._
  - _Example input: Player 3 moves to an available spot with a treasure that is not the current treasure._
  - _Example output: Nothing happens to the treasure._
- _Website will not allow players to shift a piece/move their piece out of order (You MUST shift first, then move your piece, in that order.)_
  - _Example input: Player 3 tries to click an arrow to shift a maze piece when they are supposed to move their player piece._
  - _Example output: Nothing will happen._
- _Players that are on a maze piece when it is shifted out of the maze will be moved to the opposite end of the maze._
  - _Example input: Player is on the right end of row 2 of the maze, and another player clicks the left arrow of row 2._
  - _Example output: That player is moved to the left side of row 2._
- _Treasure pieces that are shifted out when a maze piece is shifted out of the board remain on that piece when it is the spare card._
  - _Example input: Player shifts out a maze piece with the white diamond treasure on it._
  - _Example output: The white diamond treasure remains on the spare card piece._
- _When all the treasures are collected, the game is over and a pop up is displayed showing who won and the ranking at the end._
  - _Example input: The last treasure is collected._
  - _Example output: A pop up appears detailing who won the game, and the ranks of the players._
- _Website has a reset button that can be pressed to reset the game, or play again._
  - _Example input: Click the "Reset" button._
  - _Example output: The game is recreated with new random treasure locations and board pieces, but the same player list._

## Setup/Installation Requirements

- _Navigate your web browser to https://github.com/sjullieb/amazing-labyrinth_
- _Click the green button "Clone or download" on the repository page._
- _To download the repository choose "Open in Desktop" or "Download Zip"._
- _Alternatively, to clone the repository, type "git clone https://github.com/sjullieb/amazing-labyrinth in the terminal" (note: git should be installed on your PC). For more information visit GitHub Help section Cloning a repository from GitHub:
  https://help.github.com/articles/cloning-a-repository-from-github/_
- _Open index.html in your web browser of choice._

## Support and contact details

_For support please contact any of our team members at Epicodus:_

- _Yulia Shidlovskaya_
- _Olya Wysocky_
- _Aaron Taylor_
- _Pavel Zanchuk_
- _Young Liu_

## Technologies Used

_This website was created using HTML, CSS, the Bootstrap CSS file, Javascript, and the jQuery javascript file._

### License

_MIT License_

_Copyright (c) 2019 Yulia Shidlovskaya, Olya Wysocky, Pavel Zanchuk, Aaron Taylor, Young Liu_

_Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:_

_The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software._

_THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE._
