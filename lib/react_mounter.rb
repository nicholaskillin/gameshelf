# frozen_string_literal: true

class ReactMounter < React::Rails::ComponentMount
  def react_component(name, props = {}, options = {}, &block)
    props.deep_merge!(component: name, providerProps: provider_defaults)

    super('AppProvider', props, options, &block)
  end

  private

  # :reek:UtilityFunction
  def provider_defaults
    {}.deep_transform_keys { |key| key.to_s.camelize(:lower) }
  end
end
