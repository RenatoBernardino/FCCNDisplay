class PexelsController < ApplicationController
  require 'pexels'

  include PexelsHelper

  def index; end

  def fetch
    # If desktop param not present just assume it is desktop
    video_formation = params['video_formation'] || 'grid'

    data = get_videos(video_formation: video_formation)

    render json: { videos: data[:videos_data], total_pages: data[:total_pages], per_page: data[:per_page], page: data[:page], resolution_options: resolutions, formats_per_page: formats_per_page }
  end

  def search
    success, args, error_message = verify_params

    render json: { error_message: error_message }, status: :bad_request and return unless success

    data = get_videos(query: args[:query], size: args[:size], page: args[:page], video_formation: args[:video_formation] )

    render json: { videos: data[:videos_data], per_page: data[:per_page], page: data[:page], total_pages: data[:total_pages] }
  end
end
