$(document).ready(() => {
  $('#userSearch').click(() => {
    const userSearch = $('#userSearchTerm').val();

    var url = new URL('http://game-shelf.nicholaskillin.com/api/v1/users');
    if (process.env.NODE_ENV == 'development') {
      url = new URL('http://localhost:3000/api/v1/users');
    }
    // var usernameFromURL = location.pathname.replace('/users/', '').replace('/games', '');
    var params = {email:userSearch};
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        updateResults(data.users);
      });
    const updateResults = (data) => {
      console.log(data);
    }
  });
});
