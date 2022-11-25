import { useState } from "react";
import Categories from "../components/Categories/categories";
import ProductCard from "../components/ProductCard/ProductCard";
import SearchBar from "../components/SearchBar/searchBar";

const SearchResults = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);

  function openCategories() {
    setIsCategoriesOpen(!isCategoriesOpen);
  }

  let amountOfProducts = 1094;
  return (
    <div className="font-nunito bg-info flex items-center flex-col w-screen">
      <div className="flex flex-row">
        <SearchBar />
        <button
          onClick={openCategories}
          className="w-5 h-5 mx-3 bg-veryDarkBlue self-center"
        ></button>
      </div>
      {isCategoriesOpen ? <Categories /> : false}

      <div className="text-primary p-5">
        <h2 className="text-3xl py-2">Hyr prylarna av andra</h2>
        <p>
          Visar<span className="p-1 font-bold">{amountOfProducts}</span>prylar
        </p>
      </div>
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default SearchResults;
