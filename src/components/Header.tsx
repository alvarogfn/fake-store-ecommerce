import React from "react";
import styled from "styled-components";
import Cart from "./Cart";
import searchSvg from "../assets/search.svg";

const ShopHeader = styled.header`
  width: 100%;
  background-color: #000000;
`;

const Content = styled.div`
  display: grid;

  grid-template-columns: 2fr 1fr;
  grid-template-rows: 50px 50px;

  justify-content: space-between;

  max-width: 1500px;

  margin: 0 auto;
  padding: 20px;

  column-gap: 10px;
  row-gap: 20px;

  @media screen and (min-width: 780px) {
    grid-template-columns: 1fr 8fr 1fr;
    grid-template-rows: 1fr;
    column-gap: 40px;
  }
`;

const Title = styled.h1`
  grid-column: 1 / 2;
  grid-row: 1 / 2;

  font-family: "Righteous", cursive;
  font-weight: 900;
  font-size: 2.5rem;

  color: #ffffff;

  padding: 0 5px;
  @media screen and (min-width: 780px) {
    grid-column: 1 / 2;
    grid-row: initial;
    padding: 0 30px;
  }
`;

const SearchBar = styled.input`
  grid-column: 1 / 3;
  grid-row: 2 / 3;

  justify-self: center;

  background-color: #ffffff;
  background-image: url(${searchSvg});
  background-repeat: no-repeat;
  background-position: 97.5% center;
  background-size: 0px 0px;

  max-width: 700px;
  width: 100%;
  height: 100%;

  padding: 10px;

  transition: 200ms;

  @media screen and (min-width: 780px) {
    grid-column: 2 / 3;
    grid-row: initial;
  }

  &:focus {
    background-size: 20px 20px;
  }
`;

const CartContainer = styled.div`
  justify-self: end;
  grid-column: 2 / 3;
  grid-row: 1 / 2;

  @media screen and (min-width: 780px) {
    grid-column: 3 / 4;
    grid-row: initial;
  }
`;

export default function Header() {
  return (
    <ShopHeader>
      <Content>
        <Title>Shop</Title>
        <SearchBar placeholder="O que você está procurando?"></SearchBar>
        <CartContainer>
          <Cart></Cart>
        </CartContainer>
      </Content>
    </ShopHeader>
  );
}
