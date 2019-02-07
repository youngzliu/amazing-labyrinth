function Game(size){
  this.players = [],
  this.playerId = 0,
  this.currentPlayer,
  this.treasures = [],
  this.treasureId = 10,
  this.currentTreasure,
  this.boardSize = size,
  this.defaulPlayerPosition = [[0, 0], [0, size-1], [size-1, 0], [size-1, size-1]]
}

Game.prototype.initialize = function(){
  this.board = new Board(this.boardSize);
  this.board.initializeCards();
  // initialize Players positions, treasures positions
  this.userInterface = new UserInterface();
  //this.userInterface.onCardClick = this.clickCard;
  this.userInterface.onArrowClick = this.clickArrow;
  //this.userInterface.assignRandomImages(this.boardSize);
  this.userInterface.showBoard(this.boardSize, this.board.cards);
  this.userInterface.attachListeners();
}

function Player(name){
  this.name = name;
  this.treasures = [];
}

UserInterface.prototype.onCardClick = function(callback){
  //callback();
  callback.apply(this);
}

Game.prototype.clickCard = function(x, y){
  var accessibleCards = this.board.getAccessibleCards(x, y);
  console.log(accessibleCards);
}

Game.prototype.clickArrow = function(x, y){
  game.board.pushingCard(x, y, game.board.freeCard);
  game.userInterface.showBoard(game.boardSize, game.board.cards);
}

Game.prototype.addPlayer = function(player){
  if (this.playerId === 4){
    alert("This is the 5th player. Only 4 players can be in the game.");
    return false;
  }

  if (this.playerId === 0) {
    this.currentPlayer = player;
  }
  this.players.push(player);
  player.id = this.playerId;

  this.board.placeItem(player.id, this.defaulPlayerPosition[player.id][0], this.defaulPlayerPosition[player.id][1]);
  this.playerId += 1;

  return true;
}

function Board(size) {
  this.size = size
}

Board.prototype.pushingCard = function(x, y, pushCard){
  var spareCard; //The card that will get pushed out
  if(y === 0 || y === this.cards.length - 1){ //Inserting the card into a row
    if(y === 0){ //Direction is left to right
      spareCard = this.cards[x][this.cards.length - 1];
      spareCard.x = -1; //Resetting cooirdinates of spare card
      spareCard.y = -1;
      for(var i = this.cards.length - 1; i > 0; i--){
        this.cards[x][i] = this.cards[x][i-1];
        this.cards[x][i].y++;//Updating y cooirdinate of shifted element
      }
      this.cards[x][0] = pushCard; //Card that is being pushed in
      this.cards[x][0].x = x;
      this.cards[x][0].y = 0;
      this.freeCard = spareCard;
    }else{ //Direction is right to left
      spareCard = this.cards[x][0];
      spareCard.x = -1; //Resetting cooirdinates of spare card
      spareCard.y = -1;
      for(var i = 0; i < this.cards.length - 1; i++){
        this.cards[x][i] = this.cards[x][i+1];
        this.cards[x][i].y--;//Updating y cooirdinate of shifted element
      }
      this.cards[x][this.cards.length - 1] = pushCard; //Card that is being pushed in
      this.cards[x][this.cards.length - 1].x = x;
      this.cards[x][this.cards.length - 1].y = this.cards.length - 1;
      this.freeCard = spareCard;
    }
  }else{ //Inserting the card into a column
    if(x === 0){ //Direction is top to bottom
      spareCard = this.cards[this.cards.length - 1][y];
      spareCard.x = -1;
      spareCard.y = -1;
      for(var i = this.cards.length - 1; i > 0; i--){
          this.cards[i][y] = this.cards[i-1][y];
          this.cards[i][y].x++;
      }
      this.cards[0][y] = pushCard;
      this.cards[0][y].x = 0;
      this.cards[0][y].y = y;
      this.freeCard = spareCard;
    }else{ //Direction is bottom to top
      spareCard = this.cards[0][y];
      spareCard.x = -1;
      spareCard.y = -1;
      for(var i = 0; i < this.cards.length - 1; i++){
          this.cards[i][y] = this.cards[i+1][y];
          this.cards[i][y].x--;
      }
      this.cards[this.cards.length-1][y] = pushCard;
      this.cards[this.cards.length-1][y].x = this.cards.length - 1;
      this.cards[this.cards.length-1][y].y = y;
      this.freeCard = spareCard;
    }
  }
};

// finds Player or Treasure by id
Board.prototype.findItem = function(id){
  for (var i = 0; i < this.cards.length; i++) {
    for (var j = 0; j < this.cards[i].length; j++) {
      if (this.cards[i][j]){
        if (this.cards[i][j].id === id) {
          return cards[i][j];
        }
      }
    }
  }
  return false;
}

// place Player or Treasure Id on the board
Board.prototype.placeItem = function(itemId, x, y){
  this.cards[x][y].items.push(itemId);
}

