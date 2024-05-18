import React from "react";
import styled, { keyframes } from "styled-components";
import { Context, ContextType } from "../Context";
import useFormatMoney from "../hooks/useFormatMoney";
import { Product } from "../models/Product";

interface props {
  product: Product;
}

const appear = keyframes`
  from {
    scale: 0.2;
    opacity: 0;
  }
  to {
    opacity: 1;
    scale: 1;
  }
`;

const Content = styled.section`
  height: 350px;

  display: flex;
  flex-flow: column nowrap;
  overflow: hidden;
  padding: 20px;
  gap: 15px;
  cursor: pointer;

  box-shadow: 3px 3px 3px #38383830;

  background-color: #ffffff;

  position: relative;

  animation: ${appear} 500ms ease-in-out forwards;

  transition: 200ms;

  &:hover {
    transform: translate3d(3px, 3px, 3px);
    box-shadow: 0 0 0 #38383830, inset 0 0 2px #38383830;
  }
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 175px;
  object-fit: contain;
`;

const Title = styled.h1`
  font-size: 0.9rem;
  flex-grow: 1;
  max-height: 230px;
  color: #13678a;
  font-weight: 300;
`;

const Price = styled.p`
  font-size: 1.2rem;
  color: #012030;
  font-weight: bold;
`;

const Button = styled.button`
  bottom: 10px;
  right: 10px;

  background-color: #13678a;
  color: #ffffff;

  height: 40px;
  width: 100px;

  position: absolute;

  cursor: pointer;

  transition: 200ms;

  &:active {
    scale: 0.95;

    background-color: #012030;
  }
`;

export default function ProductCard({ product }: props) {
  const money = useFormatMoney(product.price);
  const { addItemToCart } = React.useContext(Context) as ContextType;

  return (
    <Content>
      <Image src={product.image} alt={product.title} />
      <Title>{product.title}</Title>
      <Price>{money}</Price>
      <Button onClick={() => addItemToCart(product.id)}>Comprar</Button>
    </Content>
  );
}
