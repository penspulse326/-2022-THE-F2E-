import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);
const tl = gsap.timeline();

tl.from(".title", {
  autoAlpha: 0,
  duration: 2,
});

tl.fromTo(
  ".handwrite svg path",
  {
    strokeDasharray: 3000,
    strokeDashoffset: 3000,
  },
  {
    strokeDasharray: 3000,
    strokeDashoffset: 0,
    duration: 2,
  }
);

// gem fade in
const gems = document.querySelectorAll(".gem");
tl.from(gems, {
  yPercent: 100,
  autoAlpha: 0,
  ease: "back",
  duration: 2,
  onComplete: () => {
    floating(gems);
  },
});

const stars = document.querySelectorAll(".star");
stars.forEach((star) => {
  gsap.to(star, {
    autoAlpha: 1,
    duration: gsap.utils.random(0.5, 1.5),
    repeat: -1,
    yoyo: true,
  });
});

const tl1 = gsap.timeline({
  scrollTrigger: {
    trigger: ".section2", // 決定scrolltrigger要以哪一個元素作為觸發基準點
    markers: true, // 開啟start & end標記點，單純方便瀏覽動畫開始與結束點
    start: "top 100%", // 決定動畫開始點的位置
    end: "top 0%", // 決定動畫結束點的位置
    scrub: true, //重要！開啟scrub來決定動畫播放是否依賴視窗滾動

    onEnter: () => setNavColor("white"),
    onEnterBack: () => {
      setPosition(true);
      setNavColor("white");
    },
    onLeaveBack: () => {
      setNavColor("#00162A");
    },
  },
});

tl1.to(".mask-inner div", {
  width: 0,
  height: 0,
  onComplete: () => setPosition(false),
});

const setNavColor = (color) => {
  gsap.set("nav", {
    color,
  });
};

const setPosition = (status) => {
  gsap.set(".gem, .star, .section1", {
    position: status ? "fixed" : "absolute",
  });
};

const floating = function (elements) {
  elements.forEach((element) => {
    gsap.to(element, {
      y: gsap.utils.random([-35, -30, -25, 25, 30, 35]),
      duration: gsap.utils.random(1, 2),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });
};
