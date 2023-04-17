# frozen_string_literal: true

require "./lib/react_mounter"

Rails.application.config.react.view_helper_implementation = ::ReactMounter
