import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  ColumnView,
  Divider,
  Heading,
  Modal,
  StackView,
  Text,
  ThemeProvider,
} from '@planning-center/ui-kit'
import { gql } from '@apollo/client'
import useGraphql from '../../hooks/useGraphql'

const GameDetailsModal = ({ gameId, onRequestClose, open }) => {
  const { client } = useGraphql()
  const [game, setGame] = useState({})

  useEffect(() => {
    if (open) {
      client
        .query({
          query: gql`
        query {
          game(id: ${gameId}) {
            categories {
              id
              name
            }
            image
            mechanics {
              id
              name
            }
            playerRange
            playTimeRange
            title
            yearPublished
          }
        }
      `,
        })
        .then((result) => setGame(result.data.game))
    }
  }, [open])

  return (
    <ThemeProvider>
      <Modal
        id="gameData"
        closeOnOutsideClick
        onRequestClose={onRequestClose}
        open={open}
      >
        <Card spacing={<Divider />}>
          <Card.Section>
            <StackView axis="horizontal" distribution="space-between">
              <Heading level={2}>{game.title}</Heading>
              <Button onClick={onRequestClose} title="x" />
            </StackView>
          </Card.Section>
          <Card.Section>
            <StackView axis="horizontal">
              <img
                alt="Game box artwork"
                style={{ width: '50%', height: 'intrinsic' }}
                src={game.image}
              />
              <StackView flex={1} paddingLeft={2}>
                <Text>
                  <strong>Players:</strong>
                  {game.playerRange}
                </Text>
                <Text>
                  <strong>Play Time:</strong>
                  {game.playTimeRange}
                </Text>
                <Text>
                  <strong>Published:</strong>
                  {game.yearPublished}
                </Text>
              </StackView>
            </StackView>
            <ColumnView padding={1}>
              <ColumnView.Column>
                <Heading level={3}>Categories</Heading>
                <ul>
                  {game.categories &&
                    game.categories.map((category) => (
                      <li key={`category-${category.id}`}>{category.name}</li>
                    ))}
                </ul>
              </ColumnView.Column>
              <ColumnView.Column>
                <Heading level={3}>Mechanics</Heading>
                <ul>
                  {game.mechanics &&
                    game.mechanics.map((mechanic) => (
                      <li key={`mechanic-${mechanic.id}`}>{mechanic.name}</li>
                    ))}
                </ul>
              </ColumnView.Column>
            </ColumnView>
          </Card.Section>
        </Card>
      </Modal>
    </ThemeProvider>
  )
}

export default GameDetailsModal
