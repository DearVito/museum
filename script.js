let ppbutton = document.querySelector("button#playpause"),
  smallButtons = document.querySelectorAll(".small-playpause");
let mainVideo = document.querySelector("video#video"),
  smallVideos = document.querySelectorAll(".small-video"),
  allVideosOnPage = document.querySelectorAll("video"),
  btnPlay = document.getElementById("btnPlayPause"),
  imgPlay = document.querySelector("#btnPlayPause img");
// mainVideo.onloadedmetadata = function () {
//   console.log("metadata loaded!");
//   console.log(this.duration);
// };
mainVideo.addEventListener("click", playPause);
ppbutton.addEventListener("click", playPause);
btnPlay.addEventListener("click", playPause);

for (let i = 0; i < smallVideos.length; i++) {
  smallVideos[i].addEventListener("play", (event) => {
    smallButtons[i].style.visibility = "hidden";
    pauseAnotherVideos(i);
  });
  smallVideos[i].addEventListener("pause", (event) => {
    smallButtons[i].style.visibility = "visible";
  });
}

const progress = document.querySelectorAll(".progress");
for (let ind = 0; ind < progress.length; ind++) {
  progress[ind].addEventListener("input", function () {
    const value = this.value;
    this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`;
  });
}
// progress[0].addEventListener("input", seek);

// function seek(e) {
//   var percent = e.offsetX / this.offsetWidth;
//   console.log(e.offsetX, this.offsetWidth);
//   mainVideo.currentTime = percent * mainVideo.duration;
//   e.target.value = Math.floor(percent / 100);
// }
const divisor = document.getElementById("divisor"),
  whiteSlider = document.getElementById("circle"),
  slider = document.getElementById("slider");
function moveDivisor() {
  divisor.style.width = slider.value + "%";
  whiteSlider.style.left = +slider.value - 4.1 + "%";
}
let w =
    document.documentElement.clientWidth ||
    document.body.clientWidth ||
    window.innerWidth,
  index = 0,
  videoIndex = 0;
const targetWidth768 = 768,
  targetWidth420 = 420,
  btn = document.getElementById("buy"),
  lay = document.getElementById("overlay"),
  form = document.getElementById("buying-form"),
  closeIcon = document.getElementById("close-icon"),
  burger = document.querySelector(".burger-nav"),
  closeBurger = document.querySelector(".close-nav"),
  welcomeNav = document.querySelector("#welcome-nav ul"),
  welcomeText = document.querySelector(".welcome-text"),
  welcomeSlider = document.querySelector(".welcome-slider"),
  welcomeImg = document.querySelector(".welcome"),
  welcomeSliderImg = document.querySelector(".welcome-slider-img"),
  altNav = document.getElementById("alt-welcome-nav"),
  prevArr = document.getElementById("arr-prev"),
  nextArr = document.getElementById("arr-next"),
  slides = document.querySelectorAll(".sl-img"),
  dots = document.querySelectorAll(".dot"),
  currentNum = document.getElementById("current-number"),
  videoPrev = document.getElementById("videoPrev"),
  videoNext = document.getElementById("videoNext"),
  videoDots = document.querySelectorAll(".video-dot");

btn.addEventListener("click", on);
closeIcon.addEventListener("click", off);
lay.addEventListener("click", off);
burger.addEventListener("click", burgerOn);
closeBurger.addEventListener("click", burgerOff);
document.addEventListener("keydown", function (event) {
  if (event.code === "Escape") {
    off();
  }
});
dots.forEach((item, indexDot) => {
  item.addEventListener("click", () => {
    index = indexDot;
    prepareCurrentSlide(index);
  });
});
videoDots.forEach((item, indexDot) => {
  item.addEventListener("click", () => {
    videoIndex = indexDot;
    prepareCurrentVideo(videoIndex);
  });
});
nextArr.addEventListener("click", nextSlide);
prevArr.addEventListener("click", prevSlide);
videoPrev.addEventListener("click", prevVideo);
videoNext.addEventListener("click", nextVideo);

function pauseAnotherVideos(index) {
  for (let j = 0; j < smallVideos.length; j++) {
    if (j !== index) {
      smallVideos[j].pause();
    }
  }
}
function playPause() {
  if (mainVideo.paused) {
    mainVideo.play();
    ppbutton.style.visibility = "hidden";
    imgPlay.setAttribute("src", "assets/svg/pauseMain.svg");
  } else {
    mainVideo.pause();
    ppbutton.style.visibility = "visible";
    imgPlay.setAttribute("src", "assets/svg/playMain.svg");
  }
}
function on() {
  lay.style.display = "block";
  form.style.visibility = "visible";
  form.style.transform = "translateX(0)";
}
function off() {
  lay.style.display = "none";
  form.style.visibility = "hidden";
  form.style.transform = "translateX(-150%)";
}

function burgerOn() {
  burger.style.visibility = "hidden";
  closeBurger.style.visibility = "visible";
  welcomeText.style.display = "none";
  welcomeNav.style.display = "block";
  if (w <= targetWidth768) {
    welcomeSlider.style.visibility = "hidden";
    welcomeSliderImg.style.display = "none";
    welcomeImg.style.background = "#000";
    altNav.style.visibility = "visible";
  } else {
    welcomeSlider.style.margin = "465px 0px 0px 0px";
    welcomeSliderImg.style.position = "absolute";
    welcomeSliderImg.style.right = "10px";
  }
}

function burgerOff() {
  burger.style.visibility = "visible";
  closeBurger.style.visibility = "hidden";
  welcomeText.style.display = "block";
  welcomeNav.style.display = "none";
  if (w <= targetWidth768 && w > targetWidth420) {
    welcomeSlider.style.visibility = "visible";
    welcomeSliderImg.style.display = "block";
    welcomeImg.style.height = "861px";
    welcomeImg.style.overflow = "hidden";
    welcomeImg.style.backgroundPosition = "100% 68%";
    welcomeImg.style.padding = "0";
    altNav.style.visibility = "hidden";
  } else if (w <= targetWidth420) {
    welcomeSlider.style.visibility = "visible";
    welcomeSliderImg.style.display = "block";
    welcomeImg.style.height = "544px";
    welcomeImg.style.overflow = "hidden";
    welcomeImg.style.backgroundPosition = "100% 68%";
    welcomeImg.style.padding = "0";
    altNav.style.visibility = "hidden";
  } else {
    welcomeSlider.style.margin = "65px 0px 0px 0px";
    welcomeSliderImg.style.position = "relative";
    welcomeSliderImg.style.right = "0px";
  }
}

function activeSlide(n) {
  slides.forEach((element) => {
    element.classList.remove("active");
  });
  slides[n].classList.add("active");
}
function activeDot(num) {
  dots.forEach((element) => {
    element.classList.remove("activeDot");
  });
  dots[num].classList.add("activeDot");
}
function prepareCurrentSlide(slideInd) {
  activeSlide(slideInd);
  activeDot(slideInd);
  currentNum.innerHTML = `0${slideInd + 1} `;
}

function nextSlide() {
  if (index === slides.length - 1) {
    index = 0;
    prepareCurrentSlide(index);
  } else {
    index++;
    prepareCurrentSlide(index);
  }
}

function prevSlide() {
  if (index === 0) {
    index = slides.length - 1;
    prepareCurrentSlide(index);
  } else {
    index--;
    prepareCurrentSlide(index);
  }
}

function nextVideo() {
  if (videoIndex === videoDots.length - 1) {
    videoIndex = 0;
    prepareCurrentVideo(videoIndex);
  } else {
    videoIndex++;
    prepareCurrentVideo(videoIndex);
  }
}

function prevVideo() {
  if (videoIndex === 0) {
    videoIndex = videoDots.length - 1;
    prepareCurrentVideo(videoIndex);
  } else {
    videoIndex--;
    prepareCurrentVideo(videoIndex);
  }
}

function prepareCurrentVideo(index) {
  setCurrentVideoAttributes(mainVideo, index);
  setCurrentVideoAttributes(smallVideos[0], index);
  setCurrentVideoAttributes(smallVideos[1], index + 1);
  setCurrentVideoAttributes(smallVideos[2], index + 2);
  activeVideoDot(index);
}
function setCurrentVideoAttributes(video, index) {
  if (index > videoDots.length - 1) index = index - videoDots.length;
  video.setAttribute("src", `assets/video/video${index}.mp4`);
  video.setAttribute("poster", `assets/video/poster${index}.jpg`);
}

prepareCurrentVideo(videoIndex);
function activeVideoDot(n) {
  videoDots.forEach((element) => {
    element.classList.remove("active-video-dot");
  });
  videoDots[n].classList.add("active-video-dot");
}
let ownAssessment = `
`;
console.log(ownAssessment);
