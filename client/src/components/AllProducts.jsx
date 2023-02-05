import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Product from "./Product.jsx";

function AllProducts() {
  return (
    <div className="mt-4">
      <Container maxWidth="xl">
        <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={3}>
            <Product />
          </Grid>
          <Grid item xs={3}>
            <Product />
          </Grid>
          <Grid item xs={3}>
            <Product />
          </Grid>
          <Grid item xs={3}>
            <Product />
          </Grid>
          <Grid item xs={3}>
            <Product />
          </Grid>
          <Grid item xs={3}>
            <Product />
          </Grid>
          <Grid item xs={3}>
            <Product />
          </Grid>
          <Grid item xs={3}>
            <Product />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default AllProducts;
