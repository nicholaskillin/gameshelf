Bugsnag.configure do |config|
  config.api_key = ENV['BUGSNAG_API_KEY']
  config.notify_release_stages = ['production']
end

at_exit do
  if $!
    Bugsnag.notify($!)
  end
end
