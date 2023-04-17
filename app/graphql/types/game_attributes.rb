# frozen_string_literal: true

class Types::GameAttributes < Types::BaseInputObject
  description 'Attributes for creating a game'
  argument :bgg_number, Integer, required: true
  argument :description, String, required: true
  argument :image, String, required: true
  argument :max_play_time, Integer, required: true
  argument :max_players, Integer, required: true
  argument :min_age, Integer, required: true
  argument :min_play_time, Integer, required: true
  argument :min_players, Integer, required: true
  argument :title, String, required: true
  argument :year_published, Integer, required: true
end
