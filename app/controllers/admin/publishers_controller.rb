class Admin::PublishersController < ApplicationController
  before_filter :protect_through_http_basic
  
  layout 'template'
  active_scaffold :publisher
end
