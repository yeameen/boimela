require File.expand_path(File.dirname(__FILE__) + '/../spec_helper')

describe Book do
  before(:each) do
    @sample_csv_row = {
      'heading' => ["ক্রমিক", "বইয়ের নাম", "লেখক/অনুবাদক/সম্পাদক", "বইয়ের ধরণ/বিষয়", "প্রকাশনা প্রতিষ্ঠান/প্রকাশক", "প্রকাশকাল", "মূল্য"],
      'simple' => ["3rd February, 2009", "প্রেম হলেও হতে পারত", "জামাল রেজা", "গল্প", "নওরোজ কিতাবিস্তান", "গ্রন্থমেলা ২০০৯", "100"],
      'invalid' => ["hello", "world"]
    }
  end

  it "should avoid heading row" do
    old_row_count = Book.count

    return_value = nil
    lambda {
      return_value = Book.add_row(@sample_csv_row['heading'])
    }.should raise_error
    return_value.should be_nil

    new_row_count = Book.count
    new_row_count.should == old_row_count
  end


  it "should avoid invalid row with unproper row number" do
    old_row_count = Book.count

    return_value = nil
    lambda {
      return_value = Book.add_row(@sample_csv_row['invalid'])
    }.should raise_error
    
    new_row_count = Book.count
    new_row_count.should == old_row_count
  end

  it "should successfully insert normal row" do
    old_row_count = Book.count
    puts "Author count: #{Author.count}"
    puts "Publisher count: #{Publisher.count}"
    puts "Type count: #{Type.count}"
    

    return_value = Book.add_row(@sample_csv_row['simple'])
    return_value.should_not be_nil

    new_row_count = Book.count
    new_row_count.should == 1 + old_row_count

    puts "Author count: #{Author.count}"
    puts "Publisher count: #{Publisher.count}"
    puts "Type count: #{Type.count}"
  end
end
