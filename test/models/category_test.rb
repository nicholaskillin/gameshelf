require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
  
  test "can create categories" do
    category = Category.new
    assert category.save
  end

end
