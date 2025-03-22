require 'rails_helper'

RSpec.describe DeleteUnactivatedUsersJob do
  subject { described_class.new.perform }
  let!(:inactivated_user_created_long_ago) { create(:not_activated_user, created_at: 1.month.ago)}
  let!(:inactivated_user_created_recently) { create(:not_activated_user)}
  let!(:activated_user) { create(:user, activated: true, created_at: 2.months.ago)}

  it 'deletes only users that are not activated and created over 1 month ago' do
    expect { subject }.to change(User, :count).by(-1)
    expect { inactivated_user_created_long_ago.reload }.to raise_error(ActiveRecord::RecordNotFound)
    expect(inactivated_user_created_recently).to be_present
    expect(activated_user).to be_present
  end
end
