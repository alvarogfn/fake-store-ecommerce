import React from "react";
import styled from "styled-components";

const Container = styled("section")<{ visible: boolean }>`
  display: ${(props) => (props.visible ? "block" : "none")};
  position: absolute;
  bottom: 20px;
  right: 20px;

  padding: 10px;

  background-color: #13678a;
  color: #ffffff;
`;

export default function SnackBar() {
  return <Container visible={true}>SnackBar</Container>;
}
