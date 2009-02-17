class Admin::BooksController < ApplicationController
  before_filter :protect_through_http_basic
  
  layout 'template'
  active_scaffold :book
end
