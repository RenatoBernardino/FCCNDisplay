import { useDispatch, useSelector } from "react-redux";
import VideoDisplay from "./VideoDisplay";
import { searchData, setCurrentVideo, setVideoFormation } from "../actions/interfaceActions";
import { Button } from "react-bootstrap";
import { faFilter, faGripVertical, faSpinner, faTableCells, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Body() {
  const dispatch = useDispatch();
  const desktop = useSelector((state) => state.interface.desktop);

  const videos = useSelector((state) => state.interface.videos);

  const current_video = useSelector((state) => state.interface.current_video);

  const video_formation = useSelector((state) => state.interface.video_formation);

  const page = useSelector((state) => state.interface.page);
  const total_pages = useSelector((state) => state.interface.total_pages);
  const formats_per_page = useSelector((state) => state.interface.formats_per_page);
  const query = useSelector((state) => state.interface.query);
  const resolution = useSelector((state) => state.interface.resolution);

  const loading = useSelector((state) => state.interface.loading);

  const displayVideo = (id) => {
    const foundObject = videos.find(obj => obj.id === id);
    dispatch(setCurrentVideo(foundObject));
  }

  const changeVideoFormation = (formation) => {
    if(formation === video_formation){return;}

    if(formation !== "grid" && formation !== "column"){return;}

    const currentResults = page * formats_per_page[video_formation];

    // Use max because it can be 0 and this yields an error
    const updatedPage = Math.max(Math.floor(currentResults / formats_per_page[formation]), 1);

    dispatch(searchData(query, resolution, updatedPage, formation));
    dispatch(setVideoFormation(formation));

  }

  const DisplayVideoGrid = () => {
    return( 
      <div className="grid-container">
      
        {videos.map((obj) => (
          <VideoDisplay key={obj.id} data={obj} desktop={desktop} display_type={"small"} displayVideo={displayVideo}/>
        ))}
        
      </div>
    );
  }

  const DisplayVideoColumn = () => {

     

    return (
      <div className="d-block">
        {videos.map((obj) => (
            <VideoDisplay key={obj.id} data={obj} desktop={desktop} display_type={"small"} displayVideo={displayVideo}/>
          ))}
      </div>

    );
  }

  const DisplaySeveralVideos = () => {
    return(
      <div>
        <div className="d-flex justify-content-end my-4">
          <FontAwesomeIcon icon={faTableCells} className="search-buttons rounded mx-2 mx-xl-4" style={ video_formation === "grid" ? {color: "#05A081"} : {color: "white"}} onClick={() => changeVideoFormation("grid")}/>
          <FontAwesomeIcon icon={faGripVertical} className="search-buttons rounded" onClick={() => changeVideoFormation("column")} style={ video_formation !== "grid" ? {color: "#05A081"} : {color: "white"}}/>
        </div>
        {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{height: "50vh"}}>
         <FontAwesomeIcon icon={faSpinner} style={{color: "white", width: "100px", height: "100px"}} spin={true} />
        </div>
        )
         : (
          video_formation === "grid" ? <DisplayVideoGrid/> : <DisplayVideoColumn /> 
         )}
        <Pagination/>
        
        
      </div>
    );
  }

  const Pagination = () =>{
    
    const changePage = (new_page) => {
      dispatch(searchData(query, resolution, new_page, video_formation));
    }

    return(
      <>
        {total_pages === 1 || loading ?
          (<div></div>)
          :
          (
            <div className="d-flex justify-content-end align-items-center my-2">
              {1 < page - 1 && (<div className="total-pages-button" onClick={() => changePage(1)}>Primeira página</div>)}
              {page === total_pages && total_pages > 2 &&  (<div className="page-button" onClick={() => changePage(page - 2)}>{page - 2}</div>) }
              {1 < page && (<div className="page-button" onClick={() => changePage(page - 1)}>{page - 1}</div>)}
              <div className="page-button selected-page" onClick={() => changePage(page)}>{page}</div>
              {total_pages > page + 1 && (<div className="page-button" onClick={() => changePage(page + 1)}>{page + 1}</div>)}
              {page === 1 && total_pages >= 3 && (<div className="page-button" onClick={() => changePage(page + 2)}>{page + 2}</div>)}
              {((total_pages > page + 1 && page !== 1) || (total_pages > page + 2 && page === 1))  && (<div className="total-pages-button" onClick={() => changePage(total_pages)}>Total {total_pages}</div>)}
            </div>
          )
        }
      </>
      
      
    );
  }

  const DisplaySingleVideo = () => {
    return(
      <div className="mt-4" style={{maxHeight: "100%"}}>
        <div className="w-100 d-flex justify-content-end align-items-center">
          <FontAwesomeIcon icon={faX} className="search-buttons close-video" onClick={() => dispatch(setCurrentVideo(null))}/>
        </div>
        <div className=" video-container d-flex justify-content-center align-items-center">
          <VideoDisplay data={current_video} desktop={desktop} display_type={"big"} displayVideo={displayVideo}/>
        </div>
        <div>
          <h5 className="m-0 my-3 autor" style={{color: "#0094FF"}}>{current_video.user_name}</h5>
          <p className="m-0 text-white">ID: {current_video.id}</p>
          <p className="m-0 text-white">Resolução: {desktop ? 'hd' : 'sd'}</p>
          <p className="m-0 text-white">Duração: {current_video.duration}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="body px-5 pb-2">
      {current_video == null ? <DisplaySeveralVideos/> : <DisplaySingleVideo /> }
    </div>
  );
}

export default Body;
