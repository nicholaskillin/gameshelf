require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get name:string" do
    get users_name:string_url
    assert_response :success
  end

  test "should get email:string" do
    get users_email:string_url
    assert_response :success
  end

  test "should get password:string" do
    get users_password:string_url
    assert_response :success
  end

end
