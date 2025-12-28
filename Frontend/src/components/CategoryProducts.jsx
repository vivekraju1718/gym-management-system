import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/cart-context";

export default function CategoryProducts({ selected }) {
  const [products, setProducts] = useState([]);
  const [qty, setQty] = useState({});
  const navigate = useNavigate();

const { addToCart } = useCart();
  useEffect(() => {
    const url = selected ? `/products/category/${selected}` : `/products`;
    apiClient.get(url).then(res => setProducts(res.data));
  }, [selected]);

  const inc = (id) =>
    setQty(p => ({ ...p, [id]: (p[id] || 1) + 1 }));

  const dec = (id) =>
    setQty(p => ({ ...p, [id]: Math.max(1, (p[id] || 1) - 1) }));

  return (
    <div className="gym-section">
      <h2 className="gym-heading text-2xl mb-6 text-center">Products</h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6">
        {products.map(p => (
          <div
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="gym-card cursor-pointer hover:scale-105 transition"
          >
            <img src={p.imageUrl} className="w-full h-40 object-contain mb-3" />
            <h3 className="gym-heading text-sm">{p.name}</h3>
            <p className="gym-text">{p.description}</p>

            <div className="flex justify-between items-center mt-3">
              <p className="gym-price">₹{p.price}</p>

              {/* prevent click bubbling on qty buttons */}
              <div
                className="flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button onClick={() => dec(p.id)} className="px-2 py-1 bg-gray-200 rounded">−</button>
                <span>{qty[p.id] || 1}</span>
                <button onClick={() => inc(p.id)} className="px-2 py-1 bg-gray-200 rounded">+</button>
              </div>
            </div>

            {/* prevent navigation when clicking Add to Cart */}
           <button
  onClick={(e) => {
    e.stopPropagation();
    addToCart(p, qty[p.id] || 1);
  }}
  className="gym-btn w-full mt-3"
>
  Add to Cart
</button>
          </div>
        ))}
      </div>
    </div>
  );
}
