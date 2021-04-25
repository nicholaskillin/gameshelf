import React, { useState } from 'react'
import {
  Box,
  Card,
  Divider,
  Heading,
  Modal,
  Span,
  StackView,
  Text,
  ThemeProvider,
} from '@planning-center/ui-kit'
import { gql } from '@apollo/client'
import useGraphql from '../../hooks/useGraphql'

const GameDetailsModal = ({ gameId, onRequestClose, open }) => {
  const { client } = useGraphql()
  const [game, setGame] = useState({})

  client
    .query({
      query: gql`
        query {
          game(id: ${gameId}) {
            image
            playerRange
            playTimeRange
            title
          }
        }
      `,
    })
    .then((result) => setGame(result.data.game))

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
            <Heading>{game.title}</Heading>
          </Card.Section>
          <Card.Section>
            <StackView axis="horizontal">
              <img
                style={{ width: '50%', height: 'intrinsic' }}
                src={game.image}
              />
              <StackView flex={1} paddingLeft={2}>
                <Text>
                  <strong>Players:</strong> {game.playerRange}
                </Text>
                <Text>
                  <strong>Play Time:</strong> {game.playTimeRange}
                </Text>
              </StackView>
            </StackView>
          </Card.Section>
        </Card>
      </Modal>
    </ThemeProvider>
  )
}

export default GameDetailsModal
