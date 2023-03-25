import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { TextPlugin } from "gsap/dist/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// loading
Typing(".loadText", "Loading...", 5);

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
const optionBox = document.querySelector(".jumbo-option");
const optionItem = document.querySelector(".option-items");
const login = document.querySelector("#option-login");
const signup = document.querySelector("#option-signup");

optionItem.addEventListener("mouseover", (e) => {
  if (e.target === login || e.target === signup) {
    let another = e.target === login ? signup : login;
    optionBox.style.alignItems = e.target === login ? "flex-start" : "flex-end";
    blinkTween.kill();
    e.target.style.color = "#B82A06";
    e.target.style.opacity = 1;
    another.style.color = "white";
    another.style.opacity = 1;
    blinkTween = Blink(e.target);
  }
});

//title
// const jumbo = document.querySelector(".jumbotron");
// gsap.from(jumbo, {
//   yPercent: 150,
//   ease: "none",
//   duration: 3,
// });

//manga
const frame1 = document.querySelector(".frame1");
const frame2 = document.querySelector(".frame2");
const frame3 = document.querySelector(".frame3");

const trigger = (element) => ({
  scrollTrigger: {
    trigger: element,
    markers: true,
    start: "top 80%",
    end: "top 10%",
    scrub: true,
  },
});

gsap
  .timeline(trigger(".frame1"))
  .from(".page", {
    xPercent: -100,
  })
  .from(
    ".tank",
    {
      xPercent: -500,
    },
    "<"
  )
  .fromTo(
    ".frame1 .frame-text",
    {
      yPercent: 100,
      autoAlpha: 0.5,
    },
    {
      yPercent: -400,
      autoAlpha: 1,
    }
  );
Typing(".frame1 .dialog-text", "I'm cool !", 2);

gsap
  .timeline(trigger(".frame2"))
  .from(".soldier-call", {
    xPercent: 300,
    yPercent: 300,
  })
  .from(".soldier-dialog", {
    scale: 0,
    transformOrigin: "right bottom",
  })
  .fromTo(
    ".frame2 .frame-text",
    {
      yPercent: 100,
      autoAlpha: 0,
    },
    {
      yPercent: -400,
      autoAlpha: 1,
    }
  );

Typing(".frame2 .dialog-text", "!@#$%...", 2);

gsap
  .timeline(trigger(".frame3"))
  .from(".frame3", {
    xPercent: -100,
  })
  .fromTo(
    ".frame3 .frame-text",
    {
      yPercent: 100,
      autoAlpha: 0,
    },
    {
      yPercent: -400,
      autoAlpha: 1,
    }
  );

//diamond
gsap.fromTo(
  ".diamond-lg img",
  {
    xPercent: "1000",
    ease: "none",
    zIndex: 99,
  },
  {
    xPercent: "-1000",
    ease: "none",
    duration: 1.5,
    repeat: -1,
    zIndex: 99,
  }
);

gsap.fromTo(
  ".diamond-md",
  {
    xPercent: "100",
    ease: "none",
  },
  {
    xPercent: "-100",
    ease: "none",
    duration: 3,
    repeat: -1,
  }
);

gsap.fromTo(
  ".diamond-sm",
  {
    xPercent: "100",
    ease: "none",
  },
  {
    xPercent: "-100",
    ease: "none",
    duration: 5,
    repeat: -1,
  }
);

function Blink(element) {
  return gsap.fromTo(
    element,
    {
      autoAlpha: 1.0,
    },
    {
      autoAlpha: 0.1,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
    }
  );
}

function Typing(element, text, time) {
  gsap.to(element, {
    text: text,
    duration: time,
    repeat: -1,
  });
}
