module Types
  class GameType < Types::BaseObject
    field :id, ID, null: false
    field :user_id, Integer, null: true
    field :title, String, null: true
    field :min_play_time, Integer, null: true
    field :min_players, Integer, null: true
    field :max_players, Integer, null: true
    field :description, String, null: true
    field :image, String, null: true
    field :rules_url, String, null: true
    field :playthrough_url, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
    field :max_play_time, Integer, null: true
    field :min_age, Integer, null: true
    field :best_number_of_players, Integer, null: true
    field :recommended_min_age, Integer, null: true
    field :bgg_number, Integer, null: true
    field :year_published, Integer, null: true
    field :player_range, String, null: true
    field :play_time_range, String, null: true

    def play_time_range
      return "#{object.min_play_time} min." if one_play_time

      "#{object.min_play_time} - #{object.max_play_time} min."
    end

    def player_range
      "#{object.min_players} - #{object.max_players}"
    end

    private

    def one_play_time
      object.min_play_time == object.max_play_time
    end
  end
end
