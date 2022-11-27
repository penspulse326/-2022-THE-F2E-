import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import styled from "styled-components";
import { Worker1, Worker2, Worker3, Worker4 } from "../components/Workers";
import StartHint from "../components/StartHint";

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(true);
  const [isClick, setIsClick] = useState(false);
  const titleRef = useRef(null);
  const tl = useRef(null);

  useLayoutEffect(() => {
    if (!isClick) {
      let ctx = gsap.context(() => {
        tl.current = HomeAnimation();
        setIsAnimating(false);
      }, titleRef);

      return () => ctx.revert();
    }
  });

  useEffect(() => {
    return () => {
      setIsAnimating(true);
      setIsClick(false);
    };
  }, []);

  const handleClick = () => {
    if (!isAnimating) setIsClick(true);
  };

  return (
    <HomeWrapper className="home" ref={titleRef} onClick={() => handleClick()}>
      {isClick ? (
        <StartHint />
      ) : (
        <>
          <Title className="title" />
          <Start className="start">任意點擊開始</Start>
          <WorkerHome1 className="worker1" />
          <WorkerHome2 className="worker2" />
          <WorkerHome3 className="worker3" />
          <WorkerHome4 className="worker4" />
        </>
      )}
    </HomeWrapper>
  );
}

function HomeAnimation() {
  gsap
    .timeline()
    .from(".title", {
      yPercent: "-500",
      duration: 2,
      autoAlpha: 0,
    })
    .from(".start", {
      autoAlpha: 0,
      duration: 0.8,
      yoyo: true,
      repeat: -1,
    })
    .to(
      ".worker1",
      {
        left: "100px",
        top: "524px",
        duration: 0.8,
      },
      "<"
    )
    .to(
      ".worker2",
      {
        left: "-168px",
        top: "-120px",
        duration: 0.8,
      },
      "<"
    )
    .to(
      ".worker3",
      {
        left: "1630px",
        top: "-180px",
        duration: 0.8,
      },
      "<"
    )
    .to(
      ".worker4",
      {
        left: "1200px",
        top: "600px",
        duration: 0.8,
      },
      "<"
    );
}

const HomeWrapper = styled.div`
  overflow: hidden;
`;

const Title = styled.div`
  position: absolute;
  width: 1113px;
  height: 181px;
  left: 403px;
  top: 310px;
  background-image: url("./images/Title.png");
  background-repeat: no-repeat;
`;

const Start = styled.div`
  position: absolute;
  height: 60px;
  width: 373px;
  left: 773px;
  top: 540px;

  font-family: "Noto Sans TC";
  font-style: normal;
  font-weight: 900;
  font-size: 32px;
  line-height: 60px;
  letter-spacing: 14.5px;
  text-align: center;
  color: #ffffff;
  -webkit-text-stroke: 2px #8e7e74;
`;

const WorkerHome1 = styled(Worker1)`
  position: fixed;
  left: 0px;
  top: 956px;
  transform: rotate(21.37deg) scale(1.1);
`;

const WorkerHome2 = styled(Worker2)`
  position: fixed;
  left: -380px;
  top: -200px;
  transform: rotate(108.58deg) scale(0.9);
`;

const WorkerHome3 = styled(Worker3)`
  position: fixed;
  left: 1900px;
  top: -250px;
  transform: scale(0.9) rotate(-124.58deg);
`;

const WorkerHome4 = styled(Worker4)`
  position: fixed;
  left: 1213px;
  top: 970px;
  transform: rotate(-16.05deg) scale(1.1);
`;
