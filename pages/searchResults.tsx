import { useState } from "react";
import Categories from "../components/Categories/Categories";
import ProductCard from "../components/ProductCard/ProductCard";
import SearchBar from "../components/SearchBar/searchBar";
import FilterIcon from "../assets/filter.svg";
import CloseIcon from "../assets/x.svg";

const SearchResults = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);

  function openCategories() {
    setIsCategoriesOpen(!isCategoriesOpen);
  }

  let amountOfProducts = 1094;

  return (
    <div className="font-nunito bg-info flex flex-col items-center justify-center w-full m-0 p-0">
      <div className="flex flex-row items-center justify-center w-full lg:justify-around">
        <SearchBar />
        <button
          onClick={openCategories}
          className="lg:hidden w-10 h-10 mx-2 flex justify-center items-center bg-lightRed rounded-md"
        >
          {!isCategoriesOpen ? (
            <FilterIcon />
          ) : (
            <CloseIcon className="text-info" />
          )}
        </button>
        <div className="max-lg:hidden">
          <Categories />
        </div>
      </div>
      {isCategoriesOpen ? <Categories /> : false}
      <div className="flex items-baseline flex-col lg:w-[80%] lg:mt-5 lg:justify-between lg:flex-row text-primary py-2">
        <h2 className="text-3xl py-2">Hyr prylarna av andra</h2>
        <p>
          Visar<span className="p-1 font-bold">{amountOfProducts}</span>prylar
        </p>
      </div>
      <div className="flex justify-center max-md:flex-col flex-wrap w-full">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
};

export default SearchResults;
