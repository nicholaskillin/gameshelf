Rails.application.config.to_prepare do
  ActionMailer::MailDeliveryJob.retry_on(
    Net::OpenTimeout,
    Net::ReadTimeout,
    Net::SMTPServerBusy,
    Errno::EHOSTUNREACH,
    Errno::ECONNREFUSED,
    Errno::ECONNRESET,
    Errno::ETIMEDOUT,
    wait: :polynomially_longer,
    attempts: 5
  )
end
