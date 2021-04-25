require 'rails_helper'

describe Types::GameType, type: :request do
  let(:user) { create(:user) }

  before do
    login(user)
    create_list(:game, 5, user_id: user.id)
  end

  context 'when requesting all games' do
    let(:query) do
      <<~GQL
        {
          games {
            id
          }
        }
      GQL
    end

    it 'returns all games' do
      post '/graphql', params: { query: query }
      json = JSON.parse(response.body)
      expect(json['data']['games'].length).to eq 5
    end
  end

  context 'when requesting a single game' do
    let(:game) { Game.first }
    let!(:category) { create(:category, games: [game]) }
    let!(:mechanic) { game.mechanics.create(bgg_id: 2, name: 'Set Collection') }
    let(:query) do
      <<~GQL
        {
          game(id: #{game.id}) {
            id
            title
            categories {
              id
              name
            }
            mechanics {
              id
              name
            }
          }
        }
      GQL
    end

    before do
      post '/graphql', params: { query: query }
      @json = JSON.parse(response.body)
    end

    it 'queries by game id' do
      expect(@json['data']['game']['id']).to eq game.id.to_s
      expect(@json['data']['game']['title']).to eq game.title.to_s
    end

    fit 'can include categories' do
      category_data = @json['data']['game']['categories'].first
      expect(category_data['id']).to eq category.id.to_s
      expect(category_data['name']).to eq category.name.to_s
    end

    it 'can include mechanics' do
      mechanic_data = @json['data']['game']['mechanics'].first
      expect(mechanic_data['id']).to eq mechanic.id.to_s
      expect(mechanic_data['name']).to eq mechanic.name.to_s
    end
  end
end
