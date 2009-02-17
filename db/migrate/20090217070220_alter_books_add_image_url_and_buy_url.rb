class AlterBooksAddImageUrlAndBuyUrl < ActiveRecord::Migration
  def self.up
    add_column :books, :image_url, :string
    add_column :books, :buy_url, :string
  end

  def self.down
    remove_column :books, :image_url
    remove_column :books, :buy_url
  end
end
