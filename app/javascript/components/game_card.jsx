import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export default class GameCard extends React.Component {
  state = {
    title: "no title",
  }

  render() {
    return (
      <div class="col-sm-3">
        <div class="card game-entry">
          <img class="card-img-top" src="https://cf.geekdo-images.com/original/img/wWTlEaPbVoUybefxFpFVTv1OU74=/0x0/pic2247647.jpg" alt="Game Artwork"></img>
          <div class="card-body">
            <h5 class="card-title">Title</h5>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Players: 1 - 2</li>
              <li class="list-group-item">Play Time: 5 - 10 min</li>
            </ul>
            <p class="card-text">Description</p>
            <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#gameDetailsModal" id="<%= game.id %>">Details</a>
          </div>
        </div>
      </div>
    )
  }
}
