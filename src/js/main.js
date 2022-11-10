import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);
const timeline = gsap.timeline();

const gems = document.querySelectorAll(".gem");

const randomX = random(1, 10);
const randomY = random(1, 10);
const randomDelay = random(0, 1);
const randomTime = random(2, 4);
const randomAngle = random(-15, 15);

gems.forEach((can) => {
  gsap.set(can, {
    x: randomX(-1),
    y: randomX(1),
    rotation: randomAngle(-1),
  });

  moveX(can, 1);
  moveY(can, -1);
  rotate(can, 1);
});

function rotate(target, direction) {
  gsap.to(target, randomTime(), {
    rotation: randomAngle(direction),
    delay: randomDelay(),
    ease: gsap.easeInOut,
    onComplete: rotate,
    onCompleteParams: [target, direction * -1],
  });
}

function moveX(target, direction) {
  gsap.to(target, randomTime(), {
    x: randomX(direction),
    ease: gsap.easeInOut,
    onComplete: moveX,
    onCompleteParams: [target, direction * -1],
  });
}

function moveY(target, direction) {
  gsap.to(target, randomTime(), {
    y: randomY(direction),
    ease: gsap.easeInOut,
    onComplete: moveY,
    onCompleteParams: [target, direction * -1],
  });
}

function random(min, max) {
  const delta = max - min;
  return (direction = 1) => (min + delta * Math.random()) * direction;
}
