class AlterBooks < ActiveRecord::Migration
  def self.up
    remove_column :books, :author_id
  end

  def self.down
    add_column :books, :author_id, :integer
  end
end