// removes Player or Treasure Id from the board
Board.prototype.removeItem = function(id, x, y){
  var items = this.cards[x][y].items;
  if (items.indexOf(id) !== -1){
    items.splice(items.indexOf(id), 1);
    return true;
  }
  return false;
}

//form a list of cards that can be reached from the position x,y
Board.prototype.getAccessibleCards = function(x, y){
  this.nodes = [];
  for (var i = 0; i < this.cards.length; i++) {
    for (var j = 0; j < this.cards[i].length; j++) {
      this.makeEdges(this.cards[i][j]);
    };
  };

  console.log(this);


  traverceGraphInDeep(this.cards[x][y].node);

  var accessibleCards = [];
  for (var i = 0; i < this.nodes.length; i++) {
    if (this.nodes[i].visited === true) {
      accessibleCards.push(this.nodes[i].id);
    }
  };
  return accessibleCards;
}

function Card(id, x, y){
  this.id = id,
  this.x = x,
  this.y = y,
  this.items = [], // array of players and treasures id
  this.rightWall = false,
  this.leftWall = false,
  this.topWall = false,
  this.bottomWall = false
}

Card.prototype.rotate = function(){
    //Rotating to the right
    var rightWallValue = this.rightWall;
    this.rightWall = this.topWall;
    this.topWall = this.leftWall;
    this.leftWall = this.bottomWall;
    this.bottomWall = rightWallValue;
    this.rotationAngle += 90;
    if(this.rotationAngle > 270){
      this.rotationAngle = 0;
    }
}

Card.prototype.setWalls = function(){
  if (this.type === 0){ // straight up-down path
    if(this.rotationAngle === 0 || this.rotationAngle === 180) {
      this.leftWall = true;
      this.rightWall = true;
    } else {
      this.topWall = true;
      this.bottomWall = true;
    }
  } else if (this.type === 1) { // corner left-bottom path
    if (this.rotationAngle === 0) {
      this.topWall = true;
      this.rightWall = true;
    } else if (this.rotationAngle === 90) {
      this.bottomWall = true;
      this.rightWall = true;
    } else if (this.rotationAngle === 180) {
      this.bottomWall = true;
      this.leftWall = true;
    } else {
      this.topWall = true;
      this.leftWall = true;
    }
  } else { // t-shape left-right-bottom path
    if (this.rotationAngle === 0) {
      this.topWall = true;
    } else if (this.rotationAngle === 90) {
      this.rightWall = true;
    } else if (this.rotationAngle === 180) {
      this.bottomWall = true;
    } else {
      this.leftWall = true;
    }
  }
}
Card.prototype.showWalls = function(){
  console.log(this.x.toString() + " " + this.y.toString() + " top: " + this.topWall.toString() + " right: " + this.rightWall.toString() + " bottom: " + this.bottomWall.toString() + " left: " + this.leftWall.toString());
}

Board.prototype.makeEdges = function(card){

  this.nodes.push(card.node);
  card.node.edges = [];
  card.node.visited = false;

  var x = card.x - 1;
  if (x >= 0 && this.cards[x][card.y].bottomWall == false && card.topWall == false) {
    card.node.edges.push(this.cards[x][card.y].node);
  }

  x = card.x + 1;
  if ((x < this.size) && (this.cards[x][card.y].topWall == false) && (card.bottomWall == false)) {
    card.node.edges.push(this.cards[x][card.y].node);
  }
  var y = card.y - 1;
  if (y >= 0 && this.cards[card.x][y].rightWall == false && card.leftWall == false) {
    card.node.edges.push(this.cards[card.x][y].node);
  }
  y = card.y + 1;
  if (y < this.size && this.cards[card.x][y].leftWall == false && card.rightWall == false) {
    card.node.edges.push(this.cards[card.x][y].node);
  }
};

function UserInterface(){
  this.images = ["straight.png", "corner.png", "t-shape.png"]
}

