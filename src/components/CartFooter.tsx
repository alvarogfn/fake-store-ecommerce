import React from "react";
import styled from "styled-components";
import { Context, ContextType } from "../Context";
import useFormatMoney from "../hooks/useFormatMoney";

const Container = styled.section`
  background-color: #012030;
  color: #ffffff;

  padding: 10px;

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  margin-top: 20px;
`;

const Value = styled.strong`
  font-size: 1.5em;
  font-weight: 700;
  margin-inline: 5px;
`;

const Price = styled.p`
  font-size: 0.8rem;
  font-weight: 300;
`;

const Buy = styled.button`
  cursor: pointer;
  background-color: #13678a;
  color: #ffffff;

  padding: 10px 40px;
  transition: 200ms;
  &:hover {
    background-color: #0c4963;
  }
`;

interface props {
  price: number;
}

export default function CartFooter({ price }: props) {
  const { purchase } = React.useContext(Context) as ContextType;

  const money = useFormatMoney(price);

  return (
    <Container>
      <Price>
        The products cost
        <Value>{money}</Value>
        in total.
      </Price>
      <Buy onClick={() => purchase()}>TAKE</Buy>
    </Container>
  );
}
