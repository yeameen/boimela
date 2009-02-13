class BooksController < ApplicationController
  require 'csv'

  def index
    unless params[:query].nil?
      @search_result = true
      @books = Book.paginate_search(params[:query], :page => params[:page], :per_page => 10) #, :lazy_load => [:title, :author_names, :publisher_name])
    else
      @search_result = false
      @books = Book.paginate(:page => params[:page],  :per_page => 10, :order => "published_date DESC")
    end
  end

  def add
  end

  def create
    data = params[:data]
    document = CSV::Reader.parse(data)
    document.each  do |row|
      Book.add_row(row)
    end
    redirect_to :action => "index"
  end

end
