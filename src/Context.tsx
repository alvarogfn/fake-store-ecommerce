import React from "react";
import { Cart } from "./models/Cart";
import { Product } from "./models/Product";

export interface ContextType {
  getProducts: (category?: string) => Promise<Product[]>;
  addItemToCart: (productid: number) => boolean;
  getAllCategories: () => Promise<string[]>;
  getProductById: (productId: number) => Promise<Product>;
  removeCartItem: (productId: number) => boolean;
  purchase: () => boolean;
  cart: Cart[];
}

export const Context = React.createContext<ContextType | null>(null);

export function ContextWrapper({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<Cart[]>(() => {
    return JSON.parse(localStorage.getItem("cart") ?? "[]");
  });

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  async function getProducts(category?: string): Promise<Product[]> {
    let response;
    if (category === undefined)
      response = await fetch("https://fakestoreapi.com/products");
    else
      response = await fetch(
        `https://fakestoreapi.com/products/category/${category}`
      );
    if (response.status !== 200) throw new Error("Not found");
    const json: Product[] = await response.json();

    return json;
  }

  async function getAllCategories() {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    if (response.status !== 200) throw new Error("Not found");
    const json: string[] = await response.json();
    return json;
  }

  function addItemToCart(productId: number) {
    setCart((last) => {
      const lastIndex = last.findIndex((cart) => cart.productId === productId);

      let newList = [];

      if (lastIndex === -1) {
        newList = [...last, { productId, amount: 1 }];
        return newList;
      }

      newList = last.map((item, index) => {
        if (index !== lastIndex) return item;
        return { productId: item.productId, amount: item.amount + 1 };
      });

      return newList;
    });
    return true;
  }

  async function getProductById(productId: number) {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );

    if (response.status !== 200) throw new Error("Not found");
    const json: Product = await response.json();
    return json;
  }

  function removeCartItem(productId: number): boolean {
    setCart((last) => {
      return last.filter((cartItem) => cartItem.productId !== productId);
    });
    return true;
  }

  function purchase(): boolean {
    setCart([]);

    return true;
  }

  const storage = {
    getProducts,
    getAllCategories,
    addItemToCart,
    getProductById,
    removeCartItem,
    cart,
    purchase,
  };
  return <Context.Provider value={storage}>{children}</Context.Provider>;
}
