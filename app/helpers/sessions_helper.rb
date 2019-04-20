module SessionsHelper

  # Logs in a user
  def log_in(user)
    session[:user_id] = user.id
  end

  # Logs out the current user
  def log_out
    # Add in forget(current_user) once I have remember setup
    session.delete(:user_id)
    @current_user = nil
  end

  #returns the current logged in user (if any).
  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: user_id)
    elsif (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
      if user && user.authenticated?(:remember, cookies[:remember_token])
        log_in user
        @current_user = user
      end
    end
  end

  #returns true if the user is logged in, false otherwise
  def logged_in?
    !current_user.nil?
  end

  # Redirects to stored location (or to the defaults)
  def redirect_back_or(default)
    redirect_to(session[:forwarding_url] || default)
    session.delete(:forwarding_url)
  end

end
