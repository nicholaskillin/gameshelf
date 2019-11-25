require 'test_helper'

class UserTest < ActiveSupport::TestCase

  def setup
    @user = User.new(name: "Example User", email: "user@example.com", username: "exampleuser", password: "123456")
  end
  
  test "email addresses should be unique" do
    duplicate_user = @user.dup
    duplicate_user.email = @user.email.upcase
    @user.save
    assert_not duplicate_user.valid?
  end

  test "email should always downcase" do
    user = User.new(name: "Example User", email: "ALLCAPS@example.com", username: "exampleuser", password: "123456")
    user.save
    assert_equal user.email, "allcaps@example.com"
  end

  test "email required" do
    user = User.new(name: "Example User", email: "", username: "exampleuser", password: "password")
    user.save
    assert_not user.valid?
  end

  test "username required" do
    user = User.new(name: "Example User", email: "example@user.com", username: "", password: "password")
    user.save
    assert_not user.valid?
  end

  test "name required" do
    user = User.new(name: "", email: "example@user.com", username: "example user", password: "password")
    user.save
    assert_not user.valid?
  end

end
