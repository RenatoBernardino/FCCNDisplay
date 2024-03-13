import { faCheck, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateResolution } from "../actions/interfaceActions";

function Search({ searchQuery }) {

  const dispatch = useDispatch();

  const MAXIMUM_INPUT_CHARACTERS = 50;

  const resolution = useSelector((state) => state.interface.resolution);

  const initialQuery = useSelector((state) => state.interface.query);
  const resolution_options = useSelector((state) => state.interface.resolution_options);

  const [currentResolution, setCurrentResolution] = useState(resolution);

  const [showFilters, setShowFilters] = useState(false);

  const [localQuery, setLocalQuery] = useState(initialQuery);

  useEffect(() => {
    if (currentResolution !== resolution) {
      setCurrentResolution(resolution);
    }
  }, [resolution]);

  const changeResolution = (value) => {
    if (currentResolution === value) { return; }

    setCurrentResolution(value);
  }


  const handleInputChange = (event) => {
    if (typeof event.target.value !== 'string') { return; }
    if (event.target.value.length <= MAXIMUM_INPUT_CHARACTERS) {
      setLocalQuery(event.target.value);
    }
  }

  const ResolutionOption = ({ value }) => {
    return (
      <div className="col-3 my-1">
        <div className="col-2"></div>
        <div className='col-10 d-flex'>
          <Button className="background-blue rounded-1 resolution-check-box d-flex align-items-center justify-content-center" onClick={() => changeResolution(value)}>
            <FontAwesomeIcon icon={faCheck} className="" style={currentResolution === value ? {} : { opacity: 0 }} />
          </Button>
          <div className='filter-option-text px-2 rounded-1 mx-1 d-flex align-items-center' style={{ minWidth: "100px" }}>{value}</div>
        </div>
      </div>

    )
  }

  const Filters = () => {
    return (
      <div className='d-flex justify-content-lg-center filters-container'>
        <div className="col-3 d-lg-none"></div>
        <div className="col-7 col-lg-11 rounded-bottom border-top border-dark bg-light p-3 px-4 d-flex">
          <div className='w-100 d-block d-lg-flex align-items-center' style={{pointerEvents: "auto"}}>
            <div className='col-2'>
              <p className='m-0'><strong>Resoluções</strong></p>
            </div>
            {resolution_options.map((value, index) => (
              <ResolutionOption key={index} value={value} />
            ))}
          </div>

        </div>
        <div className="col-1 d-none d-lg-flex align-items-center">
          <div className='mx-1' style={{ opacity: 0 }}><Button className="background-blue search-buttons rounded"></Button></div>
          <div><Button className="background-blue search-buttons rounded" style={{ opacity: 0 }}></Button></div>
        </div>
      </div>
    );
  }

  const inputClasses = showFilters ? "col-7 col-lg-11 h-50 rounded-top mr-2 border-0" : "col-7 col-lg-11 h-50 rounded mr-2 border-0";
  return (
    <div className="col-lg-8 col-10 d-flex align-items-center justify-content-lg-center justify-content-end" style={{ position: "relative" }}>
      <input name="searchInput" className={inputClasses} value={localQuery} onChange={handleInputChange} maxLength={50}
        style={{ paddingLeft: '10px' }} />

      <div className="col-2 col-lg-1 d-none d-lg-flex align-items-center">
        <div className='mx-1'><Button className="background-blue search-buttons rounded" onClick={() => {
          searchQuery(localQuery, currentResolution);
        }}><FontAwesomeIcon icon={faSearch} /></Button></div>
        <div><Button className="background-blue search-buttons rounded" onClick={() => setShowFilters(!showFilters)}><FontAwesomeIcon icon={faFilter} style={showFilters ? { color: "black" } : {}} /></Button></div>
      </div>
      <div className="col-2 col-lg-1 d-block d-lg-none align-items-center">
        <div className='mx-1 my-1'>
          <Button className="background-blue search-buttons rounded d-flex align-items-center justify-content-center" style={{ height: "3vh", width: "3vh", zIndex: 3 }} onClick={() => {searchQuery(localQuery, currentResolution);}}>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </div>
        <div className="mx-1 my-1">
          <Button className="background-blue search-buttons rounded d-flex align-items-center justify-content-center" onClick={() => setShowFilters(!showFilters)} style={{ height: "3vh", width: "3vh", zIndex: 3 }}>
            <FontAwesomeIcon icon={faFilter} style={showFilters ? { color: "black" } : {}} />
          </Button>
        </div>
      </div>
      {showFilters && <Filters />}
    </div>

  );

}

export default Search;