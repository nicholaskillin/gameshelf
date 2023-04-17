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
      build_game(game_attributes, categories, mechanics)

      game.save!

      add_game_to_user_collection

      user.games.include?(game) ? success_return : failure_return
    end

    private

    def add_game_to_user_collection
      user.games << game unless user.games.include?(game)
    end

    def build_game(game_attributes, categories, mechanics)
      @game = Game.find_or_initialize_by(game_attributes.to_h)

      game.categories << saved_categories(categories)
      game.mechanics << saved_mechanics(mechanics)
    end

    def failure_return
      {
        game: nil,
        errors: game.errors.full_messages,
      }
    end

    def saved_categories(categories)
      categories.map do |category|
        Category.find_or_create_by(category.to_h)
      end
    end

    def saved_mechanics(mechanics)
      mechanics.map do |mechanic|
        Mechanic.find_or_create_by(mechanic.to_h)
      end
    end

    def success_return
      {
        game: game,
        errors: [],
      }
    end

    def user
      @user ||= Current.user
    end
  end
end
