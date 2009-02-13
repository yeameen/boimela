class Admin::BooksController < ApplicationController
  layout 'template'
  active_scaffold :book
end
