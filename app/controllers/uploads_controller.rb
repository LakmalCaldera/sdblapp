class UploadsController < ApplicationController
  def index
    @files = Dir.entries("public/uploads/apk")
  end

  def create
    name = params[:upload][:file].original_filename
    directory = "public/uploads/apk"
    path = File.join(directory, name)
    File.open(path, "wb") { |f| f.write(params[:upload][:file].read) }
    redirect_to "/uploads"
  end

  def destroy
    file_path = "#{Rails.root}/public/uploads/apk/#{params[:item]}"
    FileUtils.remove_file(file_path)
  end
end
