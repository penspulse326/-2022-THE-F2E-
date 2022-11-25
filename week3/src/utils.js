import { gsap } from "gsap";
import styled from "styled-components";

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

export const Mark = (text) => <MarkedText>{text}</MarkedText>;

const MarkedText = styled.span`
  color: ${(props) => props.theme.colors.primary};
`;
