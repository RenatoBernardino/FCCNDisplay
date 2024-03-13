module PexelsHelper

  GRID_VIDEOS_PER_PAGE = 16
  COLUMN_VIDEOS_PER_PAGE = 10

  def get_videos(query: 'Nature', size: 'small', page: 1, video_formation: 'grid' )

    client = Pexels::Client.new(Rails.application.credentials.pexels_api_key)
    videos = client.videos.search(query, orientation: "landscape", size: size, per_page: video_formation == 'grid' ? GRID_VIDEOS_PER_PAGE : COLUMN_VIDEOS_PER_PAGE, page: page)
    
    videos_data = videos.map do |video|
        extract_video_data(video)
    end

    {total_pages: (videos.total_results / videos.per_page.to_f).ceil, per_page: videos.per_page, page: videos.page, videos_data: videos_data }
  end

  def resolutions
    ["HD", "Full HD", "4k"]
  end

  def extract_video_data(video)
    {
      width: video.width,
      height: video.height,
      duration: video.duration,
      user_name: video.user.name,
      video_files: video.files,
      video_pictures: video.pictures,
      id: video.id,
    }
  end

  def verify_params
    success = true
    page = params['page']
    query = params['query'] || 'Nature'
    resolution = params['resolution']
    video_formation = params['video_formation'] || "grid"
    
    return [false, {}, 'Page has to be a positive number'] unless page.to_i.positive? 

    unless resolution.nil?
      return [false, {}, 'Invalid resolution passed'] unless resolutions.include?(resolution)
    end

    query = 'Nature' if query.empty?

    params_verified = {page:, query:, size: get_size(resolution), video_formation:}

    [true, params_verified, '']
  end

  def get_size(resolution)
    case resolution
    when "HD"
      return "small"
    when "Full HD"
      return "medium"
    when "4k"
      return "large"
    else
      return "small"
    end
  end

  def formats_per_page
    {"grid": GRID_VIDEOS_PER_PAGE, "column": COLUMN_VIDEOS_PER_PAGE}
  end


end