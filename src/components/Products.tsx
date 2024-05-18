import React from "react";
import { Context, ContextType } from "../Context";
import ProductList from "./ProductList";

export default function Products() {
  const { getAllCategories } = React.useContext(Context) as ContextType;
  const [categories, setCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    getAllCategories().then((r) => setCategories(r));
  }, []);

  return (
    <section>
      {categories.map((category, index) => {
        return <ProductList category={category} key={index} />;
      })}
    </section>
  );
}
