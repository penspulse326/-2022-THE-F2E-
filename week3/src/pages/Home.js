import styled from "styled-components";
import { gsap } from "gsap";
import { useRef, useLayoutEffect } from "react";

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
`;

export default function Home() {
  const titleRef = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".title", {
        rotation: "+=360",
      });
    }, titleRef.current);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <HomeWrapper>
      <div className="title" ref={titleRef}>
        <Title></Title>
      </div>
    </HomeWrapper>
  );
}
