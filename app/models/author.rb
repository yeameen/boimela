class Author < ActiveRecord::Base
  has_many :books_authors
  has_many :books, :through => :books_authors, :source => :book

  def to_label
    return name
  end
end
