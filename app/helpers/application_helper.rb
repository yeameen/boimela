# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
  NUMERIC_LOCALIZE_MAP = {
   'bn' =>  ["০","১","২","৩","৪","৫","৬","৭","৮","৯"],
   'hi' => ["०","१","२","३","४","५","६","७","८","९"],
   'ar' => ["٠", "١","٢","٣","٤","٥","٦","٧","٨","٩"]
  }

  def localize_numeric(source, locale_code = 'bn')
    string_representation = source
  result_string = nil

  if locale_code && NUMERIC_LOCALIZE_MAP.include?(locale_code)
    result_string = string_representation.gsub(/\d/){|digit|
      NUMERIC_LOCALIZE_MAP[locale_code][digit.to_i]
    }
  else
    result_string = string_representation
  end
  result_string
  end
end
