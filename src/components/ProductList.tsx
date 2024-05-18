import React from "react";
import styled from "styled-components";
import { Context, ContextType } from "../Context";
import { Product } from "../models/Product";
import Loading from "./Loading";
import ProductCard from "./ProductCard";

const Container = styled.section``;

const CategoryTitle = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  text-align: center;
  padding: 50px 0px 10px;
  text-transform: capitalize;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  justify-content: space-evenly;
  gap: 20px;
  padding: 20px;
`;

interface props {
  category?: string;
}

export default function ProductList({ category }: props) {
  const { getProducts } = React.useContext(Context) as ContextType;

  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    getProducts(category)
      .then((r) => setProducts(r))
      .finally(() => setLoading(false));
  }, [setProducts]);

  return (
    <Container>
      <CategoryTitle>{category}</CategoryTitle>
      {loading ? (
        <Loading></Loading>
      ) : (
        <List>
          {products.map((product, i) => (
            <ProductCard product={product} key={i} />
          ))}
        </List>
      )}
    </Container>
  );
}
