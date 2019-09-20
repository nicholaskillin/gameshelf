'use strict';

// JS for modal behavior
$( document ).ready(function() {
  // Set focus in modal
  $('#newGame').on('shown.bs.modal', function() {
    $('#searchTerm').focus();
  })

  // Prevent modal from closing on submission
  $('#newGame').submit(function(e) { 
    e.preventDefault();
  });

  // Clear text input when modal is dismissed
  $('#newGame').on('hidden.bs.modal', function() {
    $('input:text').val('');
  })

});

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
  var searchTerm = $("#searchTerm").val();
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

// Displays the data after the API query comes back
function displayData(xml) {
  var i;
  var searchResults = xml.responseText;

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(searchResults,"text/xml");

  var table = "<tr><th>Game</th><th>Year Released</th></tr>";
  var x = xmlDoc.getElementsByTagName("item").length;
  for (i = 0; i < x ; i++) { 
    var gameTitle = (xmlDoc.getElementsByTagName("name")[i]) ? xmlDoc.getElementsByTagName("name")[i].getAttribute("value") : "No Title";
    var gameYearPublished = (xmlDoc.getElementsByTagName("yearpublished")[i]) ? xmlDoc.getElementsByTagName("yearpublished")[i].getAttribute("value") : "";

    table += "<tr onclick=\"getGameData(" + xmlDoc.getElementsByTagName("item")[i].getAttribute("id") + ")\"><td>" +
    gameTitle + "</td><td>" + gameYearPublished + "</td></tr>";
  }
  document.getElementById("resultsHeader").innerHTML = "Search Results = " + x + " items.";
  document.getElementById("searchResults").innerHTML = table;
}

// Makes sure that Board Games or Expansions are always selected in the search params
function updateGames() {
  if ($("#searchBoardGames").prop('checked') == false && $("#searchExpansions").prop('checked') == false) {
    $("#searchExpansions").prop('checked', true);
  }
}

function updateExpansions() {
  if ($("#searchBoardGames").prop('checked') == false && $("#searchExpansions").prop('checked') == false) {
    $("#searchBoardGames").prop('checked', true);
  }
}

// Once a user selects a game from the search results this funciton gets more detailed data about that specific game from BGG
function getGameData(selectedGame) {
  // Close the new game modal
  $('#newGame').modal('hide');

  // Query the API
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      addGame(this.responseText);
    }
  };
  xhttp.open("GET", "https://www.boardgamegeek.com/xmlapi2/thing?id=" + selectedGame, true);
  xhttp.send();
}

// Once we have that game data we will use it to create a game in our app
function addGame(gameData) {
  // Declaring some variables that we will need in the process
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(gameData,"text/xml");
  var mechanic_bgg_ids = [];
  var category_bgg_ids = []

  createCategories();

  function createCategories() {

    var gameCategories = [];

    // for each category in the JSON push into categoryData  
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

    // Sending categoryData array to controller for creation if needed

    $.ajaxSetup({
      headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
    });
      
    $.ajax({
      url: '/categories',
      type: 'POST',
      dataType: 'json',
      data: { categories: gameCategories },
      success: function (response) {
        createMechanics();
      }
    });

    // Collect BGG ID's for each category to send to game controller later
    for (i = 0; i < gameCategories.length; i++) {
      category_bgg_ids.push(gameCategories[i].bgg_id)
    }
  }

  function createMechanics() {

    var gameMechanics = [];

    // for each mechanic in the JSON push into mechanicData  
    var i = 0
    for (i = 0; i < xmlDoc.getElementsByTagName("link").length; i++){
      if (xmlDoc.getElementsByTagName("link")[i].getAttribute("type") == "boardgamemechanic"){
        var mechanicData = {
          name: xmlDoc.getElementsByTagName("link")[i].getAttribute("value"),
          bgg_id: xmlDoc.getElementsByTagName("link")[i].getAttribute("id")
        }
        gameMechanics.push(mechanicData);
      }
    }

    // Sending mechanicData array to controller for creation if needed
    $.ajaxSetup({
      headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
    });
    
    $.ajax({
      url: '/mechanics',
      type: 'POST',
      dataType: 'json',
      data: { mechanics: gameMechanics },
      success: function (response) {
        createGame();
      }
    });

    // Collect BGG ID's for each mechanic to send to game controller later
    for (i = 0; i < gameMechanics.length; i++) {
      mechanic_bgg_ids.push(gameMechanics[i].bgg_id)
    }

  }
  
  function createGame(){
    // Create game variable and submit to controller
    var game = {
      title: xmlDoc.getElementsByTagName("name")[0].getAttribute("value"),
      min_play_time: xmlDoc.getElementsByTagName("minplaytime")[0].getAttribute("value"),
      max_play_time: xmlDoc.getElementsByTagName("maxplaytime")[0].getAttribute("value"),
      min_players: xmlDoc.getElementsByTagName("minplayers")[0].getAttribute("value"),
      max_players: xmlDoc.getElementsByTagName("maxplayers")[0].getAttribute("value"),
      description: xmlDoc.getElementsByTagName("description")[0].innerHTML,
      image: xmlDoc.getElementsByTagName("image")[0].innerHTML,
      categories: category_bgg_ids,
      mechanics: mechanic_bgg_ids
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
        location.reload();
      }
    });

  }

}