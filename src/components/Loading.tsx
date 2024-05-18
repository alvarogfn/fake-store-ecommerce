import React from "react";
import styled, { keyframes } from "styled-components";

const loading = keyframes`  
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(90deg);
    border-radius: 50%;
  }
  100% {
    transform: rotate(180deg);
    border-radius: 0%;
  }
`;

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  width: 70px;
  height: 70px;

  margin: 0 auto;
`;

const Square = styled.div`
  width: 30px;
  height: 30px;

  background-color: #012030;
  animation: ${loading} 1s ease-in-out infinite;
`;

export default function Loading() {
  return (
    <Container>
      <Square></Square>
    </Container>
  );
}
