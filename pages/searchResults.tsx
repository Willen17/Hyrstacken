import type { InferGetServerSidePropsType, NextPage } from "next";
import Image from "next/image";
import ProductCard from "../components/ProductCard/ProductCard";
import prisma from "../lib/prisma";
import Link from "next/link";
import { Fragment, Suspense, useEffect, useState } from "react";
import Categories from "../components/Categories/categories";
import bg from "../public/assets/bg.png";
import FilterIcon from "../public/assets/filter-icon.svg";
import SearchIcon from "../public/assets/search-icon.svg";

export async function getServerSideProps() {
    const items = await prisma.item.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            picePerDay: true,
            imageUrl: true,
            location: {
                select: { name: true },
            },
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
    const [itemsArray, setItemsArray] = useState<typeof items | undefined>(
        items
    );
    const [searchInput, setSearchInput] = useState<string>("");


    function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchInput(e.target.value);
    }

    useEffect(() => {
        if (searchInput.length > 0) {
            const filteredItems = items.filter((item) =>
                item.title.toLowerCase().includes(searchInput.toLowerCase())
            );
            setItemsArray(filteredItems);
        } else {
            setItemsArray(items);
        }
    }, [searchInput, items]);

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

    function useWindowWidth() {
        useEffect(() => {
            const handleResize = () => {
                if (window.innerWidth >= 1360) {
                    setIsCategoriesOpen(true);
                }
            };

            window.addEventListener("resize", handleResize);

            handleResize();

            return () => window.removeEventListener("resize", handleResize);
        });
    }

    useWindowWidth();

    return (
        <Suspense fallback={<div>Loading...</div>}>
        <Fragment>
            <Image
                src={bg}
                alt="background"
                className={`absolute top-[-1.5rem] min-[800px]:top-0 left-0 object-cover min-[1050px]:h-[425px] min-[460px]:h-[350px] h-[300px]`}
            />
            <div className="absolute left-[50%] max-[1350px]:justify-center top-[200px] max-[1050px]:top-[150px] max-[800px]:top-[6rem] max-[460px]:top-[3rem] max-[640px]:pl-[2rem] max-[400px]:max-w-[20rem] max-[640px]:max-w-[25rem] max-[640px]:justify-start max-[400px]:left-[9rem] max-[640px]:left-[12rem] translate-x-[-50%] w-[100%] max-w-[1200px] flex items-center justify-start">
                <h1 className="text-7xl max-[1350px]:text-6xl max-[800px]:text-6xl max-[400px]:text-5xl font-bold text-white font-cabin">
                    Sök tusentals prylar
                </h1>
            </div>
            <div className="flex max-[610px]:px-[1rem] lg:px-[4rem] flex-col items-center min-h-screen p-0 m-0 mx-auto max-w-[1360px] mt-[100px] max-[800px]:mt-[50px] font-nunito">
                <div
                    className={`absolute p-[1rem] sm:p-[4rem] max-[1360px]:max-w-[64rem] max-[1050px]:max-w-[45rem] left-1/2 translate-y-[-50%] translate-x-[-50%] w-[100%] flex justify-center min-[1360px]:top-[425px] min-[1050px]:top-[425px] min-[800px]:top-[350px] min-[460px]:top-[325px] top-[275px] ${
                        isCategoriesOpen
                            ? "min-[1050px]:top-[486px] min-[800px]:top-[464px] min-[525px]:top-[379px] min-[460px]:top-[406px] min-[300px]:top-[356px]"
                            : ""
                    }`}
                >
                    <div className="w-[100%] h-[100%] max-w-[35rem] shadow-2xl bg-veryDarkBlue rounded-[8px] lg:gap-0 gap-5 flex flex-col items-center justify-between pt-[1rem] pb-[0rem] min-[640px]:pb-[1rem]  px-[1rem] sm:pt-[2rem] min-[1025px]:pb-[2rem] sm:px-[2rem] min-[1360px]:flex-row lg:px-[2rem] md:max-w-[75rem]">
                        <div className="max-[1360px]:flex max-[1360px]:items-center max-[1360px]:justify-between max-[1360px]:w-[100%]">
                            <div className="flex justify-between items-center gap-[1rem] min-[375px]:flex-row w-[100%]">
                                <label className="relative w-[100%] max-w-[25rem] flex">
                                    <div className="absolute right-[1.5rem] top-[50%] translate-y-[-50%]">
                                        <SearchIcon />
                                    </div>
                                    <input
                                        autoFocus
                                        type="text"
                                        placeholder="Sök produkt..."
                                        className="p-[1rem] w-[100%] lg:w-[30rem] rounded-[8px] text-veryDarkBlue"
                                        onChange={(e) =>
                                            setSearchInput(e.target.value)
                                        }
                                    />
                                </label>
                                <button
                                id="filter-btn"
                                    type="button"
                                    className={`min-[1360px]:hidden border-[1px] py-[1rem] px-[2rem] min-[320px]:p-[1rem] rounded-[8px] border-white w-[100%] flex items-center justify-between min-[320px]:w-[auto] ${
                                        isCategoriesOpen
                                            ? "bg-softRed border-none"
                                            : ""
                                    }`}
                                    onClick={openCategories}
                                >
                                    <FilterIcon />
                                </button>
                            </div>
                        </div>
                        {isCategoriesOpen ? (
                            <div className="flex w-[100%] min-[1360px]:hidden mt-[1.5rem] mb-[1.1rem] max-[800px]:mt-[.5rem] max-[800px]:mb-[0rem]">
                                <h2 className="text-white w-[100%] items-center gap-[2rem] flex max-[800px]:gap-[1rem] after:flex after:h-[1px] after:w-[100%] after:bg-white">
                                    Filter
                                </h2>
                            </div>
                        ) : (
                            ""
                        )}
                        <div
                            className={`h-[100%] w-[100%] ${
                                isCategoriesOpen ? "max-[1020px]:pb-[1rem]" : ""
                            }`}
                        >
                            {isCategoriesOpen ? (
                                <Categories
                                    categories={categories}
                                    setFilterByCategory={setFilterByCategory}
                                    filterByCategory={filterByCategory}
                                />
                            ) : (
                                false
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className={`min-[1050px]:mt-[29rem] min-[460px]:mt-[23rem] min-[300px]:mt-[20rem] max-[640px]:px-[0] max-[460px]:flex-col max-[1360px]:max-w-[58rem] max-[1050px]:max-w-[38rem] max-[770px]:max-w-[36rem] flex items-baseline w-[100%] justify-between lg:flex-row text-primary px-[1rem] ${
                        isCategoriesOpen
                            ? "min-[1360px]:mt-[29rem] min-[1050px]:mt-[36rem] min-[800px]:mt-[36rem] min-[460px]:mt-[33rem] min-[300px]:mt-[30rem]"
                            : ""
                    } `}
                >
                    <h2 className="text-2xl font-bold">Resultat prylar</h2>
                    <p>
                        Visar
                        <span className="p-1 font-bold">{ItemsCounter()}</span>
                        prylar
                    </p>
                </div>
                <div className="flex flex-wrap justify-center gap-2" id="item-container">
                    {itemsArray?.map((item) =>
                        noCategory ? (
                            <Link href={`/product/${item.id}`} key={item.id}>
                                <ProductCard item={item} />
                            </Link>
                        ) : (
                            filterByCategory[
                                item.category
                                    .name as keyof typeof filterByCategory
                            ] && (
                                <Link
                                    href={`/product/${item.id}`}
                                    key={item.id}
                                >
                                    <ProductCard item={item} />
                                </Link>
                            )
                        )
                    )}
                </div>
            </div>
        </Fragment>
        </Suspense>
    );
};

export default SearchResults;
