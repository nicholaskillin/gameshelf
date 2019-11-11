import React from 'react'

export default class GameList extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      games: [],
    }
  }

  componentDidMount() {
    var url = new URL('http://game-shelf.nicholaskillin.com/api/v1/games');
    if (process.env.NODE_ENV == 'development') {
      url = new URL('http://localhost:3000/api/v1/games');
    }
    var usernameFromURL = location.pathname.replace('/users/', '').replace('/games', '');
    var params = {username:usernameFromURL, sort:'title'};
    url.search = new URLSearchParams(params).toString();
    fetch(url)
      .then(response => response.json())
      .then(data => this.setState({ games: data, loading: false }));
  }

  render () {

    const {loading, games} = this.state

    const getData = () => {
      let sortValue = $('#gameSort').val();
      var url = new URL('http://game-shelf.nicholaskillin.com/api/v1/games');
      if (process.env.NODE_ENV == 'development') {
        url = new URL('http://localhost:3000/api/v1/games');
      }
      var usernameFromURL = location.pathname.replace('/users/', '').replace('/games', '');
      var params = {username:usernameFromURL, sort:sortValue};
      url.search = new URLSearchParams(params).toString();
      fetch(url)
        .then(response => response.json())
        .then(data => this.setState({ games: data }));
    }

    if (loading) {
      return <p>Loading ...</p>;
    }

    return (

      <div id="games">
        <div className="row" id={'filter-bar'}>
          <div className="col">
            {games.games.length} Games
          </div>
          <div className="col-sm-2">
            <select onChange={getData} id={'gameSort'} className={'form-control'}>
              <option value={'title'}>Title</option>
              <option value={'min_play_time'}>Play Time</option>
            </select>
          </div>
        </div>
        <div className="row">
          {games.games.map(game => <GameCard key={game.id} {...game} />)}
        </div>
      </div>
    )
  }
};

class GameCard extends React.Component {
  
  state = {
    loaded: true,
  }

  render() {
    const game = this.props

    return (
      <div className="col-sm-3">
        <div className="card game-entry">
          <img className="card-img-top" src={game.image} alt={`${game.title} Artwork`}></img>
          <div className="card-body">
            <h5 className="card-title">{game.title}</h5>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{`Players: ${game.min_players} - ${game.max_players}`}</li>
              <li className="list-group-item">{`Play Time: ${game.min_play_time} - ${game.max_play_time} min`}</li>
            </ul>
            <p className="card-text">{game.description.substring(0, 150)}</p>
            <a href="#" className="btn btn-primary" data-toggle="modal" data-target="#gameDetailsModal" id={`${game.id}`}>Details</a>
            <a data-confirm="Are you sure you want to delete this?" className="btn btn-danger game-delete" rel="nofollow" data-method="delete" href={`/games?id=${game.id}`}><div className="material-icons delete-icon">Delete</div></a>
          </div>
        </div>
      </div>
    )
  }
}
