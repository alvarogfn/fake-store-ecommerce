import React from "react";
import styled from "styled-components";
import { Context, ContextType } from "../Context";
import { Product } from "../models/Product";
import Loading from "./Loading";
import trash from "../assets/trash.svg";
import useFormatMoney from "../hooks/useFormatMoney";

const Container = styled.section`
  display: grid;
  grid-template-columns: 70px 1fr 70px;
  grid-template-rows: 25px 25px;
  gap: 15px;
`;

const Image = styled.img`
  grid-row: 1 / 3;
  width: 50px;
  height: 50px;
`;

const Title = styled.h1`
  grid-row: 1 / 2;
  font-size: 0.8rem;
  font-weight: 400;
`;

const Info = styled.p`
  grid-row: 2 / 3;
  font-size: 0.9rem;

  display: flex;
  align-items: center;
  flex-flow: row nowrap;
  gap: 5px;
`;

const Amount = styled.span`
  font-size: 0.8em;
`;

const TotalPrice = styled.span`
  font-weight: 900;
`;

const TrashButton = styled.button`
  cursor: pointer;
  width: 70px;
  height: 40px;
  background-color: #f3333a;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: 200ms;

  &:hover {
    background-color: #a1282c;
  }
`;

const TrashImage = styled.img`
  width: 15px;
  height: 15px;
`;

interface props {
  product: Product;
  amount: number;
}

export default function CartProduct({ product, amount }: props) {
  const { removeCartItem } = React.useContext(Context) as ContextType;
  const productPrice = useFormatMoney(product.price);
  const totalPrice = useFormatMoney(amount * product.price);

  return (
    <Container>
      {product ? (
        <>
          <Image src={product.image}></Image>
          <Title>{product.title}</Title>
          <Info>
            <Amount>
              {amount} x {productPrice} =
            </Amount>
            <TotalPrice>{totalPrice}</TotalPrice>
          </Info>
          <TrashButton onClick={() => removeCartItem(product.id)}>
            <TrashImage src={trash}></TrashImage>
          </TrashButton>
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
}
