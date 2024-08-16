ActiveSupport::Notifications.subscribe(
  "invisible_captcha.spam_detected"
) do |*args, data|
  Sentry::Metrics.increment("spam detected", data[:url], tags: { **data.to_h })
end
