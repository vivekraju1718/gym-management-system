import { useState } from "react";
import HomeCategories from "./HomeCategories";
import CategoryProducts from "./CategoryProducts";

export default function Storepage() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <HomeCategories className="gym-section" onSelect={setSelected} />
      <CategoryProducts className="gym-section" selected={selected} />
    </>
  );
}
