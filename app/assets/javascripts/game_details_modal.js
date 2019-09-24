$(document).ready(() => {
//   $('#gameDetailsModal').on('show.bs.modal', function (event) {
//     const button = $(event.relatedTarget); // Button that triggered the modal
//     const gameID = button.attr('id'); // Extract info from data-* attributes
//     const modal = $(this);

//     // Get game data
//     $.ajaxSetup({
//       headers: { 'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') },
//     });

//     $.ajax({
//       url: '/games/details',
//       type: 'GET',
//       dataType: 'json',
//       data: { id: gameID },
//       success(response) {
//         modal.find('#gameDataTitle').text(response.game.title);
//         modal.find('#gameDetailsArtwork').attr('src', response.game.image);
//         const cleanDesc = response.game.description.replace('&#10;', '<br>');
//         modal.find('#gameDetailsDescription').append(cleanDesc);

//         // Adds player count to game details modal
//         modal.find('#gameDataPlayerCount').html(`<strong>Players:</strong> ${response.game.min_players}`);
//         if (response.game.min_players !== response.game.max_players) {
//           modal.find('#gameDataPlayerCount').append(` - ${response.game.max_players}`);
//         }

//         // Adds play time to game details modal
//         modal.find('#gameDataPlayTime').html(`<strong>Play Time:</strong> ${response.game.min_play_time}`);
//         if (response.game.min_play_time !== response.game.max_play_time) {
//           modal.find('#gameDataPlayTime').append(` - ${response.game.max_play_time}`);
//         }
//         modal.find('#gameDataPlayTime').append(' min.');
//       },
//     });
//   });
});
