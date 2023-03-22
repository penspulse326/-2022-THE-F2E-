import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// loading
gsap.to(".loadText", {
  text: "Loading...",
  duration: 5,
  repeat: -1,
});

// loading complete
let blinkTween = null;

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("root").style.display = "block";
    document.querySelector(".loading").style.display = "none";
    blinkTween = Blink(login);
  }, 10);
});

// options button event
const optionItem = document.querySelector(".option-items");
const optionBox = document.querySelector(".jumbo-option");
const login = document.querySelector("#option-login");
const signup = document.querySelector("#option-signup");

optionItem.addEventListener("mouseover", (e) => {
  if (e.target === login || signup) {
    const another = e.target === login ? signup : login;
    blinkTween.kill();
    blinkTween = Blink(e.target);
    optionBox.style.alignItems = e.target === login ? "flex-start" : "flex-end";
    e.target.style.color = "#B82A06";
    another.style.color = "white";
    another.style.opacity = 1;
  }
});

function Blink(element) {
  return gsap.fromTo(
    element,
    {
      autoAlpha: 1.0,
    },
    {
      autoAlpha: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
    }
  );
}
