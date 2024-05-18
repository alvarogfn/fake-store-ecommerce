import React from "react";
import { ContextWrapper } from "./Context";
import "./App.css";
import Header from "./components/Header";
import styled from "styled-components";
import Products from "./components/Products";

const Container = styled.main`
  max-width: 1400px;
  width: calc(100vw - 20px);
  min-width: 300px;
  margin: 0 auto;
`;

function App() {
  return (
    <ContextWrapper>
      <Header></Header>
      <Container>
        <Products></Products>
      </Container>
    </ContextWrapper>
  );
}

export default App;
