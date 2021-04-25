module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :games, [Types::GameType], null: false,
                                     description: "A list of all games"
    def games
      Game.all
    end

    # First describe the field signature:
    field :game, Types::GameType, null: true do
      description "Find a game by ID"
      argument :id, ID, required: true
    end

    def game(id:)
      Game.find(id)
    end
  end
end
