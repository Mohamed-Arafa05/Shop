import React, { useEffect, useState } from "react";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import axios from "axios";

const Footer = () => (
  <footer className="bg-black text-white text-center py-12 mt-8">
    <div className="flex justify-center items-center gap-4 mb-2">
      <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer">
        <FaTiktok className="text-2xl hover:text-gray-400 transition duration-300" />
      </a>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
        <FaInstagram className="text-2xl hover:text-gray-400 transition duration-300" />
      </a>
    </div>
    <p className="text-lg">Kracked Studios</p>
  </footer>
);

const Prodict = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const userId = 1;

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products?limit=8")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const addToCart = async (product) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const userData = response.data;
      let updatedCart = userData.cart || [];

      const existingItem = updatedCart.find((item) => item.id === product.id);
      if (existingItem) {
        updatedCart = updatedCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1, total: item.price * (item.quantity + 1) }
            : item
        );
      } else {
        updatedCart.push({ ...product, quantity: 1, total: product.price });
      }

      await axios.patch(`http://localhost:3000/users/${userId}`, { cart: updatedCart });
      alert(`${product.title} added to cart!`);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="text-center text-lg">Loading products.</p>;

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="mb-6 flex justify-center">
          <Input
            type="text"
            placeholder="Search for a product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card key={product.id} className="shadow-lg relative h-[350px] flex flex-col justify-between">
                <CardHeader className="flex justify-center h-[150px]">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-32 h-full object-contain"
                  />
                </CardHeader>
                <CardBody className="flex-grow">
                  <Typography variant="h5" className="font-bold line-clamp-2">
                    {product.title}
                  </Typography>
                  <Typography color="blue-gray" className="mt-2">
                    ${product.price}
                  </Typography>
                </CardBody>
                <CardFooter className="absolute bottom-4 left-0 right-0 px-4">
                  <Button color="blue" className="w-full" onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p className="text-center text-lg col-span-4">No prodict found</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Prodict;
