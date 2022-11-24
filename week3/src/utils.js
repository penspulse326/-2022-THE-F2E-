import { gsap } from "gsap";

export function pageTransition(el, navigate, url) {
  const tl = gsap.timeline();
  tl.to(el, {
    duration: 2,
    autoAlpha: 0,
  }).to(el, {
    duration: 2,
    autoAlpha: 1,
  });
  setTimeout(() => {
    navigate(url);
  }, 2000);
}
