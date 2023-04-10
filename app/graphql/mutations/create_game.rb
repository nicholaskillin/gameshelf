# frozen_string_literal: true

module Mutations
  class CreateGame < Mutations::BaseMutation
    argument :game_attributes, Types::GameAttributes
    argument :categories, [Types::CategoryAttributes], required: false
    argument :mechanics, [Types::MechanicAttributes], required: false

    field :game, Types::GameType, null: false
    field :errors, [String], null: false

    attr_reader :game

    def resolve(game_attributes:, categories:, mechanics:)
      saved_categories = categories.map do |category|
        Category.find_or_create_by(category.to_h)
      end

      saved_mechanics = mechanics.map do |mechanic|
        Mechanic.find_or_create_by(mechanic.to_h)
      end

      @game = Game.new(game_attributes.to_h)

      game.categories << saved_categories
      game.mechanics << saved_mechanics

      game.save! ? success_return : failure_return
    end

    private

    def success_return
      {
        game: game,
        errors: [],
      }
    end

    def failure_return
      {
        game: nil,
        errors: game.errors.full_messages
      }
    end
  end
end
