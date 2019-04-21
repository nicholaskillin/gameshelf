require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(name: "Example User", email: "user@example.com", password: "123456")
  end
  
  test "email addresses should be unique" do
    duplicate_user = @user.dup
    duplicate_user.email = @user.email.upcase
    @user.save
    assert_not duplicate_user.valid?
  end

  test "email should always downcase" do
    user = User.new(name: "Example User", email: "ALLCAPS@example.com", password: "123456")
    user.save
    assert_equal user.email, "allcaps@example.com"
  end

end
