FactoryBot.define do
  factory :category do
    name { FFaker::Movie.title }
    bgg_id { FFaker::Guid.unique.guid }
  end
end
