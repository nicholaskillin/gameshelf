require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }
  let(:user_not_activated) { create(:not_activated_user) }

  describe '.activate' do
    it "activates the user" do
      expect(user_not_activated.activated).to eq(false)
      expect(user_not_activated.activated_at).to eq(nil)

      user_not_activated.activate

      expect(user_not_activated.activated).to eq(true)
      expect(user_not_activated.activated_at).to_not eq(nil)
    end
  end

end
