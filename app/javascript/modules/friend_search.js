$(document).ready(() => {
  $('#userSearch').click(() => {
    const userSearch = $('#userSearchTerm').val();

    var url = new URL('http://game-shelf.nicholaskillin.com/api/v1/users');
    if (process.env.NODE_ENV == 'development') {
      url = new URL('http://localhost:3000/api/v1/users');
    }
    // var usernameFromURL = location.pathname.replace('/users/', '').replace('/games', '');
    let params = { email: userSearch };
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        updateResults(data.users);
      });

    const updateResults = (data) => {
      let results = '';
      for (let i = 0; i < data.length; i += 1) {
        results += `<button userID=${data[i].id} class="user-search-result btn btn-outline-dark btn-sm">${data[i].name}</button><br>`;
      }
      document.getElementById('searchResults').innerHTML = results;
      userSelected();
    };

    const userSelected = () => {
      $('.user-search-result').click((e) => {
        const selectedUser = e.currentTarget.attributes[0].nodeValue;

        let url = new URL('http://game-shelf.nicholaskillin.com/api.v1/friendships');
        if (process.env.NODE_ENV == 'development') {
          url = new URL('http://localhost:3000/api/v1/friendships');
        }
        let params = { user_id: selectedUser };
        url.search = new URLSearchParams(params).toString();
        fetch(url, { method: 'POST' });
      });
    };
  });
});
