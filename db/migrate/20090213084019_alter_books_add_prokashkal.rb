class AlterBooksAddProkashkal < ActiveRecord::Migration
  def self.up
    add_column :books, :prokashkal, :string
  end

  def self.down
    remove_column :books, :prokashkal
  end
end
