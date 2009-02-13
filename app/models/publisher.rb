class Publisher < ActiveRecord::Base
  has_many :books

  def to_label
    return name
  end
end
