import { useState } from "react";
import CloseIcon from "../../assets/x.svg";

const Category = ({ category }: any) => {
    const [isCategoryActive, setIsCategoryActive] = useState(false);

    return (
        <div>
            <li
                onClick={() => setIsCategoryActive(!isCategoryActive)}
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
