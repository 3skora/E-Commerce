import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
export default function Product({ data }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://source.unsplash.com/KwfbQbg7WsA"
        title="cart"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data?.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {data?.price}$
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data?.description}
        </Typography>
      </CardContent>
      {/* <CardActions> */}
      <div className="mb-3">
        <Button
          size="medium"
          variant="contained"
          endIcon={<AddShoppingCartIcon />}
        >
          Add to cart
        </Button>
      </div>
      {/* </CardActions> */}
    </Card>
  );
}
