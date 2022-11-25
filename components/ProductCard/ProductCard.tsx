import LocationIcon from "../../assets/location.svg";
import RatingIcon from "../../assets/rating.svg";

const ProductCard = () => {
  const img =
    "https://images.unsplash.com/photo-1602528190586-757f42d99447?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";

  let title = "Spezialized MTB - Full carbon";
  let price = "3600kr/dag";
  let location = "Hisingen";
  let rating = "4.5 Betyg";

  return (
    <div className="w-96 py-3 px-5 flex-col flex text-sm text-primary font-semibold relative">
      <div className="flex bg-veryDarkBlue rounded-3xl px-2 py-4 w-24 h-7 absolute top-6 right-8 text-xs justify-center">
        <LocationIcon className="self-center" />
        <p className="pl-1 text-info font-normal self-center">{location}</p>
      </div>
      <div className="flex bg-veryDarkBlue rounded-3xl px-2 py-4 w-24 h-7 absolute top-6 left-8 text-xs justify-center">
        <RatingIcon className="self-center" />
        <p className="pl-1 text-info font-normal self-center">{rating}</p>
      </div>
      <img className="w-96 h-80 rounded-md" alt="Produktkort" src={img}></img>
      <div className="pt-2 flex flex-row justify-between w-full">
        <h2>{title}</h2>
        <p>{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
