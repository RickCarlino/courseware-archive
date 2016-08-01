require_relative "chapter"

# TODO: Need to add a "marker remover" so that I can fence in sections of text
# and strip them out.
# See: http://stackoverflow.com/a/4841124/1064917
#
# Example my_chapter.remove_chunk("---START-MARKER", "---END-MARKER")

Chapter
  .all
  .map { |chapter| chapter.gsub!("\n---\n", "") }
  .map { |chapter| chapter.gsub!("**", "") }
  .map { |chapter| chapter.gsub!("manuscript/images/", "images/") }
  .map(&:copy!)

if Gem.win_platform?
  puts "Don't forget to push commits!"
else
  `git add -A`
  `git commit -am "Auto-publish at #{ Time.now }"`
  `git push origin master`
end

puts "Finished"
