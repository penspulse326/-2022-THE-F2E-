import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";

window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("root").style.display = "block";
    document.querySelector(".loading").style.display = "none";
  }, 10);
});

const optionItem = document.querySelector(".option-items");
const optionBox = document.querySelector(".jumbo-option");

optionItem.addEventListener("mouseover", (e) => {
  const login = document.querySelector("#option-login");
  const signup = document.querySelector("#option-signup");
  if (e.target === login) {
    optionBox.style.alignItems = "flex-start";
    login.style.color = "#B82A06";
    signup.style.color = "white";
  }
  if (e.target === signup) {
    optionBox.style.alignItems = "flex-end";
    login.style.color = "white";
    signup.style.color = "#B82A06";
  }
});

gsap.registerPlugin(ScrollTrigger, TextPlugin);

gsap.to(".loadText", {
  text: "Loading...",
  duration: 5,
  repeat: -1,
});
