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
        <div className="flex flex-col w-full md:w-full">
            <ul className="flex-wrap gap-3 flex justify-center min-[1360px]:justify-end flex-row h-[100%]">
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
