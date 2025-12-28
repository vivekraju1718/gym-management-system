import whey from "../assets/stickers/wheyprotein.jpg";
import creatine from "../assets/stickers/creatine.jpg";
import bag from "../assets/stickers/gymbag.jpg";
import bottle from "../assets/stickers/gymbottle.jpg";
import gloves from "../assets/stickers/gymgloves.jpg";
import preworkout from "../assets/stickers/preworkout.jpg";

const categories = [
  { name: "whey", label: "Whey Protein", image: whey },
  { name: "creatine", label: "Creatine", image: creatine },
  { name: "bags", label: "Gym Bags", image: bag },
  { name: "bottles", label: "Gym Bottles", image: bottle },
  { name: "gloves", label: "Gym Gloves", image: gloves },
  { name: "preworkout", label: "Pre Workout", image: preworkout },
];

export default function HomeCategories({ onSelect }) {
  return (
    <div className="gym-section">
      <h2 className="gym-heading text-center text-2xl mb-8">Shop By Category</h2>

      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 px-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => onSelect(cat.name)}
            className="cursor-pointer flex flex-col items-center group"
          >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-400 shadow-lg group-hover:scale-110 transition">
              <img src={cat.image} className="w-full h-full object-cover" />
            </div>
            <p className="gym-text mt-3 font-semibold text-center">{cat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
