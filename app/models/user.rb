# frozen_string_literal: true

class User < ApplicationRecord
  attr_accessor :activation_token, :reset_token, :avatar
  before_save   :downcase_email
  before_create :create_activation_digest
  mount_uploader :avatar, AvatarUploader
  has_secure_password

  # - Relations
  has_many :game_users, dependent: :destroy
  has_many :games, through: :game_users
  has_many :friendships, dependent: :destroy
  has_many :friends, through: :friendships
  has_many :received_friendships, class_name: 'Friendship', foreign_key: 'friend_id'
  has_many :received_friends, through: :received_friendships, source: 'user'

  # - Validations
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i.freeze

  validates :name, presence: true, length: { maximum: 50 }
  validates :email, presence: true, length: { maximum: 255 }, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  validates :username, presence: true, length: { maximum: 25 }, uniqueness: { case_sensitive: false }, format: { with: /\A[a-zA-Z0-9]+\Z/ }
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true

  # - Scopes
  scope :unactivated, -> { where(activated: false) }

  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def activate
    update_columns(activated: true, activated_at: Time.zone.now)
  end

  def active_friends
    friends.select { |friend| friend.friends.include?(self) }
  end

  def authenticated?(attribute, token)
    digest = send("#{attribute}_digest")
    return false if digest.nil?

    BCrypt::Password.new(digest).is_password?(token)
  end

  def create_reset_digest
    self.reset_token = User.new_token
    update_attribute(:reset_digest,  User.digest(reset_token))
    update_attribute(:reset_sent_at, Time.zone.now)
  end

  def pending_friends
    friends.reject { |friend| friend.friends.include?(self) }
  end

  def password_reset_expired?
    reset_sent_at < 2.hours.ago
  end

  def pending_friend_requests
    User.select { |user| user.friends.include?(self) && !friends.include?(user) }
  end

  def send_activation_email
    UserMailer.account_activation(self).deliver_now
  end

  def send_password_reset_email
    UserMailer.password_reset(self).deliver_now
  end

  private

  def create_activation_digest
    self.activation_token  = User.new_token
    self.activation_digest = User.digest(activation_token)
  end

  def downcase_email
    email.downcase!
  end
end
