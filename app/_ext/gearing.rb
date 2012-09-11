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
      @interpolate = opts[:interpolate] || true
      @compress = opts[:compress] || "default"
      @compress_munge = opts[:compress_munge] || true
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
        @output_path[@output_path.rindex(".")] = "-" + site.version + "."
      end
      
      if(@compress == "always")
        do_compress = true
      else
        if(@compress == "never")
          do_compress = false
        else
          @compress = (site.profile == "production")
        end
      end
      
      if(do_compress)
        lastDotIndex = @output_path.rindex(".")
        fileExtension = @output_path[lastDotIndex+1, @output_path.length]
        
        @output_path[lastDotIndex] = ".min."
        
        if(fileExtension == 'js')
          compressor = YUI::JavaScriptCompressor.new(:munge => @compress_munge)
        end
        
        if(fileExtension == 'css')
          compressor = YUI::CssCompressor.new
        end
        
        output = compressor.compress(output)
      end
      
      filePath = File.join( site.config.output_dir, @output_path )
      FileUtils.mkdir_p( File.dirname( filePath ) )
      File.open( filePath, 'wb' ) do |file|
        file << output
      end
    end
  end
end