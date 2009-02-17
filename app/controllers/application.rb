# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time

  # See ActionController::RequestForgeryProtection for details
  # Uncomment the :secret if you're not using the cookie session store
  protect_from_forgery # :secret => '152a539bc9b2ec0655a6a420f64982e6'
  
  # See ActionController::Base for details 
  # Uncomment this to filter the contents of submitted sensitive data parameters
  # from your application log (in this case, all fields with names like "password"). 
  # filter_parameter_logging :password

  ActiveScaffold.set_defaults do |config|
    config.ignore_columns.add [:created_at, :updated_at]
  end

  def protect_through_http_basic
    authenticate_or_request_with_http_basic do |e_user_name, e_password|
      return e_user_name == "admin" && e_password == "boi21st" 
    end
  end

end
