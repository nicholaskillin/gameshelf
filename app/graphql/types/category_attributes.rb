# frozen_string_literal: true

class Types::CategoryAttributes < Types::BaseInputObject
  description 'Attributes for creating a category'
  argument :bgg_id, Integer, required: true
  argument :name, String, required: true
end
