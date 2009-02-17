class BooksController < ApplicationController
  require 'csv'
  layout 'listing'

  before_filter :protect_through_http_basic, :only => [:add, :create]

  PER_PAGE_LIMIT = 5

  def index
    unless params[:query].nil? || params[:query].empty?
      @is_search = true
      query = params[:query]

      unless params[:date].nil?
        query = query + " AND day_of_month: #{params[:date].to_i}"
      end

      puts "Query: #{query}\n\n"

      @books = Book.paginate_search(query, :page => params[:page], :per_page => PER_PAGE_LIMIT, :lazy_load => [:title, :author_names, :publisher_name, :type_name])
    else
      @is_search = false
      conditions = !(params[:date].nil?) ? "DAY(published_date) = '#{params[:date].to_i}'" : ""
      @books = Book.paginate(:page => params[:page],  :per_page => PER_PAGE_LIMIT,
        :order => "published_date DESC",
        :conditions => conditions
      )
    end
  end

  def advanced
    query = ""

    unless params[:title].nil? || params[:title].empty?
      query << "title: #{params[:title]} "
    end

    unless params[:author].nil? || params[:author].empty?
      query << "author_names: #{params[:author]} "
    end

    unless params[:topic].nil? || params[:topic].empty?
      query << "type_name: #{params[:topic]} "
    end

    unless params[:publisher].nil? || params[:publisher].empty?
      query << "publisher_name: #{params[:publisher]} "
    end

    @books = Book.paginate_search(query, :page => params[:page], :per_page => PER_PAGE_LIMIT, :lazy_load => [:title, :author_names, :publisher_name, :type_name])
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
