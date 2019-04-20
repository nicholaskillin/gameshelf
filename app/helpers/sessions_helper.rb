module SessionsHelper

  # Logs in a user
  def log_in(user)
    session[:user_id] = user.id
  end

  # Redirects to stored location (or to the defaults)
  def redirect_back_or(default)
    redirect_to(session[:forwarding_url] || default)
    session.delete(:forwarding_url)
  end

end
