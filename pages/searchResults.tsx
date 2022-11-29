import type { NextPage, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import prisma from "../lib/prisma";
import ProductCard from "../components/ProductCard/ProductCard";
import SearchBar from "../components/SearchBar/searchBar";
import FilterIcon from "../assets/filter.svg";
import CloseIcon from "../assets/x.svg";
import { useState } from "react";
import { string } from "zod";
import Categories from "../components/Categories/categories";

export async function getServerSideProps() {
    const items = await prisma.item.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            picePerDay: true,
            imageUrl: true,
            category: {
                select: { name: true },
            },
        },
    });
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
        },
    });
    return {
        props: {
            items,
            categories,
        },
    };
}

const SearchResults: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ items, categories }) => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);

    function openCategories() {
        setIsCategoriesOpen(!isCategoriesOpen);
    }

    let amountOfProducts = 1094;
    console.log(items);
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
            </div>

            <div className="max-lg:hidden">
                <Categories categories={categories} />
            </div>
            {isCategoriesOpen ? <Categories categories={categories} /> : false}
            <div className="flex items-baseline flex-col lg:w-[80%] lg:mt-5 lg:justify-between lg:flex-row text-primary py-2">
                <h2 className="text-3xl py-2">Hyr prylarna av andra</h2>
                <p>
                    Visar
                    <span className="p-1 font-bold">{amountOfProducts}</span>
                    prylar
                </p>
            </div>
            <div className="flex justify-center max-md:flex-col flex-wrap w-full">
                {items?.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
