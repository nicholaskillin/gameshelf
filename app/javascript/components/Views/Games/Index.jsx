import React, { useState } from 'react'
import { Button, StackView, Text, ThemeProvider } from '@planning-center/ui-kit'
import GameDetailsModal from 'components/Games/GameDetailsModal'

export default function Index({ currentUser, games: initialGameData, user }) {
  const [games, setGames] = useState(initialGameData)

  const handleSort = () => {
    const sortCriteria = $('#gameSort').val()
    function propComparator(prop) {
      if (prop === 'title') {
        return function (a, b) {
          if (a[prop] > b[prop]) {
            return 1
          }
          if (b[prop] > a[prop]) {
            return -1
          }
          return 0
        }
      } else {
        return function (a, b) {
          return a[prop] - b[prop]
        }
      }
    }
    const gameData = [].concat(games).sort(propComparator(sortCriteria))
    setGames(gameData)
  }

  return (
    <ThemeProvider>
      <div id="games">
        <div className="row" id="filter-bar">
          <div className="col">{games.length} Games</div>
          <div className="col-sm-2">
            <select
              onChange={handleSort}
              id="gameSort"
              className="form-control"
            >
              <option value="title">Title</option>
              <option value="min_play_time">Play Time</option>
            </select>
          </div>
        </div>
        <div className="row">
          {games.map((game) => (
            <GameCard
              currentUser={currentUser}
              key={game.id}
              game={game}
              user={user}
            />
          ))}
        </div>
      </div>
    </ThemeProvider>
  )
}

function GameCard({ currentUser, game, user }) {
  const [modalOpen, setModalOpen] = useState(false)

  function canDelete() {
    return currentUser !== null && currentUser.id === user.id
  }

  return (
    <div className="col-sm-3">
      <div className="card game-entry">
        <img
          className="card-img-top"
          src={game.image}
          alt={`${game.title} Artwork`}
        />
        <div className="card-body">
          <h5 className="card-title">{game.title}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{`Players: ${game.min_players} - ${game.max_players}`}</li>
            <li className="list-group-item">{`Play Time: ${game.min_play_time} - ${game.max_play_time} min`}</li>
          </ul>
          <p className="card-text">{game.description.substring(0, 150)}</p>
          <StackView axis="horizontal" spacing={1}>
            <Button
              title="Details"
              onClick={() => setModalOpen(true)}
              theme="info"
            />
            {canDelete() && (
              <a
                data-confirm="Are you sure you want to delete this?"
                className="btn btn-danger game-delete"
                rel="nofollow"
                data-method="delete"
                href={`/games?id=${game.id}`}
              >
                <Text>Delete</Text>
              </a>
            )}
          </StackView>
        </div>
      </div>
      <GameDetailsModal
        gameId={game.id}
        open={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      />
    </div>
  )
}
