import type { NextPage, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import prisma from "../lib/prisma";
import ProductCard from "../components/ProductCard/ProductCard";
import SearchBar from "../components/SearchBar/searchBar";
// import FilterIcon from "../assets/filter.svg";
import CloseIcon from "../assets/x.svg";
import { Fragment, useEffect, useState } from "react";
import { string } from "zod";
import Categories from "../components/Categories/categories";
import Link from "next/link";
import bg from '../public/assets/bg.png'
import PrimaryButton from "../components/PrimaryButton/PrimaryButton";
import FilterIcon from "../public/assets/filter-icon.svg";
import ArrowRightIcon from "../public/assets/arrow-right.svg";
import SearchIcon from "../public/assets/search-icon.svg";

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

    function useWindowWidth() {
        const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined)
        useEffect(() => {
            const handleResize = () => {
                setWindowWidth(window.innerWidth)
                if(window.innerWidth >= 1360) {
                    setIsCategoriesOpen(true)
                }
            };

            window.addEventListener("resize", handleResize);

            handleResize();

            return () => window.removeEventListener("resize", handleResize);
        });
        return windowWidth
    }

    const windowWidth = useWindowWidth()

    function openCategories() {
        setIsCategoriesOpen(!isCategoriesOpen);
    }

    let amountOfProducts = 1094;
    return (
        <Fragment>
        <Image src={bg} alt="background" className="absolute top-[-1.5rem] min-[800px]:top-0 left-0 object-cover h-[45vh] max-[800px]:h-[300px] max-[640px]:h-[250px]"/>
        <div className="absolute top-[23vh] left-[50%] max-[1350px]:justify-center max-[800px]:top-[6rem] max-[640px]:top-[3rem] max-[640px]:pl-[2rem] max-[640px]:max-w-[20rem] max-[640px]:justify-start max-[640px]:left-[9rem] translate-x-[-50%] w-[100%] max-w-[1200px] flex items-center justify-start">
            <h1 className="text-7xl max-[1350px]:text-6xl max-[800px]:text-5xl font-bold text-white font-cabin">Sök tusentals prylar</h1>
        </div>
        <div className="flex max-[610px]:px-[1rem] lg:px-[4rem] flex-col items-center min-h-screen p-0 m-0 mx-auto max-w-[1360px] mt-[100px] max-[800px]:mt-[50px] font-nunito">
            <div className="absolute p-[1rem] sm:p-[4rem] max-[1360px]:max-w-[64rem] max-[1050px]:max-w-[45rem] max-[800px]:top-[275px] max-[640px]:top-[225px] left-1/2 top-[45vh] translate-y-[-50%] translate-x-[-50%] w-[100%] flex justify-center">
                <div className="w-[100%] h-[100%] max-w-[35rem] shadow-2xl bg-veryDarkBlue rounded-[8px] lg:gap-0 gap-5 flex flex-col items-center justify-between pt-[1rem] pb-[0rem] min-[640px]:pb-[1rem]  px-[1rem] sm:pt-[2rem] min-[1025px]:pb-[2rem] sm:px-[2rem] min-[1360px]:flex-row lg:px-[2rem] md:max-w-[75rem]">
                    <div className="max-[1360px]:flex max-[1360px]:items-center max-[1360px]:justify-between max-[1360px]:w-[100%]">
                        <div className="flex justify-between items-center gap-[1rem] min-[375px]:flex-row w-[100%]">
                            <label className="relative w-[100%] max-w-[25rem] flex">
                                <div className="absolute right-[1.5rem] top-[50%] translate-y-[-50%]">
                                    <SearchIcon />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Sök produkt..."
                                    className="p-[1rem] w-[100%] lg:w-[30rem] rounded-[8px] text-veryDarkBlue"
                                />
                            </label>
                            <button
                                type="button"
                                className={`min-[1360px]:hidden border-[1px] py-[1rem] px-[2rem] min-[325px]:p-[1rem] rounded-[8px] border-white w-[100%] flex items-center justify-between min-[325px]:w-[auto] ${isCategoriesOpen ? 'bg-softRed border-none' : ''}`}
                                onClick={openCategories}
                            >
                            <FilterIcon />
                            </button>
                        </div>
                    </div>
                    { isCategoriesOpen ? 
                        <div className="flex w-[100%] min-[1360px]:hidden mt-[1.5rem] mb-[1.1rem] max-[800px]:mt-[.5rem] max-[800px]:mb-[0rem]">
                            <h2 className="text-white w-[100%] items-center gap-[2rem] flex max-[800px]:gap-[1rem] after:flex after:h-[1px] after:w-[100%] after:bg-white">Filter</h2>
                        </div>
                    :
                        ''
                    }
                    <div className={`h-[100%] w-[100%] ${isCategoriesOpen ? 'max-[1020px]:pb-[1rem]' : ''}`}>
                        {isCategoriesOpen ? <Categories categories={categories} /> : false}
                    </div>
                </div>
                </div>
            <div className={`mt-[47vh] max-[640px]:px-[0] max-[460px]:flex-col max-[800px]:mt-[22rem] max-[640px]:mt-[18rem] max-[1360px]:max-w-[58rem] max-[1050px]:max-w-[38rem] max-[770px]:max-w-[36rem] flex items-baseline w-[100%] justify-between lg:flex-row text-primary px-[1rem] ${isCategoriesOpen ? 'min-[1050px]:mt-[53vh] min-[800px]:mt-[58vh] min-[640px]:mt-[23rem] min-[300px]:mt-[23rem]' : ''} `}>
                <h2 className="text-2xl font-bold">Resultat prylar</h2>
                <p>
                    Visar
                    <span className="p-1 font-bold">{amountOfProducts}</span>
                    prylar
                </p>
            </div>
            <div className="w-full max-[610px]:flex-col flex flex-wrap justify-center gap-2">
                {items?.map((item) => (
                    <Link href={`/product/${item.id}`} key={item.id}>
                        <ProductCard item={item} />
                    </Link>
                ))}
            </div>
        </div>
        </Fragment>
    );
};

export default SearchResults;
