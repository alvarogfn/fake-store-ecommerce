import React from "react";
import styled from "styled-components";

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px 5px;
  margin-bottom: 20px;
`;

const Size = styled.p`
  font-size: 0.8rem;
  font-weight: 300;
`;

interface props {
  cartSize: number;
}

export default function CartHeader({ cartSize }: props) {
  return (
    <Container>
      <Size>
        You have <strong>{cartSize}</strong>{" "}
        {cartSize > 1 ? "products" : "product"} in your cart
      </Size>
    </Container>
  );
}
