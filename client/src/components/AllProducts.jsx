import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Product from "./Product.jsx";
import { getAllProducts } from "../APIs/productAPIs.js";

function AllProducts() {
  const [allProducts, setAllProducts] = useState();

  useEffect(() => {
    async function fetchData() {
      const res = await getAllProducts();
      setAllProducts(res?.data);
    }
    fetchData();
  }, []);

  return (
    <div className="mt-4">
      <Container maxWidth="xl">
        <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {allProducts?.map((product) => {
            return (
              <React.Fragment key={product._id}>
                <Grid item xs={3}>
                  <Product data={product} />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AllProducts;
