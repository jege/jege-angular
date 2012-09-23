require 'sprockets'
require 'less'
require 'yui/compressor'
require 'awestruct/context'
require 'awestruct/handlers/string_handler'
require 'awestruct/handlers/interpolation_handler'

module Awestruct::Extensions
  class Gearing
    def initialize(input_path, output_path, append_paths = [], preprend_paths = [], opts = {})
      @input_path = input_path
      @output_path = output_path
      @append_paths = append_paths
      @preprend_paths = preprend_paths
      @append_version = opts[:append_version] || true
      @version = opts[:version]
      @interpolate = (opts[:interpolate].nil? ? true : opts[:interpolate])
      @minify = opts[:minify] || "default"
      @minify_munge = (opts[:minify_munge].nil? ? true : opts[:minify_munge])
      @minify_suffix = opts[:minify_suffix] || '.min'
    end
    
    def execute(site)
      env = Sprockets::Environment.new
      
      @append_paths.each do |append_path|
        env.append_path append_path
      end
      
      @preprend_paths.each do |preprend_path|
        env.preprend_path preprend_path
      end
      
      if(@interpolate)
        handledOutput = Awestruct::Handlers::StringHandler.new( site, env[@input_path].to_s )
        handler = Awestruct::Handlers::InterpolationHandler.new( site, handledOutput )
        context = Awestruct::Context.new(:site=>site)
        output = handler.rendered_content( context )
      else
        output = env[@input_path].to_s
      end
      
      if(@append_version)
      	@version = @version || site.version
        @output_path[@output_path.rindex(".")] = "-" + @version + "."
      end
      
      do_compress = case @minify
        when 'always' then true
        when 'already' then false
        when 'never' then false
        else site.minify
      end
      
      lastDotIndex = @output_path.rindex(".")
      
      if(do_compress)
        fileExtension = @output_path[lastDotIndex+1, @output_path.length]
        
        compressor = case fileExtension
          when 'js' then YUI::JavaScriptCompressor.new(:munge => @minify_munge)
          when 'css' then YUI::CssCompressor.new
          else nil
        end
        
        if(!compressor.nil)
          output = compressor.compress(output)
        end
      end
      
      if(do_compress || @minify == 'already')
        lastDotIndex = @output_path.rindex(".")
        @output_path[lastDotIndex] = @minify_suffix + "."
      end
      
      filePath = File.join( site.config.output_dir, @output_path )
      FileUtils.mkdir_p( File.dirname( filePath ) )
      File.open( filePath, 'wb' ) do |file|
        file << output
      end
    end
  end
end