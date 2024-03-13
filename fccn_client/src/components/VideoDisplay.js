import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentVideoRef } from "../actions/interfaceActions";

function VideoDisplay({ data, desktop, displayVideo, display_type }) {

  const dispatch = useDispatch();

  const videoRef = useRef(null);
  const current_video_ref = useSelector((state) => state.interface.current_video_ref);
  const video_formation = useSelector((state) => state.interface.video_formation);

  const videoObject = data.video_files.reduce((maxWidthVideo, file) => {
    if (file.quality === (desktop ? 'hd' : 'sd')) {
      // Check if the current video has a greater width than the max width so far
      if (!maxWidthVideo || file.width > maxWidthVideo.width) {
        return file; // Update the maxWidthVideo to the current video file
      }
    }
    return maxWidthVideo;
  }, null);

  const videoPicture = data.video_pictures[0];

  useEffect(() => {
    if (display_type === "big" && videoRef != null && current_video_ref === null) {
      dispatch(setCurrentVideoRef(videoRef));
      videoRef.current.play();
    }
  }, [videoRef]);

  const handleVideoEnd = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  }

  return (
    display_type === "small" ? (
      video_formation === "grid" ? (<div className="p-0 video-image" onClick={() => displayVideo(data.id, videoRef)}>
        <video ref={videoRef} className="video d-flex justify-content-center align-items-center w-100" poster={videoPicture.picture} onEnded={() => handleVideoEnd()}>
          <source src={videoObject.link} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>) : (
        <div className="col-12 mb-3 d-flex">
          <div className="col-lg-2 col-4">
            <video ref={videoRef} onClick={() => displayVideo(data.id, videoRef)} className="video d-flex justify-content-center align-items-center w-100" poster={videoPicture.picture} onEnded={() => handleVideoEnd()}>
              <source src={videoObject.link} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="col-lg-10 col-8 mx-4" style={{ marginTop: "-5px" }}>
            <h5 className="m-0 mb-3 autor" style={{ color: "#0094FF" }}>{data.user_name}</h5>
            <p className="m-0 text-white">ID: {data.id}</p>
            <p className="m-0 text-white">Duração: {data.duration}</p>
          </div>
        </div>)
    ) : (
      <div className="p-0 video-display" onClick={() => displayVideo(data.id, videoRef)}>
        <video ref={videoRef} className="video d-flex justify-content-center align-items-center w-100" poster={videoPicture.picture} onEnded={() => handleVideoEnd()}>
          <source src={videoObject.link} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    )

  );
}

export default VideoDisplay;
