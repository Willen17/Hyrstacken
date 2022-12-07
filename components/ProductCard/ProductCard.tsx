/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import LocationIcon from "../../assets/location.svg";
import RatingIcon from "../../assets/rating.svg";

type ProductCardProps = {
    item: {
        title: string;
        id: string;
        description: string;
        imageUrl: string | null;
        picePerDay: number;
        category: { name: string };
    };
};

const ProductCard = ({ item }: ProductCardProps) => {
    const [imgSrc, setImgSrc] = useState(item.imageUrl);

    let location = "Hisingen";
    let rating = "4.5 Betyg";

    return (
        <div className="w-[340px] max-[370px]:w-[310px] md:m-4 py-3 justify-center items-center flex-col flex text-sm text-primary font-semibold relative self-center">
            <div className="absolute flex justify-center w-24 px-2 py-4 text-xs bg-veryDarkBlue rounded-3xl h-7 top-6 right-8">
                <LocationIcon className="self-center" />
                <p className="self-center pl-1 font-normal text-info">
                    {location}
                </p>
            </div>
            <div className="absolute flex justify-center w-24 px-2 py-4 text-xs bg-veryDarkBlue rounded-3xl h-7 top-6 left-8">
                <RatingIcon className="self-center" />
                <p className="self-center pl-1 font-semibold text-info">
                    {rating}
                </p>
            </div>
            <img
                className="w-full rounded-md h-80"
                alt="Produktkort"
                src={imgSrc ?? ""}
                onError={() =>
                    setImgSrc(
                        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                    )
                }
            ></img>
            <div className="flex flex-row justify-between w-full pt-2">
                <h2>{item.title}</h2>
                <p>{item.picePerDay}kr/dag</p>
            </div>
        </div>
    );
};

export default ProductCard;
