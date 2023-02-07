import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart, viewMyCart } from "../APIs/cartAPIs.js";

const token = localStorage.getItem("token");

export default function Product({ data }) {
  const [quantity, setQuantity] = React.useState(0);

  React.useEffect(() => {
    async function fetchData() {
      const res = await viewMyCart();
      const cartItems = res?.data?.items;
      for (const item of cartItems) {
        if (item.productId._id == data?._id) {
          setQuantity(item.quantity);
          return;
        }
      }
    }
    fetchData();
  }, []);

  const addToCartBtn = () => {
    return (
      <>
        <div className="mb-3" onClick={handleInc}>
          <Button
            size="medium"
            variant="contained"
            endIcon={<AddShoppingCartIcon />}
          >
            Add to cart
          </Button>
        </div>
      </>
    );
  };

  const quantityBtn = () => {
    return (
      <>
        <div className="mb-3">
          <Button variant="contained" onClick={handleDec}>
            -
          </Button>
          <Typography variant="h6" m={5} component="span">
            {quantity}
          </Typography>
          <Button variant="contained" onClick={handleInc}>
            +
          </Button>
        </div>
      </>
    );
  };

  const handleInc = async () => {
    if (!token) window.location.href = "/login";
    setQuantity(quantity + 1);
    const res = await addToCart(data?._id, quantity + 1);
  };
  const handleDec = async () => {
    quantity > 0 && setQuantity(quantity - 1);
    const res = await addToCart(data?._id, quantity - 1);
  };

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

      {quantity == 0 ? addToCartBtn() : quantityBtn()}
    </Card>
  );
}
