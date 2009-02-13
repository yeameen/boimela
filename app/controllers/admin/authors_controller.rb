class Admin::AuthorsController < ApplicationController
  layout 'template'
  active_scaffold :author
end
