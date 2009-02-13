class Author < ActiveRecord::Base
  has_many :books, :through => :books_authors, :source => :book
  has_many :books_authors

  def to_label
    return name
  end
end
