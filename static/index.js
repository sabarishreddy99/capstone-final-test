//---------------------------loading ----------------------------------------

function loadfunc() {
  var h = document.getElementById("loading");
  h.style.display = "none";
}

// -----------------------navbar collapse mobile view  -----------------------------

function openNav() {
  document.getElementById("myNav").style.height = "108%";
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}

// -------------------------------  Type Writer-----------------------------------
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

function introTEXTtypewriting() {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
}

//--------------------------------------- fixed-tops----------------------------------------

//Get the button of back to top
//  var mybutton = document.getElementById("go-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (
    document.body.scrollTop > 120 ||
    document.documentElement.scrollTop > 120
  ) {
    document.getElementById("go-to-top").style.display = "block";
  } else {
    document.getElementById("go-to-top").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  const topsy = document.querySelector("#section1");
  topsy.scrollIntoView({ behavior: "smooth" });
}

//qr code
function on() {
  document.getElementById("overlayqr").style.display = "block";
}

function off() {
  document.getElementById("overlayqr").style.display = "none";
}

//share button

function onshare() {
  document.getElementById("overlayshare").style.display = "block";
}
function offshare() {
  document.getElementById("overlayshare").style.display = "none";
}

// ---------------   Input from camera  -----------------------
var video;
var snap = document.getElementById("snap-img");

var front = true;

var constraints = {
  audio: false,
  video: {
    width: 300,
    height: 300,
    facingMode: "environment",
  },
};

function flipcamera() {
  front = !front;
}

navigator.mediaDevices
  .getUserMedia(constraints)
  .then(function (mediaStream) {
    video = document.querySelector("#user-input-img");
    video.srcObject = mediaStream;
    video.onloadedmetadata = function (e) {
      video.play();
    };
  })
  .catch(function (err) {
    console.log(err.name + ": " + err.message);
  }); // always check for errors at the end.

var canvas = document.getElementById("snap-canvas");
var context = canvas.getContext("2d");
let a;
snap.addEventListener("click", function () {
  context.drawImage(video, 0, 0, 300, 300);
  a = 1;
});

const downloadImg = document.getElementById("download-img");

downloadImg.addEventListener("click", function () {
  //IE/Edge support PNG only
  if (a == 1) {
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(canvas.msToBlob(), "image-captioner.png");
    } else {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.href = canvas.toDataURL();
      a.download = "image-captioner.png";
      a.click();
      document.body.removeChild(a);
    }
  } else {
    alert("Please capture the image and proceed with download.");
  }
});
