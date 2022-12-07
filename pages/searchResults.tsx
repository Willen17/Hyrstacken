import type { NextPage, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import prisma from "../lib/prisma";
import ProductCard from "../components/ProductCard/ProductCard";
import SearchBar from "../components/SearchBar/searchBar";
import FilterIcon from "../assets/filter.svg";
import CloseIcon from "../assets/x.svg";
import { useEffect, useState } from "react";
import { string, TypeOf } from "zod";
import Categories from "../components/Categories/categories";
import Link from "next/link";
import categories from "../components/Categories/categories";

export async function getServerSideProps() {
    const itemCount = await prisma.item.count();
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
            itemCount,
            categories,
        },
    };
}

const SearchResults: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ items, categories, itemCount }) => {
    const [isCategoriesOpen, setIsCategoriesOpen] = useState<boolean>(false);
    const [itemsArray, setItemsArray] = useState<typeof items | undefined>(
        items
    );

    function openCategories() {
        setIsCategoriesOpen(!isCategoriesOpen);
    }

    const [filterByCategory, setFilterByCategory] = useState({
        Verktyg: false,
        Övrigt: false,
        Sport: false,
        Friluftsliv: false,
        Hem: false,
    });

    const noCategory = Object.values(filterByCategory).every(
        (v) => v === false
    );

    function ItemsCounter() {
        let count = 0;
        for (let item of items) {
            if (noCategory) {
                count = count + 1;
            } else if (
                filterByCategory[
                    item.category.name as keyof typeof filterByCategory
                ]
            ) {
                count = count + 1;
            }
        }
        return count;
    }

    return (
        <div className="flex flex-col items-center min-h-screen p-0 m-0 mx-auto max-w-7xl mt-[100px] max-[800px]:mt-[50px] font-nunito">
            <div className="flex flex-row items-center justify-center w-full lg:justify-around">
                <SearchBar />
                <button
                    onClick={openCategories}
                    className="flex items-center justify-center w-10 h-10 mx-2 rounded-md lg:hidden bg-lightRed"
                >
                    {!isCategoriesOpen ? (
                        <FilterIcon />
                    ) : (
                        <CloseIcon className="text-info" />
                    )}
                </button>
            </div>
            <div className="max-lg:hidden">
                <Categories
                    categories={categories}
                    setFilterByCategory={setFilterByCategory}
                    filterByCategory={filterByCategory}
                />
            </div>
            {isCategoriesOpen ? (
                <div className="lg:hidden">
                    <Categories
                        categories={categories}
                        setFilterByCategory={setFilterByCategory}
                        filterByCategory={filterByCategory}
                    />
                </div>
            ) : (
                false
            )}
            <div className="flex items-baseline flex-col lg:w-[80%] lg:mt-5 lg:justify-between lg:flex-row text-primary py-2">
                <h2 className="py-2 text-3xl">Hyr prylarna av andra</h2>
                <p>
                    Visar
                    <span className="p-1 font-bold">{ItemsCounter()}</span>
                    prylar
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                {itemsArray?.map((item) =>
                    noCategory ? (
                        <Link href={`/product/${item.id}`} key={item.id}>
                            <ProductCard item={item} />
                        </Link>
                    ) : (
                        filterByCategory[
                            item.category.name as keyof typeof filterByCategory
                        ] && (
                            <Link href={`/product/${item.id}`} key={item.id}>
                                <ProductCard item={item} />
                            </Link>
                        )
                    )
                )}
            </div>
        </div>
    );
};

export default SearchResults;
