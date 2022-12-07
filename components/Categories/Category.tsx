import { indexOf } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CloseIcon from "../../assets/x.svg";

type categoriesProps = {
    category: string;
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

const Category = ({
    category,
    setFilterByCategory,
    filterByCategory,
}: categoriesProps) => {
    const [isCategoryActive, setIsCategoryActive] = useState(false);

    function setCategory(category: string) {
        let newFilter = { ...filterByCategory };
        for (let key in newFilter) {
            if (key == category) {
                newFilter[key as keyof typeof filterByCategory] =
                    !filterByCategory[key as keyof typeof filterByCategory];
            }
        }
        setFilterByCategory(newFilter);
        setIsCategoryActive(!isCategoryActive);
    }

    return (
        <div>
            <li
                onClick={() => {
                    setCategory(category);
                }}
                className="cursor-pointer"
            >
                <span
                    className={
                        !isCategoryActive
                            ? "flex justify-between border-solid border-[1px] rounded-[6px] h-[100%] py-[1rem] px-[2rem] max-[800px]:py-[.5rem] max-[800px]:px-[1rem] border-white text-white"
                            : "bg-lightRed flex justify-between border-lightRed border-[1px] rounded-[6px] py-[1rem] px-[1.6rem] h-[100%] text-info"
                    }
                >
                    <>{category}</>
                    {isCategoryActive ? (
                        <CloseIcon className="pl-1 text-info" />
                    ) : (
                        false
                    )}
                </span>
            </li>
        </div>
    );
};

export default Category;
