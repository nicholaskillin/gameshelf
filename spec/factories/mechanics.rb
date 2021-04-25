FactoryBot.define do
  factory :mechanic do
    name { FFaker::Movie.title }
    bgg_id { FFaker::Guid.unique.guid }
  end
end
