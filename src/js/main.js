import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const timeline = gsap.timeline();

timeline.fromTo(".section1", { x: -500 }, { x: 0, width: "100%", duration: 1 });

timeline.fromTo(".title", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 });

timeline.fromTo(".navbar", { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 });
