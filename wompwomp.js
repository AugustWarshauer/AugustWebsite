
// function makeStairs(words) {
//     let container = document.getElementsByClassName("stairs");
//     let singlestair = "";
//     let bigsinglestair = "";
//     let ladder = "";
//     for (let i = 0; i < words.length; i++) {
//         singlestair+= `<span class="panel">${words[i]}</span>`;
//     }
//     for (let I = 0; I < words.length; I++) {
//         bigsinglestair = `<div class="stair" style = "position: relative; left: ${0.46*(I)}em;">` + singlestair + '</div>';
//         ladder += bigsinglestair;
//     }

//     console.log(ladder);
//     container.innerHTML = ladder;


// }

// document.addEventListener('DOMContentLoaded', function() {
//     makeStairs(['hello', 'bye', 'hola']);
// });



var panel = document.querySelector('.panel');
var panelHeight = panel.offsetHeight;
document.documentElement.style.setProperty('--panel-height', panelHeight + 'px');









// Line velocity below
console.clear();
const p = noise;
let branches = [];
let animationStarted = false;

class Branch {
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.prevx = x;
    this.prevy = y;
    this.visible = true;
    this.color = color(random(110, 110 + 100), 70, 100, 100);
    this.speed = {
      x: random(-7, 7),
      y: random(-7, 7)
    };
  }
  walls () {
    this.prevx = this.x;
    this.prevy = this.y;
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.visible = false;
    }
  }
  draw () {
    line(this.prevx, this.prevy, this.x, this.y);
  }
  moveNoise () {
    this.speed.x += p.simplex3(this.x * 0.005, this.y * 0.005, millis() * 0.0001) * 2;
    this.speed.y += p.simplex3(this.y * 0.005, this.x * 0.005, millis() * 0.0001) * 2;
    this.x += this.speed.x;
    this.y += this.speed.y;
  }
}

function createBranches (amount) {
  blendMode(BLEND);
  colorMode(RGB);
  branches = [];
  for (let i=0; i<amount; i++) {
    const x = width / 2;
    const y = height / 8;
    branches.push(new Branch(x, y));
  }
}

function goToStep6 () {
  clear();
  createBranches(1000);
  strokeWeight(1);
  stroke(255, 255, 255, 50);
}

function step6 () {
  branches.forEach(branch => {
    if (branch.visible) {
      branch.moveNoise();
      branch.draw();
      branch.walls();
    }
  });
}

function setup () {
  document.body.classList.add('inverted');
  createCanvas(windowWidth, windowHeight*6);
  strokeCap(SQUARE);
  const animationContainer = document.getElementById('animation-container');
  animationContainer.appendChild(canvas);
  setTimeout(() => {
    animationStarted = true;
    goToStep6();
  }, 2000); // Start the animation after 1 second
}

function windowResized () {
  p.seed(random(100));
  resizeCanvas(windowWidth, windowHeight);
  goToStep6();
}

function draw () {
  if (animationStarted) {
    step6();
  }
}



window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var windowHeight = window.innerHeight;
    var bodyHeight = document.body.offsetHeight;

    if (scrollPosition > windowHeight*1) {
        document.body.classList.remove('inverted');
    } else {
        document.body.classList.add('inverted');
    }
});











gsap.set('.cursor-dot', {scale: 0.1});
gsap.set('.cursor-outline', {scale: 0.5});

document.addEventListener("mousemove", updateCursorPosition);
window.addEventListener("scroll", updateCursorPosition);

let xCTo = gsap.quickTo(".cursor-outline", "left", {
  duration: 0.2,
  ease: "power3"
});
let yCTo = gsap.quickTo(".cursor-outline", "top", {
  duration: 0.2,
  ease: "power3"
});

let xDTo = gsap.quickTo(".cursor-dot", "left", {
  duration: 0.6,
  ease: "power3"
});
let yDTo = gsap.quickTo(".cursor-dot", "top", {
  duration: 0.6,
  ease: "power3"
});

let isVisible = false;
let cursorPosition = { left: 0, top: 0 };

function updateCursorPosition(e) {
  if (!isVisible) {
    gsap.set(".cursor-outline, .cursor-dot", { opacity: 1 });
    isVisible = true;
  }

  if (e.type === "mousemove") {
    cursorPosition.left = e.clientX;
    cursorPosition.top = e.clientY;
  }

  const scrollLeft = window.scrollX || document.documentElement.scrollLeft;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  xCTo(cursorPosition.left + scrollLeft);
  yCTo(cursorPosition.top + scrollTop);
  xDTo(cursorPosition.left + scrollLeft);
  yDTo(cursorPosition.top + scrollTop);
}

let targets = gsap.utils.toArray(".target");

let scaleAnim = gsap.timeline({paused: true});

scaleAnim
  .to(".cursor-outline", {
    scale: 1
})
  .to(
    ".cursor-dot",
    {
      scale: 1,
      duration: 0.35
    },
    0
  );

targets.forEach((target) => {
  target.addEventListener("mouseenter", (e) => {
    console.log('play');
    scaleAnim.play();
  });

  target.addEventListener("mouseleave", (e) => {
    console.log('reverse');
    scaleAnim.reverse();
  });
});















document.querySelectorAll('.codedText').forEach(t => {
    const arr1 = t.innerHTML.split('');
    const arr2 = [];
    arr1.forEach((char, i) => arr2[i] = randChar()); //fill arr2 with random characters
    t.onpointerover = () => {
      const tl = gsap.timeline();
      let step = 0;
      tl.fromTo(t, {
        innerHTML: arr2.join(''),
        // background: 'rgb(24,24,24)' 
    },
      {
        duration: arr1.length / 20, //duration based on text length
        ease: 'power4.in',
        delay: 0.1,
        onUpdate: () => {
          const p = Math.floor(tl.progress() * arr1.length); //whole number from 0 - text length
          if (step != p) {//throttle the change of random characters
            step = p;
            arr1.forEach((char, i) => arr2[i] = randChar());
            let pt1 = arr1.join('').substring(p, 0),
            pt2 = arr2.join('').substring(arr2.length - p, 0);
            if (t.classList.contains('fromRight')) {
              pt1 = arr2.join('').substring(arr2.length - p, 0);
              pt2 = arr1.join('').substring(arr1.length - p);
            }
            t.innerHTML = pt1 + pt2; //update text
          }
  
        } });
  
    };
  });
  
  function randChar() {
    let c = "abcdefghijklmnopqrstuvwxyz1234567890!@#$^&*()…æ_+-=;[]/~`";
    c = c[Math.floor(Math.random() * c.length)];
    return Math.random() > 0.5 ? c : c.toUpperCase();
  }
  //# sourceURL=pen.js
      