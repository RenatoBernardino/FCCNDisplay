import pexels_logo from '../assets/pexels_logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { searchData, updateResolution, updateQuery } from '../actions/interfaceActions';
import Search from './Search';

function Header() {
  const dispatch = useDispatch();

  const video_formation = useSelector((state) => state.interface.video_formation);

  const resolution = useSelector((state) => state.interface.resolution);

  const searchQuery = (localQuery, currentResolution) => {
    dispatch(updateQuery(localQuery));
    dispatch(updateResolution(currentResolution));
    dispatch(searchData(localQuery, resolution, 1, video_formation ));
  }

  
  return (
    <div className="row header m-0" style={{backgroundColor: "#000"}}>
      <div className="col-12 d-flex p-0">
        <div className="col-2 d-flex">
          <img src={pexels_logo} alt="Logo" className="logo mx-3 my-auto"></img>
          <div className="d-flex align-items-center text-white">
            <h5 className="m-0">Pexels</h5>
          </div>
        </div>
        <Search searchQuery={searchQuery} />
        <div className="col-2"></div>
      </div>
    </div>
  );
}
  
export default Header;
  