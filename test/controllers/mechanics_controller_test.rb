require 'test_helper'

class MechanicsControllerTest < ActionDispatch::IntegrationTest
  test "should get create" do
    get mechanics_create_url
    assert_response :success
  end

end
