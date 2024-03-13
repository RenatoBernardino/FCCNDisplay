// Action Types
export const FETCH_DATA = 'FETCH_DATA';
export const SET_DATA = 'SET_DATA';
export const SEARCH_DATA = 'SEARCH_DATA';
export const UPDATE_DATA = 'UPDATE_DATA';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const UPDATE_RESOLUTION = 'UPDATE_RESOLUTION';
export const SET_CURRENT_VIDEO = 'SET_CURRENT_VIDEO';
export const SET_CURRENT_VIDEO_REF = 'SET_CURRENT_VIDEO_REF';
export const SET_VIDEO_FORMATION = 'SET_VIDEO_FORMATION';
export const SET_LOADING = 'SET_LOADING';

export const fetchData = (video_formation) => ({
  type: FETCH_DATA,
  payload: {
    video_formation: video_formation,
  },
});

export const setData = (data) => ({
  type: SET_DATA,
  payload: data,
});

export const searchData = (query, resolution, page, video_formation) => ({
  type: SEARCH_DATA,
  payload: { query, resolution, page, video_formation },
});

export const updateData = (data) => ({
  type: UPDATE_DATA,
  payload: data,
});

export const updateQuery = (query) => ({
  type: UPDATE_QUERY,
  payload: {
    query: query,
  },
});

export const updateResolution = (resolution) => {
  return {
    type: UPDATE_RESOLUTION,
    payload: {
      resolution: resolution,
    },
  };
};

export const setCurrentVideo = (video) => {
  return{
    type: SET_CURRENT_VIDEO,
    payload: {
      video: video,
    }
  };
};

export const setCurrentVideoRef = (videoRef) => {
  return{
    type: SET_CURRENT_VIDEO_REF,
    payload: {
      video_ref: videoRef,
    }
  };
};

export const setVideoFormation = (videoFormation) => ({
  type: SET_VIDEO_FORMATION,
  payload: {
    video_formation: videoFormation,
  },
});

export const setLoading = (loading) => ({
  type: SET_LOADING,
  payload: loading,
});