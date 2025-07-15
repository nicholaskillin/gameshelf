module StimulusHelper
  def react_component(component_name, props = {}, html_options = {})
    # Mimic the old ReactMounter behavior
    enhanced_props = props.deep_merge(
      component: component_name,
      providerProps: provider_defaults
    )
    
    html_options[:data] ||= {}
    html_options[:data][:controller] = "react-component"
    html_options[:data][:react_component_component_value] = "AppProvider"
    html_options[:data][:react_component_props_value] = enhanced_props.to_json
    
    content_tag(:div, "", html_options)
  end

  private

  def provider_defaults
    { domain: ENV['DOMAIN'] }.deep_transform_keys { |key| key.to_s.camelize(:lower) }
  end
end