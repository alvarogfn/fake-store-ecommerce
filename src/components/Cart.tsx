import React from "react";
import styled from "styled-components";
import { Context, ContextType } from "../Context";
import CartButton from "./CartButton";
import CartCard from "./CartCard";

const Container = styled.section`
  width: 120px;
  height: 100%;
  position: relative;
`;

export default function Cart() {
  const [cartVisibility, setCartVisibility] = React.useState<boolean>(false);
  const { addItemToCart } = React.useContext(Context) as ContextType;

  React.useEffect(() => {
    setCartVisibility(true);
  }, [addItemToCart]);

  return (
    <Container>
      <CartButton onClick={() => setCartVisibility((last) => !last)} />
      <CartCard isVisible={cartVisibility} />
    </Container>
  );
}
