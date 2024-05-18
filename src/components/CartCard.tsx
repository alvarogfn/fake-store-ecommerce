import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Context, ContextType } from "../Context";
import { Product } from "../models/Product";
import CartFooter from "./CartFooter";
import CartHeader from "./CartHeader";
import CartProduct from "./CartProduct";
import Loading from "./Loading";

const slideDown = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const slideTop = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const Container = styled("section")<{ isVisible: boolean }>`
  display: ${(props) => (props.isVisible ? "block" : "none")};

  background-color: #ffffff;
  box-shadow: 2px 2px 2px #00000024;

  min-width: 300px;
  max-width: 600px;
  width: 100vw;

  z-index: 2;

  position: absolute;
  right: 20px;
  top: 60px;

  animation: ${slideDown} 300ms ease-in-out forwards;
  opacity: 0;

  &::before {
    content: "";

    position: absolute;

    display: block;

    border: 15px solid transparent;
    border-bottom: 15px solid white;

    animation: ${slideTop} 300ms 100ms ease-in-out forwards;
    opacity: 0;

    top: -30px;
    right: 10px;
  }
`;

const CartContentList = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  padding: 5px 20px;
`;

const Empty = styled.p`
  padding: 20px;

  font-weight: 300;
  font-size: 0.8rem;

  text-align: center;
`;

interface props {
  isVisible: boolean;
}

export default function CartCard(props: props) {
  const { cart, getProductById } = React.useContext(Context) as ContextType;

  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [cartSize, setCartSize] = React.useState<number>(0);
  const [products, setProducts] = React.useState<
    { product: Product; amount: number }[]
  >([]);

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function fetchAllCartData() {
      setLoading(true);
      const products = await Promise.all(
        cart.map(async (cartItem) => {
          const product = await getProductById(cartItem.productId);
          const amount = cartItem.amount;
          return { product, amount };
        })
      );

      setProducts(products);
    }

    fetchAllCartData().finally(() => {
      setLoading(false);
    });
  }, [cart, getProductById]);

  React.useEffect(() => {
    const cartPrice = products.reduce((acc, cart) => {
      return acc + cart.product.price * cart.amount;
    }, 0);

    setTotalPrice(cartPrice);
  }, [products, setTotalPrice]);

  React.useEffect(() => {
    const cartSize = products.reduce((acc, cart) => {
      return acc + cart.amount;
    }, 0);

    setCartSize(cartSize);
  }, [products, setCartSize]);

  return (
    <Container {...props}>
      {products.length > 0 ? (
        <>
          <CartHeader cartSize={cartSize} />
          {loading ? (
            <Loading />
          ) : (
            <CartContentList>
              {products.map(({ product, amount }) => {
                return (
                  <li key={product.id}>
                    <CartProduct product={product} amount={amount} />
                  </li>
                );
              })}
            </CartContentList>
          )}
          <CartFooter price={totalPrice} />{" "}
        </>
      ) : (
        <Empty>There is nothing, what about add something?</Empty>
      )}
    </Container>
  );
}
