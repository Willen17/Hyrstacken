import { useState } from "react";
import CloseIcon from "../../assets/x.svg";

type categoriesProps = {
  category: {
    name: string;
  };
};

const Category = ({ category }: categoriesProps) => {
  const [isCategoryActive, setIsCategoryActive] = useState(false);

  return (
    <div>
      <li
        onClick={() => setIsCategoryActive(!isCategoryActive)}
        className="p-2"
      >
        <span
          className={
            !isCategoryActive
              ? "flex justify-between border-solid border-2 rounded-lg px-3 py-1"
              : "bg-lightRed flex justify-between border-lightRed border-2 rounded-lg px-3 py-1 text-info"
          }
        >
          <>{category}</>
          {isCategoryActive ? <CloseIcon className="text-info pl-1" /> : false}
        </span>
      </li>
    </div>
  );
};

export default Category;
