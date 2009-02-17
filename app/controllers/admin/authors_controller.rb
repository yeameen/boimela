class Admin::AuthorsController < ApplicationController
  before_filter :protect_through_http_basic
  
  layout 'template'
  active_scaffold :author
end
