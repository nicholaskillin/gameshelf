'use strict';

$( document ).ready(function() {
  $('#gameDetailsModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var gameID = button.attr('id') // Extract info from data-* attributes
    // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
    // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
    var modal = $(this)

    // Get game data
    $.ajaxSetup({
      headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') }
    });
    
    var response = "";

    $.ajax({
      url: '/games/details',
      type: 'GET',
      dataType: 'json',
      data: { id: gameID },
      success: function (response) {
        let game = response.game
        modal.find('#gameDataTitle').text(game.title)
        // modal.find('#gameDetailsArtwork').attr("src", game.image)
        // cleanDesc = game.description.replace('&#10;', "<br>");
        // modal.find('#gameDetailsDescription').append(cleanDesc)
        
        // // Adds player count to game details modal
        // modal.find('#gameDataPlayerCount').html('<strong>Players:</strong>' + " " + game.min_players)
        // if (game.min_players != game.max_players) {
        //   modal.find('#gameDataPlayerCount').append(" - " + game.max_players)
        // }
        
        // // Adds play time to game details modal
        // modal.find('#gameDataPlayTime').html('<strong>Play Time:</strong>' + " " + game.min_play_time)
        // if (game.min_play_time != game.max_play_time) {
        //   modal.find('#gameDataPlayTime').append(" - " + game.max_play_time)
        // }
        // modal.find('#gameDataPlayTime').append(" min.")
      }
    });
  })
})