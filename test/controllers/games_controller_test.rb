require 'test_helper'

class GamesControllerTest < ActionDispatch::IntegrationTest
  
  def setup
    @user = User.new(name: "Example User", email: "user@example.com", username: "exampleuser", password: "password")
  end

  test "should get create" do
    log_in_as(users(:michael))
    get games_create_url
    assert_response :success
  end

end
