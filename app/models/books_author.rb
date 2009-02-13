class BooksAuthor < ActiveRecord::Base
  belongs_to :author
  belongs_to :book

  def to_label
    return ""
  end
end
