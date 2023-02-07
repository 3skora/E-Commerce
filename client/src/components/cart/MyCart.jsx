import { Button, Container, Grid } from "@mui/material";
import React from "react";
import CartItem from "./CartItem.jsx";

export default function MyCart() {
  //   const [allProducts, setAllProducts] = useState();

  //   useEffect(() => {
  //     async function fetchData() {
  //       const res = await getAllProducts();
  //       setAllProducts(res?.data);
  //     }
  //     fetchData();
  //   }, []);

  return (
    <>
      <Container maxWidth="xl">
        <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <CartItem />
          <CartItem />

          {/* {allProducts?.map((product) => {
            return (
              <React.Fragment key={product._id}>
                <Grid item xs={3}>
                  <Product data={product} />
                </Grid>
              </React.Fragment>
            );
          })} */}
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
