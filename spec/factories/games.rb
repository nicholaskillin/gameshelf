FactoryBot.define do
  factory :game do
    title { FFaker::Movie.title }
    user_id { create(:user).id }
  end
end
