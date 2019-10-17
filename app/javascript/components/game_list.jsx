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
    fetch('/api/v1/games')
      .then(response => response.json())
      .then(data => this.setState({ games: data, loading: false }));
  }

  render () {

    const {loading, games} = this.state


    if (loading) {
      return <p>Loading ...</p>;
    }

    return (

      <div id="games" className="row">
        {games.games.map(game => <GameCard key={game.id} {...game} />)}
      </div>
    )
  }
};

class GameCard extends React.Component {
  
  state = {
    title: this.props.title,
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
            <a data-confirm="Are you sure you want to delete this?" className="btn btn-danger game-delete" rel="nofollow" data-method="delete" href={`/games?id=${game.id}`}><div class="material-icons delete-icon">Delete</div></a>
          </div>
        </div>
      </div>
    )
  }
}
