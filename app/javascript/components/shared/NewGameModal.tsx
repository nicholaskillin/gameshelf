import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Stack from 'react-bootstrap/Stack'
import Table from 'react-bootstrap/Table'

import { gql, useMutation } from '@apollo/client'

const CREATE_GAME = gql`
  mutation CreateGame(
    $gameAttributes: GameAttributes!
    $categories: [CategoryAttributes!]
    $mechanics: [MechanicAttributes!]
  ) {
    createGame(
      input: {
        gameAttributes: $gameAttributes
        categories: $categories
        mechanics: $mechanics
      }
    ) {
      game {
        title
        categories {
          name
        }
        mechanics {
          name
        }
      }
    }
  }
`

type NewGameModalProps = {
  handleClose: Function
  show: boolean
}

const NewGameModal = ({ handleClose, show }: NewGameModalProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  const handleUpdateSearchTerm = (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  const handleSearch = () => {
    const type = 'boardgame'
    const uri = encodeURI(searchTerm)
    const httpURL = `https://www.boardgamegeek.com/xmlapi2/search?type=${type}&query=${uri}`

    fetch(httpURL)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
      .then((data) => setSearchResults(data))
  }

  const handleHide = () => {
    setSearchTerm('')
    setSearchResults(null)
    if (handleClose) handleClose()
  }

  return (
    <Modal show={show} onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add game</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack gap={2}>
          <Stack direction="horizontal" gap={2}>
            <Form.Control
              autoFocus
              className="me-auto"
              placeholder="Search BGG"
              onChange={({ target }) => handleUpdateSearchTerm(target.value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Stack>
          {searchResults && <SearchResults document={searchResults} />}
        </Stack>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

const SearchResults = ({ document }) => {
  const items = Array.from(document.getElementsByTagName('item'))

  const [createGame, { data, loading, error }] = useMutation(CREATE_GAME)

  const handleGameSelect = (gameId) => {
    fetch(`https://www.boardgamegeek.com/xmlapi2/thing?id=${gameId}`)
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, 'text/xml'))
      .then((data) => addGame(data))
  }

  const addGame = (gameDocument) => {
    const links = Array.from(gameDocument.getElementsByTagName('link'))

    createGame({
      variables: {
        categories: getCategories(links),
        gameAttributes: getGameAttributes(gameDocument),
        mechanics: getMechanics(links),
      },
      onCompleted: () => Turbolinks.visit(),
    })
  }

  const getCategories = (links) => {
    const gameCategories = links
      .filter((link) => link.getAttribute('type') === 'boardgamecategory')
      .map((category) => ({
        name: category.getAttribute('value'),
        bggId: parseInt(category.getAttribute('id')),
      }))

    return gameCategories
  }

  const getGameAttributes = (gameDocument) => {
    const game = gameDocument.getElementsByTagName('item')[0]

    return {
      bggNumber: parseInt(game.getAttribute('id')),
      description: game.getElementsByTagName('description')[0].textContent,
      image: game.getElementsByTagName('image')[0].textContent,
      maxPlayers: parseInt(
        game.getElementsByTagName('maxplayers')[0].getAttribute('value')
      ),
      maxPlayTime: parseInt(
        game.getElementsByTagName('maxplaytime')[0].getAttribute('value')
      ),
      minAge: parseInt(
        game.getElementsByTagName('minage')[0].getAttribute('value')
      ),
      minPlayTime: parseInt(
        game.getElementsByTagName('minplaytime')[0].getAttribute('value')
      ),
      minPlayers: parseInt(
        game.getElementsByTagName('minplayers')[0].getAttribute('value')
      ),
      title: game.getElementsByTagName('name')[0].getAttribute('value'),
      yearPublished: parseInt(
        game.getElementsByTagName('yearpublished')[0].getAttribute('value')
      ),
    }
  }

  const getMechanics = (links) => {
    const gameMechanics = links
      .filter((link) => link.getAttribute('type') === 'boardgamemechanic')
      .map((mechanic) => ({
        name: mechanic.getAttribute('value'),
        bggId: parseInt(mechanic.getAttribute('id')),
      }))

    return gameMechanics
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Game</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          const id = item.getAttribute('id')
          const gameTitle = item.getElementsByTagName('name')[0]
            ? item.getElementsByTagName('name')[0].getAttribute('value')
            : 'No Title'
          const yearPublished = item.getElementsByTagName('yearpublished')[0]
            ? item
                .getElementsByTagName('yearpublished')[0]
                .getAttribute('value')
            : ''

          return (
            <tr key={id} onClick={() => handleGameSelect(id)}>
              <td>
                {id} - {gameTitle}
              </td>
              <td>{yearPublished}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default NewGameModal
