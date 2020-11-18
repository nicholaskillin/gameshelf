Bugsnag.configure do |config|
  config.api_key = "bccd5407376c4498322c9d681ed170e8"
  config.notify_release_stages = ['production']
end

at_exit do
  if $!
    Bugsnag.notify($!)
  end
end
