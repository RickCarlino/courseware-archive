class Chapter
  MANUSCRIPT_DIR    = "manuscript/"
  SLIDES_DIR        = "slides/"
  TABLE_OF_CONTENTS = MANUSCRIPT_DIR + "book.txt"

  attr_reader :filename, :content

  def self.all
    @all ||= File
              .read(TABLE_OF_CONTENTS)
              .split("\n")
              .map { |f| Chapter.new(f) }
  end

  def initialize(filename)
    @filename = filename
    @content  = File.read(SLIDES_DIR + filename)
    puts "Loaded '#{filename}'"
  end

  def gsub!(find, replace)
    @content.gsub!(find, replace)
    self
  end

  def copy!(destination = MANUSCRIPT_DIR)
    File.open(destination + filename, 'w') { |f| f.write(content) }
    puts "Saving '#{destination}#{filename}'"
    self
  end

  def remove_chunk(start_marker, end_marker)
    pattern = "#{start_marker}.*#{end_marker}"
    regex   = Regexp.new(pattern, Regexp::IGNORECASE | Regexp::MULTILINE)
    gsub!(regex, "")
  end
end
