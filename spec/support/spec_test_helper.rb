module SpecTestHelper
  # def login(user)
  #   user = User.find(user.id)
  #   @request ||= ActionDispatch::TestRequest.create
  #   @request.session[:user_id] = user.id
  # end
  #
  def login(user)
    post '/login', params: { session: { email: user.email, password: user.password } }
  end
end

# spec/spec_helper.rb
RSpec.configure do |config|
  config.include SpecTestHelper, type: :controller
  config.include SpecTestHelper, type: :request
end
