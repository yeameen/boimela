class Admin::BooksAuthorsController < ApplicationController
  layout 'template'
  active_scaffold :books_author
end
