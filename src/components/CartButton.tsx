import React from "react";
import styled from "styled-components";
import cartSvg from "../assets/cart.svg";

const Button = styled.button`
  background-color: #13678a;

  display: flex;
  flex-flow: row nowrap;

  justify-content: center;
  gap: 10px;
  align-items: center;

  color: white;
  font-weight: 300;
  cursor: pointer;

  width: 120px;
  height: 100%;
`;

interface props {
  onClick: (event: React.MouseEvent) => void;
}

export default function CartButton({ onClick }: props) {
  return (
    <Button onClick={(event) => onClick(event)}>
      <img src={cartSvg} />
      <p>Cart</p>
    </Button>
  );
}
