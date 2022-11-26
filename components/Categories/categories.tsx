import { useState } from "react";
import Category from "./Category";

const Categories = () => {
  const categories = [
    { category: "Allt" },
    { category: "Verktyg" },
    { category: "Sport" },
    { category: "Hem" },
    { category: "Friluftsliv" },
    { category: "Övrigt" },
    { category: "Sport" },
  ];

  return (
    <div className="flex flex-col w-96 md:w-full">
      <div className="flex items-center justify-center lg:hidden ">
        <p>Filter</p>
        <div className="ml-3 bg-veryDarkBlue h-0.5 w-[70%] opacity-20"></div>
      </div>
      <ul className="flex-wrap flex justify-center flex-row ml-4">
        {categories.map((category, i) => {
          return (
            <Category
              key={i}
              category={category.category}
              // isCategoryActive={isCategoryActive}
              // setIsCategoryActive={setIsCategoryActive}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
