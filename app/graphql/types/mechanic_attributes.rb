# frozen_string_literal: true

class Types::MechanicAttributes < Types::BaseInputObject
  description 'Attributes for creating a mechanic'
  argument :bgg_id, Integer, required: true
  argument :name, String, required: true
end
