const quality = document.getElementById("quality");
const getMedia = document.getElementById("getMedia");
const changeMedia = document.getElementById("changeMedia");
const localVideo = document.getElementById("localvideo");
const settings = document.getElementById("settings");

let stream = null;

async function obtainMedia() {
  changeMedia.style.display = "block";
  getMedia.style.display = "none";
  stream = await navigator.mediaDevices.getUserMedia({
    video: {
      height: { exact: parseInt(quality.value) }
    }
  });
  localVideo.srcObject = stream;
  settings.innerText = JSON.stringify(
    stream.getVideoTracks()[0].getConstraints()
  );
}

async function changeMediaProperties() {
  const videoTrack = stream.getVideoTracks()[0];
  const constraints = videoTrack.getConstraints();
  constraints.height = parseInt(quality.value);
  await videoTrack.applyConstraints(constraints);
  settings.innerText = JSON.stringify(
    stream.getVideoTracks()[0].getConstraints()
  );
}

getMedia.addEventListener("click", obtainMedia);
getMedia.addEventListener("touchstart", obtainMedia);
changeMedia.addEventListener("click", changeMediaProperties);
changeMedia.addEventListener("touchstart", changeMediaProperties);
