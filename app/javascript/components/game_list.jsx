import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const testData = [
  {
    game_id: "108",
    user_id: "nil",
    title: "Reykholt",
    min_play_time: "30",
    min_players: "1",
    max_players: "4",
    description: "Growing tomatoes, lettuce, or carrots on Iceland? ...", 
    image: "https://cf.geekdo-images.com/original/img/9RqZ2VX023EiTB6r7-n4_xS4lnM=/0x0/pic3877054.jpg",
    rules_url: "nil",
    playthrough_url: "nil",
    created_at: "2019-10-01 14:46:09",
    updated_at: "2019-10-01 14:46:09",
    max_play_time: "60",
    min_age: "nil",
    best_number_of_players: "nil",
    recommended_min_age: "nil",
    bgg_number: "nil",
    year_published: "nil"
  },
  {
    game_id: "52",
    user_id: "1",
    title: "Friday",
    min_play_time: "25",
    min_players: "1",
    max_players: "1",
    description: "Friday, the second game in the Friedemann Friese F...", 
    image: "https://cf.geekdo-images.com/original/img/gWs9YutHCqaCZgPtfykYN0wkvEs=/0x0/pic1513328.jpg",
    rules_url: "nil",
    playthrough_url: "nil",
    created_at: "2019-07-25 13:20:43",
    updated_at: "2019-09-29 18:16:29",
    max_play_time: "25",
    min_age: "nil",
    best_number_of_players: "nil",
    recommended_min_age: "nil",
    bgg_number: "nil",
    year_published: "2019"
  },
];

const GameList = (props) => (
  <div id="games" className="row">
    {testData.map(game => <GameCard {...game}/>)}
  </div>
);

export default GameList

class GameCard extends React.Component {
  
  state = {
    title: "",
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
            <p className="card-text">{game.description}</p>
            <a href="#" className="btn btn-primary" data-toggle="modal" data-target="#gameDetailsModal" id={`${game.game_id}`}>Details</a>
          </div>
        </div>
      </div>
    )
  }
}
