require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }

  describe '.activate' do
    let(:user_not_activated) { create(:not_activated_user) }
    it "activates the user" do
      expect(user_not_activated.activated).to eq(false)
      expect(user_not_activated.activated_at).to eq(nil)

      user_not_activated.activate

      expect(user_not_activated.activated).to eq(true)
      expect(user_not_activated.activated_at).to_not eq(nil)
    end
  end

  describe '.active_friends' do
    let(:friend1) { create(:user) }
    let(:friend2) { create(:user) }
    let(:requested_friend) { create(:user) }

    before do
      user.friends << friend1
      user.friends << friend2
      user.friends << requested_friend
      friend1.friends << user
      friend2.friends << user
    end

    it 'finds people that the user is friends with' do
      expect(user.active_friends).to match_array([friend1, friend2])
    end
  end

  describe '.pending_friends' do
    let(:friend1) { create(:user) }
    let(:friend2) { create(:user) }
    let(:requested_friend) { create(:user) }

    before do
      user.friends << friend1
      user.friends << friend2
      user.friends << requested_friend
      friend1.friends << user
      friend2.friends << user
    end

    it 'finds people that the user is friends with' do
      expect(user.pending_friends).to eq([requested_friend])
    end
  end

  describe '.send_activation_email' do
    it 'sends an activation email' do
      expect { user.send_activation_email }.to change {ActionMailer::Base.deliveries.count}.by 1
    end
  end

  describe 'scopes' do
    describe '.unactivated' do
      subject { User.unactivated }
      
      let!(:inactive_user) { create(:not_activated_user) }
      let!(:active_user) { create(:user) }

      it { is_expected.to match_array [inactive_user] }
    end
  end
end
