class BooksController < ApplicationController
  require 'csv'

  def index
    unless params[:query].nil?
      @is_search = true
      query = params[:query]

      unless params[:date].nil?
        query = query + " AND day_of_month: #{params[:date].to_i}"
      end

      puts "Query: #{query}\n\n"

      @books = Book.paginate_search(query, :page => params[:page], :per_page => 10) #, :lazy_load => [:title, :author_names, :publisher_name])
    else
      @is_search = false
      conditions = !(params[:date].nil?) ? "DAY(published_date) = '#{params[:date].to_i}'" : ""
      @books = Book.paginate(:page => params[:page],  :per_page => 10,
        :order => "published_date DESC",
        :conditions => conditions
      )
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
