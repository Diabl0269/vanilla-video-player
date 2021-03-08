// Provide any array of videos, global variable for now, could be fetched from a DB
const videos = [
  { src: "fire.mp4", description: "This is fire" },
  { src: "light_bulb.mp4", description: "This is a light bulb" },
  { src: "woods.mp4", description: "These are woods" },
];

const init = () => {
  // Playing state for the play button
  let videoOn = false;

  // Video index to show the current video
  let currentVideoIndex = 0;

  let video = document.getElementById("video");

  const videoIndex = document.getElementById("videoIndex");
  const videoIndexText = document.getElementById("videoIndexText");
  const videoDescription = document.getElementById("videoDescription");

  const setVideoData = (videoToSet) => {
    const newVideo = videos[currentVideoIndex];
    videoToSet.src = newVideo.src;

    videoDescription.innerHTML = newVideo.description;
    videoIndex.innerHTML = currentVideoIndex + 1;
  };
  setVideoData(video);

  const videoContainer = document.getElementById("videoContainer");

  const handleVideoChange = (direction) => {
    const newVideoEl = document.createElement("video");

    video.addEventListener("animationend", () => {
      video.remove();
      video = newVideoEl;
    });

    // Set the new video
    newVideoEl.addEventListener("animationend", () =>
      newVideoEl.classList.remove("absolute-position")
    );

    newVideoEl.classList.add("video", "video-appear", "absolute-position");

    setVideoData(newVideoEl);
    videoContainer.insertBefore(newVideoEl, videoContainer.childNodes[0]);

    video.classList.add(`video-exit-${direction}`);

    // Restart text animation
    videoDescription.classList.remove("video-description");
    videoIndex.classList.remove("video-index");
    videoIndexText.classList.remove("video-index-text");

    void videoIndex.offsetWidth;

    videoIndex.classList.add("video-index");
    videoDescription.classList.add("video-description");
    videoIndexText.classList.add("video-index-text");

    if (videoOn) {
      newVideoEl.play();
    }
  };

  const incrementVideo = () => () => {
    if (currentVideoIndex + 1 === videos.length) {
      currentVideoIndex = 0;
    } else {
      currentVideoIndex++;
    }
    handleVideoChange("right");
  };

  const decrementVideo = () => () => {
    if (currentVideoIndex === 0) {
      currentVideoIndex = videos.length - 1;
    } else {
      currentVideoIndex--;
    }
    handleVideoChange("left");
  };

  document.getElementById("rightButton").onclick = incrementVideo(video);
  document.getElementById("rightArrow").onclick = incrementVideo(video);

  document.getElementById("leftButton").onclick = decrementVideo(video);
  document.getElementById("leftArrow").onclick = decrementVideo(video);

  const handlePlay = () => {
    if (videoOn) {
      video.pause();
    } else {
      video.play();
    }
    videoOn = !videoOn;
  };

  document.getElementById("play-button").onclick = handlePlay;
};

window.onload = init;
