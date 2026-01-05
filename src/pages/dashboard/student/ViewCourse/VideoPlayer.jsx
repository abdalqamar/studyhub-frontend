// import { useEffect, useRef } from "react";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";

// const VideoPlayer = ({ src }) => {
//   const videoRef = useRef(null);
//   const playerRef = useRef(null);

//   useEffect(() => {
//     if (!playerRef.current) {
//       playerRef.current = videojs(videoRef.current, {
//         controls: true,
//         autoplay: false,
//         preload: "auto",
//       });
//     } else {
//       playerRef.current.src({ src, type: "video/mp4" });
//     }
//   }, [src]);
//   useEffect(() => {
//     return () => {
//       if (playerRef.current) {
//         playerRef.current.dispose();
//         playerRef.current = null;
//       }
//     };
//   }, []);

//   return (
//     <video ref={videoRef} className="video-js w-full h-full object-contain">
//       <source src={src} type="video/mp4" />
//     </video>
//   );
// };
// export default VideoPlayer;

import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const VideoPlayer = ({ src, onProgressUpdate }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "auto",
      });

      playerRef.current.on("timeupdate", () => {
        const currentTime = playerRef.current.currentTime();
        const duration = playerRef.current.duration();

        if (onProgressUpdate) {
          onProgressUpdate(currentTime, duration);
        }
      });
    }

    return () => {};
  }, [onProgressUpdate]);

  useEffect(() => {
    if (playerRef.current && src) {
      playerRef.current.src({ src, type: "video/mp4" });
      playerRef.current.currentTime(0); // Reset to start
      playerRef.current.load(); // Load new video
    }
  }, [src]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="video-js w-full h-full object-contain"
      controlsList="nodownload"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default VideoPlayer;
