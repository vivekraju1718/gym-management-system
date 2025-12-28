import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useCart } from "../store/cart-context";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

const { addToCart } = useCart();
  useEffect(() => {
    apiClient.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  return (
 <div className="min-h-screen gym-section flex items-center justify-center px-4">
  <div className="max-w-4xl w-full gym-card p-8 grid md:grid-cols-2 gap-8">
        <img src={product.imageUrl} className="w-full h-80 object-contain" />

        <div>
          <h2 className="gym-heading text-2xl mb-3">{product.name}</h2>
          <p className="gym-text mb-3">{product.description}</p>
          <p className="gym-price text-xl mb-4">₹{product.price}</p>

          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="qty-btn">−</button>
            <span className="text-lg">{qty}</span>
            <button onClick={() => setQty(q => q + 1)} className="qty-btn">+</button>
          </div>
<button className="gym-btn w-full" onClick={() => addToCart(product, qty)}>
  Add to Cart
</button>
        </div>
      </div>
    </div>
  );
}
