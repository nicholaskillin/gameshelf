FactoryBot.define do
  factory :user do
    name { FFaker::Name.name }
    email { FFaker::Internet.email }
    password { FFaker::Internet.password[0..24] }
    username { FFaker::Internet.user_name.gsub(/[._]/, '') }
    activated { true }
    activated_at { Time.current - 2.days }

    factory :not_activated_user do
      activated { false }
      activated_at { nil }
    end
  end
end
