const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      console.error(`OH NO!!!`, err);
    });
}

// need to make sure video is the same size ass the canvas.
function paintToCanvas() {
  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width;
  canvas.height = height;
  // use return so if i ever need access to the interval, 
  // I have it. clearInterval()
  return setInterval(() => {
    // pass image or vid, start at 0,0 (top left screen)
    // then paint width and height.
    // that is why we stuck them in there own separate variables.
    ctx.drawImage(video, 0, 0, width, height)
  }, 16);
}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();
}

getVideo();
// when the video auto emits canplay event.
// event listener then hears this and calls painToCanvas func
video.addEventListener('canplay', paintToCanvas);