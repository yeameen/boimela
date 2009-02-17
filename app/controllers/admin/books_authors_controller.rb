class Admin::BooksAuthorsController < ApplicationController
  before_filter :protect_through_http_basic
  
  layout 'template'
  active_scaffold :books_author
end
