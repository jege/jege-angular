Dir[ File.join( File.dirname(__FILE__), '*.rb' ) ].each do |f|
  require f
end

Awestruct::Extensions::Pipeline.new do
  extension Awestruct::Extensions::Gearing.new('_app.js', 'js/app.js', ['js'], [], :compress => "never")
  extension Awestruct::Extensions::Gearing.new('_services.js', 'js/services.js', ['js'], [], :compress => "never")
  extension Awestruct::Extensions::Gearing.new('_controllers.js', 'js/controllers.js', ['js'], [], :compress => "never")
  extension Awestruct::Extensions::Gearing.new('_filters.js', 'js/filters.js', ['js'], [], :compress => "never")
  extension Awestruct::Extensions::Gearing.new('_directives.js', 'js/directives.js', ['js'], [], :compress => "never")
  extension Awestruct::Extensions::Gearing.new('_plugins.js', 'js/plugins.js', ['js'])
  extension Awestruct::Extensions::Gearing.new('_script.js', 'js/script.js', ['js'])
  extension Awestruct::Extensions::Gearing.new('_scripts.js', 'js/scripts.js', ['js'], [], :compress => "never")
  extension Awestruct::Extensions::Gearing.new('_style.css.less', 'css/style.css', ['less'])
  extension Awestruct::Extensions::Indexifier.new
  helper Awestruct::Extensions::Partial
end

