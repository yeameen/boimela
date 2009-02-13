class Book < ActiveRecord::Base

  has_many :books_authors
  has_many :authors, :through => :books_authors, :source => :author
  belongs_to :publisher
  belongs_to :type
  
  acts_as_ferret :fields => {
    :title => {:boost => 5, :store => :yes},
    :author_names => {:boost => 10, :store => :yes},
    :publisher_name => {:boost => 0, :store => :yes}
  }

  ATTRIBUTE_VALUE_MAPPINGS = {
    "published_date"    => 0,
    "title"             => 1,
    "author"            => 2,
    "type"              => 3,
    "publisher"         => 4,
    "prokashkal"        => 5,
    "price"             => 6
  }

  def to_label
    return title
  end
  
  def author_names
    a = self.authors.inject([]){|temp, a| temp << a.name}
    return a.join(", ")
  end

  def publisher_name
    self.publisher.name
  end

  def self.add_row(row_array)
    # row_array should have 21 columns
    raise "Row doesn't have 7 columns" unless row_array.length == 7

    # return if it is a heading row
    return nil if row_array[ATTRIBUTE_VALUE_MAPPINGS["published_date"]] == "date"

    new_record = new()

    # update all the dates
    new_record.published_date = Date.parse(row_array[ATTRIBUTE_VALUE_MAPPINGS["published_date"]]) unless row_array[ATTRIBUTE_VALUE_MAPPINGS["published_date"]].nil?

    "title prokashkal price".split.each do |attribute|
#      puts "inserting value of #{attribute} as #{row_array[ATTRIBUTE_VALUE_MAPPINGS[attribute]]}"

      eval("new_record.#{attribute} = row_array[ATTRIBUTE_VALUE_MAPPINGS[attribute]]")
    end

    # insert author
    author_names = row_array[ATTRIBUTE_VALUE_MAPPINGS["author"]]
    author_names.split(" ")
    new_record.authors << Author.find_or_create_by_name({:name => author_names})

    # insert type
    type_name = row_array[ATTRIBUTE_VALUE_MAPPINGS["type"]]
    new_record.type = Type.find_or_create_by_name({:name => type_name})

    # insert publisher
    publisher_name = row_array[ATTRIBUTE_VALUE_MAPPINGS["publisher"]]
    new_record.publisher = Publisher.find_or_create_by_name({:name => publisher_name})

    return nil unless new_record.save
    new_record
  end
end
