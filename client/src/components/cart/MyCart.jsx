import { Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { viewMyCart } from "../../APIs/cartAPIs.js";
import CartItem from "./CartItem.jsx";

export default function MyCart() {
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await viewMyCart();
      setCartItems(res?.data?.items);
      setTotalPrice(res?.data?.totalPrice);
    }
    fetchData();
  }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {cartItems?.map((item) => {
            return (
              <React.Fragment key={item.productId._id}>
                <Grid item xs={3}>
                  <CartItem data={item} />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Container>

      <div onClick={() => (window.location.href = "/checkout")}>
        <Button variant="contained" color="primary">
          Order Now
        </Button>
      </div>
    </>
  );
}
