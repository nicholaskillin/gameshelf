'use strict';

// Gets the Data from BoardGame Geek

function getBggData() {
  // Finds out if we are searching Board Games, Expansions, or both
  if (document.getElementById("searchBoardGames").checked == true && document.getElementById("searchExpansions").checked == true) {
    var type = "boardgame,boardgameexpansion";
  } else if (document.getElementById("searchBoardGames").checked == true) {
    var type = "boardgame";
  } else {
    var type = "boardgameexpansion";
  }

  // Get search term and create the API URL to query
  var searchTerm = document.getElementById("searchTerm").value;
  var uri = encodeURI(searchTerm);
  var httpURL = "https://www.boardgamegeek.com/xmlapi2/search?type=" + type + "&query=" + uri;

  // Query the API
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      displayData(this);
    }
  };
  xhttp.open("GET", httpURL, true);
  xhttp.send();
}

function displayData(xml) {
  var i;
  var searchResults = xml.responseText;

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(searchResults,"text/xml");

  var table = "<tr><th>Game</th><th>Year Released</th></tr>";
  var x = xmlDoc.getElementsByTagName("item").length;
  for (i = 0; i < x ; i++) { 
    table += "<tr onclick=\"getGameData(" + xmlDoc.getElementsByTagName("item")[i].getAttribute("id") + ")\"><td>" +
    xmlDoc.getElementsByTagName("name")[i].getAttribute("value") +
    "</td><td>" +
    xmlDoc.getElementsByTagName("yearpublished")[i].getAttribute("value") + 
    "</td></tr>";
  }
  document.getElementById("resultsHeader").innerHTML = "Search Results = " + x + " items.";
  document.getElementById("searchResults").innerHTML = table;
}

// Makes sure that Board Games or Expansions are always selected in the search params

function updateGames() {
  if (document.getElementById("searchBoardGames").checked == false && document.getElementById("searchExpansions").checked == false) {
    document.getElementById("searchExpansions").checked = true;
  }
}

function updateExpansions() {
  if (document.getElementById("searchBoardGames").checked == false && document.getElementById("searchExpansions").checked == false) {
    document.getElementById("searchBoardGames").checked = true;
  }
}

// Once a user selects a game from the search results this funciton gets more detailed data about that specific game from BGG
function getGameData(selectedGame) {
  // Close the new game modal
  $('#newgame').modal('hide');

  // Query the API
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      addGame(this.responseText);
      // console.log(this.responseText);
    }
  };
  xhttp.open("GET", "https://www.boardgamegeek.com/xmlapi2/thing?id=" + selectedGame, true);
  xhttp.send();
}

// Once we have that game data we will use it to create a game in our app

function addGame(gameData) {
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(gameData,"text/xml");

  // Check categories and create any new categories that need created
  var gameCategories = [];

  // for each category in the JSON push into gameCategories  
  var x = xmlDoc.getElementsByTagName("link").length;
  var i = 0
  for (i = 0; i < x ; i++) { 
    var type = xmlDoc.getElementsByTagName("link")[i].getAttribute("type");
    if (type == "boardgamecategory") {
      var categoryData = {
        name: xmlDoc.getElementsByTagName("link")[i].getAttribute("value"),
        bgg_id: xmlDoc.getElementsByTagName("link")[i].getAttribute("id")
      };
      gameCategories.push(categoryData);
    }
  }
  console.log(gameCategories);

  // Send to rails so that we can see if the category already exists or not
  var x = gameCategories.length;
  var i = 0;
  for (i = 0; i < x; i++) {
    
    $.ajaxSetup({
      headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
    });
    
    $.ajax({
      url: '/categories',
      type: 'POST',
      dataType: 'json',
      data: gameCategories[i],
      success: function (response) {
        console.log(response);
      }
    });
  }

  // Create game variable and submit to controller
  var game = {
    title: xmlDoc.getElementsByTagName("name")[0].getAttribute("value"),
    min_play_time: xmlDoc.getElementsByTagName("minplaytime")[0].getAttribute("value"),
    max_play_time: xmlDoc.getElementsByTagName("maxplaytime")[0].getAttribute("value"),
    min_players: xmlDoc.getElementsByTagName("minplayers")[0].getAttribute("value"),
    max_players: xmlDoc.getElementsByTagName("maxplayers")[0].getAttribute("value"),
    description: xmlDoc.getElementsByTagName("description")[0].innerHTML,
    image: xmlDoc.getElementsByTagName("image")[0].innerHTML
  };

  $.ajaxSetup({
    headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
  });
  
  $.ajax({
    url: '/games',
    type: 'POST',
    dataType: 'json',
    data: game,
    success: function (response) {
      console.log(response);
    }
  });
}