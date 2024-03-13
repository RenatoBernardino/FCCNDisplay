import pexels_logo from '../assets/pexels_logo.png';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { searchData, updateResolution, updateQuery } from '../actions/interfaceActions';

function Header() {
  const dispatch = useDispatch();

  const initialQuery = useSelector((state) => state.interface.query);
  const resolution = useSelector((state) => state.interface.resolution);

  const [currentResolution, setCurrentResolution] = useState(resolution);
  const resolution_options = useSelector((state) => state.interface.resolution_options);

  const [showFilters, setShowFilters] = useState(false);

  const [localQuery, setLocalQuery] = useState(initialQuery);

  const video_formation = useSelector((state) => state.interface.video_formation);

  const MAXIMUM_INPUT_CHARACTERS = 50;


  useEffect(() => {
    if(currentResolution != resolution){
      setCurrentResolution(resolution);
    }
  }, [resolution]);

  const handleInputChange = (event) => {
    if (typeof event.target.value !== 'string'){return;}
    if (event.target.value.length <= MAXIMUM_INPUT_CHARACTERS) {
      setLocalQuery(event.target.value);
    }
  }

  const searchQuery = () => {
    dispatch(updateQuery(localQuery));
    dispatch(updateResolution(currentResolution));
    dispatch(searchData(localQuery, resolution, 1, video_formation ));
  }

  const changeResolution= (value) => {
    if(currentResolution === value){return;}

    dispatch(updateResolution(value));
  }

  const ResolutionOption = ({value}) => {
    return(<div className='d-flex mx-2 mx-xl-5'>
      <Button className="background-blue rounded-1" onClick={() => changeResolution(value)}>
        <FontAwesomeIcon icon={faCheck} style={ resolution === value ? {} : {opacity: 0}}/>
      </Button>
      <div className='filter-option-text px-2 rounded-1 mx-1 d-flex align-items-center' style={{minWidth: "100px"}}>{value}</div>
    </div>)
  }
  
  const inputClasses = showFilters ? "col-11 h-50 rounded-top mr-2 border-0" : "col-11 h-50 rounded mr-2 border-0";
  return (
    <div className="row header m-0" style={{backgroundColor: "#000"}}>
      <div className="col-12 d-flex p-0">
        <div className="col-2 d-flex">
          <img src={pexels_logo} alt="Logo" className="logo mx-3 my-auto"></img>
          <div className="d-flex align-items-center text-white">
            <h5 className="m-0">Pexels</h5>
          </div>
        </div>
        <div className="col-8 d-none d-lg-flex align-items-center justify-content-center" style={{position: "relative"}}>
          <input name="searchInput" className={inputClasses} value={localQuery} onChange={handleInputChange} maxLength={50}
          style={{ paddingLeft: '10px' }}/>
          
          <div className="col-1 d-flex align-items-center">
          <div className='mx-1'><Button className="background-blue search-buttons rounded" onClick={(e) =>{ e.persist();
          searchQuery(e);
          }}><FontAwesomeIcon icon={faSearch} /></Button></div>
          <div><Button className="background-blue search-buttons rounded" onClick={() => setShowFilters(!showFilters)}><FontAwesomeIcon icon={faFilter} style={showFilters ? {color: "black"} : {}}/></Button></div>
          {showFilters && (
            <div className='d-flex' style={{position: "absolute", top: "6vh", left: "0", width: "100%", zIndex: 2}}>
              <div className="col-11 rounded-bottom border-top border-dark bg-light p-3 px-4 d-flex">
                <div className='w-100 d-flex align-items-center'>
                  <div className='mx-xl-5 mx-2'>
                    <p className='m-0'><strong>Resoluções</strong></p>
                  </div>
                  {resolution_options.map((value, index) => (
                    <ResolutionOption key={index} value={value}/>
                  ))}
                </div>
                
              </div>
              <div className='mx-1' style={{opacity: 0}}><Button className="background-blue search-buttons rounded"></Button></div>
              <div><Button className="background-blue search-buttons rounded" style={{opacity: 0}}></Button></div>
            </div>
          )}
          </div>
        </div>
        <div className="col-2"></div>
      </div>
    </div>
  );
  }
  
  export default Header;
  