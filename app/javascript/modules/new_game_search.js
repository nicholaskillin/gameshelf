// JS for modal behavior
$(document).ready(() => {
  // Set focus in modal
  $('#newGame').on('shown.bs.modal', () => {
    $('#searchTerm').focus();
  });

  // Prevent modal from closing on submission
  $('#newGame').submit((e) => {
    e.preventDefault();
  });

  // Clear text input when modal is dismissed
  $('#newGame').on('hidden.bs.modal', () => {
    $('input:text').val('');
  });

  // Gets the Data from BoardGame Geek

  $('#bggSearch').click(() => {
    let type = '';

    // Finds out if we are searching Board Games, Expansions, or both
    if (document.getElementById('searchBoardGames').checked === true && document.getElementById('searchExpansions').checked === true) {
      type = 'boardgame,boardgameexpansion';
    } else if (document.getElementById('searchBoardGames').checked === true) {
      type = 'boardgame';
    } else {
      type = 'boardgameexpansion';
    }

    // Get search term and create the API URL to query
    const searchTerm = $('#searchTerm').val();
    const uri = encodeURI(searchTerm);
    const httpURL = `https://www.boardgamegeek.com/xmlapi2/search?type=${type}&query=${uri}`;

    // Query the API
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        displayData(this);
      }
    };
    xhttp.open('GET', httpURL, true);
    xhttp.send();
  });

  // Displays the data after the API query comes back
  function displayData(xml) {
    const searchResults = xml.responseText;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(searchResults, 'text/xml');

    let table = '<tr><th>Game</th><th>Year Released</th></tr>';
    const x = xmlDoc.getElementsByTagName('item').length;
    for (let i = 0; i < x; i += 1) {
      const gameTitle = (xmlDoc.getElementsByTagName('name')[i]) ? xmlDoc.getElementsByTagName('name')[i].getAttribute('value') : 'No Title';
      const gameYearPublished = (xmlDoc.getElementsByTagName('yearpublished')[i]) ? xmlDoc.getElementsByTagName('yearpublished')[i].getAttribute('value') : '';

      table += `<tr gameID="${xmlDoc.getElementsByTagName('item')[i].getAttribute('id')}"><td>${gameTitle}</td><td>${gameYearPublished}</td></tr>`;
    }
    document.getElementById('resultsHeader').innerHTML = `Search Results = ${x} items.`;
    document.getElementById('searchResults').innerHTML = table;
    gameSelected();
  }

  // Makes sure that Board Games or Expansions are always selected in the search params
  function updateGames() {
    if ($('#searchBoardGames').prop('checked') === false && $('#searchExpansions').prop('checked') === false) {
      $('#searchExpansions').prop('checked', true);
    }
  }

  function updateExpansions() {
    if ($('#searchBoardGames').prop('checked') === false && $('#searchExpansions').prop('checked') === false) {
      $('#searchBoardGames').prop('checked', true);
    }
  }

  // test Function scope
  function gameSelected() {
    $('tr').slice(1).click((e) => {
      const selectedGame = e.currentTarget.attributes[0].value;
      // Close the new game modal
      $('#newGame').modal('hide');

      // Query the API
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          addGame(this.responseText);
        }
      };
      xhttp.open('GET', `https://www.boardgamegeek.com/xmlapi2/thing?id=${selectedGame}`, true);
      xhttp.send();
    });

    // Once we have that game data we will use it to create a game in our app
    function addGame(gameData) {
    // Declaring some variables that we will need in the process
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(gameData, 'text/xml');
    const mechanicBggIds = [];
    const categoryBggIds = [];

    createCategories();

    function createCategories() {
      const gameCategories = [];

      // for each category in the JSON push into categoryData
      const x = xmlDoc.getElementsByTagName('link').length;
      for (let i = 0; i < x; i += 1) {
        const type = xmlDoc.getElementsByTagName('link')[i].getAttribute('type');
        if (type === 'boardgamecategory') {
          const categoryData = {
            name: xmlDoc.getElementsByTagName('link')[i].getAttribute('value'),
            bgg_id: xmlDoc.getElementsByTagName('link')[i].getAttribute('id'),
          };
          gameCategories.push(categoryData);
        }
      }

      // Sending categoryData array to controller for creation if needed

      $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
      });

      $.ajax({
        url: '/categories',
        type: 'POST',
        dataType: 'json',
        data: { categories: gameCategories },
        success(response) {
          createMechanics();
        },
      });

      // Collect BGG ID's for each category to send to game controller later
      for (let i = 0; i < gameCategories.length; i += 1) {
        categoryBggIds.push(gameCategories[i].bgg_id);
      }
    }

    function createMechanics() {
      const gameMechanics = [];

      // for each mechanic in the JSON push into mechanicData
      for (let i = 0; i < xmlDoc.getElementsByTagName('link').length; i += 1) {
        if (xmlDoc.getElementsByTagName('link')[i].getAttribute('type') === 'boardgamemechanic') {
          const mechanicData = {
            name: xmlDoc.getElementsByTagName('link')[i].getAttribute('value'),
            bgg_id: xmlDoc.getElementsByTagName('link')[i].getAttribute('id'),
          };
          gameMechanics.push(mechanicData);
        }
      }

      // Sending mechanicData array to controller for creation if needed
      $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
      });

      $.ajax({
        url: '/mechanics',
        type: 'POST',
        dataType: 'json',
        data: { mechanics: gameMechanics },
        success(response) {
          createGame();
        },
      });

      // Collect BGG ID's for each mechanic to send to game controller later
      for (let i = 0; i < gameMechanics.length; i += 1) {
        mechanicBggIds.push(gameMechanics[i].bgg_id);
      }
    }

    function createGame() {
      // Create game variable and submit to controller
      const game = {
        title: xmlDoc.getElementsByTagName('name')[0].getAttribute('value'),
        min_play_time: xmlDoc.getElementsByTagName('minplaytime')[0].getAttribute('value'),
        max_play_time: xmlDoc.getElementsByTagName('maxplaytime')[0].getAttribute('value'),
        min_players: xmlDoc.getElementsByTagName('minplayers')[0].getAttribute('value'),
        max_players: xmlDoc.getElementsByTagName('maxplayers')[0].getAttribute('value'),
        description: xmlDoc.getElementsByTagName('description')[0].innerHTML,
        image: xmlDoc.getElementsByTagName('image')[0].innerHTML,
        categories: categoryBggIds,
        mechanics: mechanicBggIds,
      };

      $.ajaxSetup({
        headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
      });

      $.ajax({
        url: '/games',
        type: 'POST',
        dataType: 'json',
        data: game,
        success(response) {
          location.reload();
        },
      });
    }
    }
  }
});
