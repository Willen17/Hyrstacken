import { Dispatch, SetStateAction, useState } from "react";
import Category from "./Category";

type categoriesProps = {
    categories: {
        id: string;
        name: string;
    }[];
    setFilterByCategory: Dispatch<
        SetStateAction<{
            Verktyg: boolean;
            Övrigt: boolean;
            Sport: boolean;
            Friluftsliv: boolean;
            Hem: boolean;
        }>
    >;
    filterByCategory: {
        Verktyg: boolean;
        Övrigt: boolean;
        Sport: boolean;
        Friluftsliv: boolean;
        Hem: boolean;
    };
};

const Categories = ({
    categories,
    setFilterByCategory,
    filterByCategory,
}: categoriesProps) => {
    return (
        <div className="flex flex-col w-96 md:w-full">
            <div className="flex items-center justify-center lg:hidden ">
                <p>Filter</p>
                <div className="ml-3 bg-veryDarkBlue h-0.5 w-[70%] opacity-20"></div>
            </div>
            <ul className="flex flex-row flex-wrap justify-center ml-4">
                {categories.map((category) => (
                    <Category
                        key={category.id}
                        category={category.name}
                        setFilterByCategory={setFilterByCategory}
                        filterByCategory={filterByCategory}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Categories;
