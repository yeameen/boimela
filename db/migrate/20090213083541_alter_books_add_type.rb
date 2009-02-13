class AlterBooksAddType < ActiveRecord::Migration
  def self.up
    add_column :books, :type_id, :integer
  end

  def self.down
    remove_column :books, :type_id
  end
end
