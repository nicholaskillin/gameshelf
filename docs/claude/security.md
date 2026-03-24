# Security & Authentication

## Auth Flow

- Session-based: `session[:user_id]` set on login
- `before_action :require_login` in `ApplicationController` (global)
- Skip with `skip_before_action :require_login, only: [...]` per controller
- `correct_user` guard enforces username ownership on edit/update

## Account Activation

1. User registers → account created as inactive
2. `UserMailer#account_activation` sends token email
3. `GET /account_activations/:token?email=...` validates and activates
4. Login blocked until activated

## Password Reset

1. User submits email → reset token generated + emailed
2. Token expires after **2 hours** (`password_reset_expired?`)
3. `PATCH /password_resets/:token` validates token before updating password

## Rate Limiting (Rack Attack)

| Rule | Limit |
|------|-------|
| General requests | 300 / 5 min per IP |
| Login attempts | 5 / 20 sec per IP; 5 / 20 sec per email |
| Password resets | 5 / 20 sec per IP; 5 / 20 sec per email |
| `/assets/*` | Excluded |

## Other

- `invisible_captcha` on signup and password reset forms
- Standard Rails CSRF protection (disabled only on `Api::V1::FriendshipsController`)
- `has_secure_password` (bcrypt) for password storage
- Sentry error tracking in production (`config/initializers/sentry.rb`)
