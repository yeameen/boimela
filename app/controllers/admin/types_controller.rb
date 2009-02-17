class Admin::TypesController < ApplicationController
  before_filter :protect_through_http_basic
  
  layout 'template'
  active_scaffold :type
end
