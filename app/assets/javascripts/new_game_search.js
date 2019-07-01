'use strict';

// Gets the Data from BoardGame Geek

function getBggData() {
  // Finds out if we are searching Board Games, Expansions, or both
  if (document.getElementById("searchBoardGames").checked == true && document.getElementById("searchExpansions").checked == true) {
    var type = "boardgame,boardgameexpansion"
  } else if (document.getElementById("searchBoardGames").checked == true) {
    var type = "boardgame"
  } else {
    var type = "boardgameexpansion"
  }

  // Get search term and create the API URL to query
  var searchTerm = document.getElementById("searchTerm").value;
  var uri = encodeURI(searchTerm);
  var httpURL = "https://www.boardgamegeek.com/xmlapi2/search?type=" + type + "&query=" + uri

  //Query the API
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      displayData(this);
    }
  };
  xhttp.open("GET", httpURL, true);
  xhttp.send();
};

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
    "</td></tr>"
  };
  document.getElementById("resultsHeader").innerHTML = "Search Results = " + x + " items.";
  document.getElementById("searchResults").innerHTML = table;
};

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

function getGameData(i) {
  //Query the API
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      addGame(this.responseText);
    }
  };
  xhttp.open("GET", "https://www.boardgamegeek.com/xmlapi2/thing?id=" + i, true);
  xhttp.send();
};

function addGame(game) {
  console.log(game);
}