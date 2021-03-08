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

  const videoContainer = document.getElementById("videoContainer");

  function x() {
    // video.classList.remove("absolutePosition");
    const newVideo = document.createElement("video");
    newVideo.classList.add("video", "videoAppear");
    newVideo.src = videos[2].src;
    videoContainer.insertBefore(newVideo, videoContainer.childNodes[0]);
    video.remove();
    video = videoContainer.childNodes[0];
  }

  video.addEventListener("animationend", x);
  //   video.addEventListener("animationend", () => video.remove());

  const videoIndex = document.getElementById("videoIndex");
  const videoDescription = document.getElementById("videoDescription");

  const handleVideoChange = () => {
    const newVideo = videos[currentVideoIndex];

    // Set the new video
    video.src = newVideo.src;

    // Set the video text
    videoDescription.innerHTML = newVideo.description;
    videoIndex.innerHTML = currentVideoIndex + 1;

    // Restart text animation
    videoDescription.classList.remove("videoDescription");
    videoIndex.classList.remove("videoIndex");

    void videoIndex.offsetWidth;

    videoIndex.classList.add("videoIndex");
    videoDescription.classList.add("videoDescription");

    if (videoOn) {
      video.play();
    }
  };

  handleVideoChange();

  const incrementVideo = () => () => {
    if (currentVideoIndex + 1 === videos.length) {
      currentVideoIndex = 0;
    } else {
      currentVideoIndex++;
    }
    handleVideoChange();
  };

  const decrementVideo = () => () => {
    if (currentVideoIndex === 0) {
      currentVideoIndex = videos.length - 1;
    } else {
      currentVideoIndex--;
    }
    handleVideoChange();
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

  document.getElementById("playButton").onclick = handlePlay;
};

window.onload = init;
