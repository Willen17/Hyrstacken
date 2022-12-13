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
        location: { name: string };
        category: { name: string };
    };
};

const ProductCard = ({ item }: ProductCardProps) => {
    const [imgSrc, setImgSrc] = useState(item.imageUrl);

    let rating = "4.5 Betyg";

    return (
        <div className="w-full min-[610px]:w-[270px] md:m-4 py-3 justify-center items-center flex-col flex text-sm text-primary font-semibold relative self-center">
            <div className="absolute flex justify-center px-2 py-4 text-xs bg-veryDarkBlue rounded-3xl h-7 top-6 right-3">
                <LocationIcon className="self-center" />
                <p className="self-center pl-1 font-normal text-info">
                    {item.location.name}
                </p>
            </div>
            <div className="absolute flex justify-center w-24 px-2 py-4 text-xs bg-veryDarkBlue rounded-3xl h-7 top-6 left-3">
                <RatingIcon className="self-center" />
                <p className="self-center pl-1 font-semibold text-info">
                    {rating}
                </p>
            </div>
            <img
                className="w-96 h-[270px] rounded-md max-[610px]:h-[350px] max-[460px]:h-[275px] max-[610px]:object-cover"
                alt="Produktkort"
                src={imgSrc ?? ""}
                onError={() =>
                    setImgSrc(
                        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                    )
                }
            ></img>
            <div className="flex flex-row justify-between w-full pt-2">
                <h2 className="ml-3 text-lg font-bold">{item.title}</h2>
                <p className="mr-3 text-lg font-bold">
                    {item.picePerDay} kr
                    <span className="font-normal">/dag</span>
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
