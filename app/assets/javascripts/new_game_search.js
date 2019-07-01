'use strict';

function getBggData() {
  var searchTerm = document.getElementById("searchTerm").value;
  var uri = encodeURI(searchTerm);
  // console.log("Search Term = " + searchTerm);
  var httpURL = "https://www.boardgamegeek.com/xmlapi2/search?type=boardgame,boardgameexpansion&query=" + uri
  // console.log("URL used is = " + httpURL);
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
    table += "<tr><td>" +
    xmlDoc.getElementsByTagName("name")[i].getAttribute("value") +
    "</td><td>" +
    xmlDoc.getElementsByTagName("yearpublished")[i].getAttribute("value") + 
    "</td></tr>"
  };
  document.getElementById("resultsHeader").innerHTML = "Search Results = " + x + " items.";
  document.getElementById("searchResults").innerHTML = table;
};