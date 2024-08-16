ActiveSupport::Notifications.subscribe(
  "invisible_captcha.spam_detected"
) do |*args, data|
  Sentry::Metrics.increment("spam detected", 1, tags: { **data.to_h })
end
