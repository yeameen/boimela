class CreateBooks < ActiveRecord::Migration
  def self.up
    create_table :books do |t|
      t.string :title
      t.integer :author_id
      t.integer :publisher_id
      t.datetime :published_date
      t.float :price
      t.string :url
      t.timestamps
    end
  end

  def self.down
    drop_table :books
  end
end
