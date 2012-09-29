Dir[ File.join( File.dirname(__FILE__), '*.rb' ) ].each do |f|
  require f
end

Awestruct::Extensions::Pipeline.new do
  extension Awestruct::Extensions::Gearing.new('_app.js', 'js/app.js', ['js'], [], :minify => "never")
  extension Awestruct::Extensions::Gearing.new('_services.js', 'js/services.js', ['js'], [], :minify => "never")
  extension Awestruct::Extensions::Gearing.new('_controllers.js', 'js/controllers.js', ['js'], [], :minify => "never")
  extension Awestruct::Extensions::Gearing.new('_filters.js', 'js/filters.js', ['js'], [], :minify => "never")
  extension Awestruct::Extensions::Gearing.new('_directives.js', 'js/directives.js', ['js'], [], :minify => "never")
  extension Awestruct::Extensions::Gearing.new('_plugins.js', 'js/plugins.js', ['js'])
  extension Awestruct::Extensions::Gearing.new('_scripts.js', 'js/scripts.js', ['js'])
  extension Awestruct::Extensions::Gearing.new('_main.js', 'js/main.js', ['js'], [], :minify => "never")
  
  extension Awestruct::Extensions::Gearing.new('libs/_angular.js', 'js/libs/angular/angular.js', ['js'], [], :minify => "never", :version => "1.0.1", :interpolate => false)
  extension Awestruct::Extensions::Gearing.new('libs/_angular.min.js', 'js/libs/angular/angular.js', ['js'], [], :minify => "already", :version => "1.0.1", :interpolate => false)
  extension Awestruct::Extensions::Gearing.new('libs/_noty.js', 'js/libs/noty/noty.js', ['js'], [], :version => "2.0.3", :interpolate => false)
  
  extension Awestruct::Extensions::Gearing.new('_style.css.less', 'css/style.css', ['less'])
  
  extension Awestruct::Extensions::Indexifier.new
  
  helper Awestruct::Extensions::Partial
end

