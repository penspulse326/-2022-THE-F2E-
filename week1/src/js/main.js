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
    ScrollTrigger.refresh();
  }, 1000);
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

const trigger = (element) => ({
  scrollTrigger: {
    trigger: element,
    start: "top 50%",
    end: "top 15%",
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
  .from(".tree", {
    yPercent: 100,
  })
  .from(".soldier-back", {
    yPercent: 150,
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

//title
// const jumbo = document.querySelector(".jumbotron");
// gsap.from(jumbo, {
//   yPercent: 150,
//   ease: "none",
//   duration: 3,
// });

// hill
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".hill",
      markers: true,
      pin: true,
      scrub: true,
      start: "top -10%",
    },
  })
  .from(".hill", {
    backgroundColor: "black",
  })
  .from(".hill-box", {
    yPercent: 200,
    color: "#FFC612",
  })
  .from(
    ".hill-title",
    {
      border: "4px solid #FFC612",
      onComplete: function () {
        Typing(".hill-subtitle", "UI、前端接力合作，一同產出完整作品。", 2, 0);
      },
    },
    "<"
  )
  .to(
    "#hill-1",
    {
      yPercent: 40,
    },
    "<"
  )
  .to(
    "#hill-2",
    {
      yPercent: 80,
    },
    "<"
  )
  .to(
    "#hill-3",
    {
      yPercent: 80,
    },
    "<"
  );

// game intro
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".game-intro",
      markers: true,
      pin: true,
      scrub: true,
      end: "bottom 0",
    },
  })
  .to(".guide-line", {
    xPercent: -50,
  })
  .to(
    ".week2",
    {
      keyframes: {
        "0%": {
          xPercent: 0,
        },
        "25%": {
          xPercent: -25,
          onComplete: () => {
            gsap.set(".week2 img", { attr: { src: "./src/images/F1.png" } });
          },
        },
        "50%": {
          xPercent: -50,
          onComplete: () => {
            gsap.set(".week2 img", { attr: { src: "./src/images/F2.png" } });
          },
        },
        "75%": {
          xPercent: -75,
          onComplete: () => {
            gsap.set(".week2 img", { attr: { src: "./src/images/F3.png" } });
          },
        },
        "100%": {
          xPercent: -100,
          onComplete: () => {
            gsap.set(".week2 img", { attr: { src: "./src/images/F4.png" } });
          },
        },
      },
    },
    "<"
  )
  .to(".guide-line", {
    keyframes: {
      "0%": {
        xPercent: -50,
      },
      "25%": {
        xPercent: -60,
      },
      "50%": {
        xPercent: -70,
      },
      "75%": {
        xPercent: -92.5,
      },
      "100%": {
        xPercent: -100,
      },
    },
  })
  .to(
    ".week3",
    {
      keyframes: {
        "0%": {
          xPercent: -100,
        },
        "25%": {
          xPercent: -125,
          onComplete: () => {
            gsap.set(".week3 img", { attr: { src: "./src/images/F1.png" } });
          },
        },
        "50%": {
          xPercent: -150,
          onComplete: () => {
            gsap.set(".week3 img", { attr: { src: "./src/images/F2.png" } });
          },
        },
        "75%": {
          xPercent: -175,
          onComplete: () => {
            gsap.set(".week3 img", { attr: { src: "./src/images/F3.png" } });
          },
        },
        "100%": {
          xPercent: -200,
          onComplete: () => {
            gsap.set(".week3 img", { attr: { src: "./src/images/F4.png" } });
          },
        },
      },
    },
    "<"
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

function Typing(element, text, time, repeat = -1) {
  gsap.to(element, {
    text: text,
    duration: time,
    repeat: repeat,
  });
}
