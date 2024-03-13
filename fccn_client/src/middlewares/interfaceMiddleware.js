import axios from 'axios';
import { FETCH_DATA, SEARCH_DATA, setData, setLoading, updateData } from '../actions/interfaceActions';


export const interfaceMiddleware = () => (dispatch) => (action) => {

  switch (action.type) {
    case FETCH_DATA:
      dispatch(setLoading(true));
      axios.get(`http://127.0.0.1:3001/fetch?video_formation=${action.payload.video_formation}`)
        .then((response) => {
          dispatch(setData(response.data));
          dispatch(setLoading(false));
        })
        .catch((error) => {
          // TODO dispatch(fetchDataFailure(error.message));
        });
      break;
    case SEARCH_DATA:
      const { query, resolution, page, video_formation } = action.payload;

      const url = `http://127.0.0.1:3001/search?query=${query}&resolution=${resolution}&page=${page}&video_formation=${video_formation}`;
      dispatch(setLoading(true));
      axios.get(url)
        .then((response) => {
          dispatch(updateData(response.data));
          dispatch(setLoading(false));
        })
        .catch((error) => {
          // TODO dispatch(fetchDataFailure(error.message));
        });
      break;

    default:
      dispatch(action);
      break;
  }
};