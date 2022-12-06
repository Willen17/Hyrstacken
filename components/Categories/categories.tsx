import { useState } from "react";
import Category from "./Category";

type categoriesProps = {
  categories: {
    id: string;
    name: string;
  }[];
};

const Categories = ({ categories }: categoriesProps) => {
  return (
      <ul className="flex-wrap gap-3 flex justify-start min-[1360px]:justify-end flex-row h-[100%]">
        {categories.map((category) => (
          <Category key={category.id} category={category.name} />
        ))}
      </ul>
  );
};

export default Categories;
