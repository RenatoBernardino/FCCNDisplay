import { UPDATE_DATA, SET_DATA, UPDATE_QUERY, UPDATE_RESOLUTION, SET_CURRENT_VIDEO, SET_CURRENT_VIDEO_REF, SET_VIDEO_FORMATION, SET_LOADING } from "../actions/interfaceActions";


const initialState = {
  query: "",
  resolution: "",
  resolution_options: [],
  page: 1,
  total_pages: 1,
  videos: [],
  desktop: window.innerWidth > 767,
  data_fetched: false,
  current_video: null,
  current_video_ref: null,
  video_formation: "grid",
  formats_per_page: {},
  loading: false,
};

const interfaceReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        total_pages: action.payload.total_pages,
        resolution: action.payload.resolution_options?.length > 0 ? action.payload.resolution_options[0] : "",
        resolution_options: action.payload.resolution_options,
        videos: action.payload.videos,
        data_fetched: true,
        formats_per_page: action.payload.formats_per_page,
      };
    case UPDATE_DATA:
      if(initialState.current_video_ref != null){initialState.current_video_ref.current.pause();}
      return {
        ...state,
        page: action.payload.page,
        total_pages: action.payload.total_pages,
        videos: action.payload.videos,
        current_video: null,
        current_video_ref: null,
      }
    case UPDATE_QUERY:
      return {
        ...state,
        query: action.payload.query,
      }
    case UPDATE_RESOLUTION:
      return {
        ...state,
        resolution: action.payload.resolution,
      }
    case SET_CURRENT_VIDEO:
      return{
        ...state,
        current_video: action.payload.video,
      }
    case SET_CURRENT_VIDEO_REF:
      return{
        ...state,
        current_video_ref: action.payload.video_ref,
      }
    case SET_VIDEO_FORMATION:
      return{
        ...state,
        video_formation: action.payload.video_formation,
      }
    case SET_LOADING:
      return{
        ...state,
        loading: action.payload,
      }
    default:
      return state;
  }
};

export default interfaceReducer;