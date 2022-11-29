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
    <div className="flex flex-col w-96 md:w-full">
      <div className="flex items-center justify-center lg:hidden ">
        <p>Filter</p>
        <div className="ml-3 bg-veryDarkBlue h-0.5 w-[70%] opacity-20"></div>
      </div>
      <ul className="flex-wrap flex justify-center flex-row ml-4">
        {categories.map((category) => (
          <Category key={category.id} category={category.name} />
        ))}
      </ul>
    </div>
  );
};

export default Categories;