UserInterface.prototype.showBoard = function(size, cards){
  var tag = $("#board");
  var htmlText = "";
  for (var i = 0; i < size; i++) {
    // adding top row with arrows
    if (i === 0) {
      htmlText += "<tr id='" + (i-1).toString() + "'>";
      for (var j = -1; j < size + 1; j++) {
        if ((j % 2 === 1) && j !== size) {
          htmlText += "<th id='arrow" + i.toString() + "_" + j.toString() + "'><img class='rotate180 arrow' src='img/arrow.png'></th>";
        } else {
          htmlText += "<th></th>";
        }
      };
      htmlText += "</tr>";
    }

    htmlText += "<tr id='" + i.toString() + "'>";
    for (var j = 0; j < size; j++) {
      if ((j === 0) && (i % 2 === 1)) {
        htmlText += "<th id='arrow" + i.toString() + "_" + j.toString() + "'><img class='rotate90 arrow' src='img/arrow.png'></th>";
      } else if ((j === 0) && (i % 2 !== 1)) {
        htmlText += "<th></th>";
      }
      htmlText += "<th id='card" + i.toString() + "_" + j.toString() + "'><img class='rotate" + cards[i][j].rotationAngle + "' src='img/" + this.images[cards[i][j].type] + "'></th>";
      if ((j === size - 1) && (i % 2 === 1)) {
        htmlText += "<th id='arrow" + i.toString() + "_" + j.toString() + "'><img class='rotate270 arrow' src='img/arrow.png'></th>";
      } else if ((j === size - 1) && (i % 2 !== 1)) {
        htmlText += "<th></th>";
      }
    };
    htmlText += "</tr>"

    // adding bottom row with arrows
    if (i === size - 1) {
      htmlText += "<tr id='" + (i-1).toString() + "'>";
      for (var j = -1; j < size + 1; j++) {
        if ((j % 2 === 1) && j !== size) {
          htmlText += "<th id='arrow" + i.toString() + "_" + j.toString() + "'><img class='rotate0 arrow' src='img/arrow.png'></th>";
        } else {
          htmlText += "<th></th>";
        }
      };
      htmlText += "</tr>";
    }

  };
  tag.html(htmlText);
  var cardToUse = "<img class='rotate" + game.board.freeCard.rotationAngle + "' src='img/" + this.images[game.board.freeCard.type] + "' id='freeCard'>";
  $("#cardToUse").html(cardToUse);
}

Board.prototype.initializeCards = function(){
  // randomly assign cards images
  // some should be sticked to the board
  var cardId = 0;
  this.cards = new Array(this.size);
  for (var i = 0; i < this.size; i++) {
    this.cards[i] = new Array(this.size);
    for (var j = 0; j < this.size; j++) {
      this.cards[i][j] = new Card(cardId, i, j);
      this.cards[i][j].node = new Node(cardId);
      cardId += 1;
// need to REPLACE:
// should be specific number of each cards!
      this.cards[i][j].setInitialParameters();
    }
  }
  this.freeCard = new Card(cardId, -1, -1);
  this.freeCard.setInitialParameters();
  console.log(this);
  this.freeCard.node = new Node(cardId);
}


Card.prototype.setInitialParameters = function(){
  this.type = Math.floor(Math.random() * 3);
  this.rotationAngle = Math.floor(Math.random() * 4) * 90;
  this.setWalls();
}

var boardSize = 5;

var game = new Game(boardSize);

//function attachListeners(){
UserInterface.prototype.attachListeners = function(){
  var userInt = this;
  $("#board").on("click", "th", function(){
    console.log(this.id);
    if (this.id.indexOf("card") !== -1){
      var underlineIndex = this.id.indexOf("_");
      var x = parseInt(this.id.substring(4, underlineIndex));
      var y = parseInt(this.id.substring(underlineIndex + 1, this.id.length));

      game.clickCard(x, y);
      //userInt.onCardClick(game.clickCard);

    } else if (this.id.indexOf("arrow") !== -1){
      var underlineIndex = this.id.indexOf("_");
      var x = parseInt(this.id.substring(5, underlineIndex));
      var y = parseInt(this.id.substring(underlineIndex + 1, this.id.length));
        userInt.onArrowClick(x, y);
    }


  });
  $("#cardToUse").on("click", "#freeCard", function(){
    game.board.freeCard.rotate();
    game.userInterface.showBoard(game.boardSize, game.board.cards);
  });
}

$(document).ready(function(){
  //attachListeners();
  game.initialize();



  console.log(game.board.cards);
  //game.board.removeItem(0, 0, 0);
  console.log(game.board.cards);
  // treasure = new Treasure("Treasure 1");
  // game.addTreasure(treasure);
  //
  // game.startGame();
console.log(game);

  $("#main").click(function(){

    // var id = 0;
    // for (var i = 0; i < cards.length; i++) {
    //   for (var j = 0; j < cards[i].length; j++) {
    //     var card = new Card(id, i, j);
    //     id += 1;
    //     cards[i][j] = card;
    //   };
    // };

console.log(cards);


  });
});

$(document).ready(function() {
  $("#form").submit(function(event){
    event.preventDefault();
    var theName = $("input#name").val();
    $("#form").trigger('reset');
    var nameCapitalized = theName.charAt(0).toUpperCase()+theName.slice(1);
    var player = new Player(nameCapitalized);

    game.addPlayer(player);

    game.players.forEach(function(player){
      $("ul#showListOfPlayers").append("<li id=" + player.id + "><h3>" + player.name + "</h3></li>");
    });
  });

  $("#letsPlay").click(function(){
    game.players.forEach(function(player){
      $(".showScore").append("<h3><span id=" + player.id + ">" + player.name + "</span>, here's your score:</h3>");
      $(".showScore").append("<h3>" + player.treasures + "</h3>");
    });
    $("#startScreen").hide();
    $(".showScore").show();
    $("#showGame").fadeToggle();
  });


});
