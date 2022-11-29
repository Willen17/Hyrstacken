import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { itemSchema } from "../../lib/schemas";
import CrossIcon from "../../assets/cross.svg";
import router from "next/router";
import Loader from "../Loader/Loader";

type ItemFormProps = {
    categories: {
        id: string;
        name: string;
    }[];
};

const ItemForm = ({ categories }: ItemFormProps) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<z.infer<typeof itemSchema>>({
        resolver: zodResolver(itemSchema),
    });
    const onSubmit = handleSubmit((data) => {
        console.log(data);
        setLoading(true);
        fetch("/api/createItem", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((data) => console.log("response ", data))
            .catch((e) => console.log(e))
            .finally(() => {
                setLoading(false);
            });
    });

    const allFilled = () => {
        let status = true;
        let { description, categoryId, title, price } = watch();
        if (!description || !categoryId || !title || !price) status = false;
        return status;
    };

    return loading ? (
        <Loader />
    ) : (
        <form
            onSubmit={onSubmit}
            className="flex flex-col w-full h-full p-5 justify-evenly tablet:p-10 laptop:w-2/5 tablet:w-3/5 "
        >
            <h1 className="text-2xl font-bold text-veryDarkBlue">
                Skapa ny annons
            </h1>
            {allFilled() ? "true" : "false"}
            <div className="relative flex flex-col my-3 gap-y-3">
                <label className="label-text">Titel</label>
                <input
                    placeholder="Skiftnyckel"
                    {...register("title", { required: "Måste ha en titel" })}
                    className="pl-2 pr-10 font-bold border-b-[1px] h-9 border-veryDarkBlue"
                />
                <CrossIcon className="absolute right-3  top-[65%] cursor-pointer" />
            </div>

            <div className="relative flex flex-col my-3 gap-y-3">
                <label className="label-text">Bild-url</label>
                <input
                    {...register("imageUrl")}
                    placeholder="https://dinbild.se/din-bild"
                    className="pl-2 pr-10 font-bold border-b-[1px] h-9 border-veryDarkBlue"
                />
                <CrossIcon className="absolute right-3  top-[65%] cursor-pointer" />
            </div>
            <div className="relative flex flex-col my-3 gap-y-3">
                <label className="label-text">Pris per dag</label>
                <input
                    placeholder="10"
                    className="pl-2 pr-10 font-bold border-b-[1px] h-9 border-veryDarkBlue"
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                />
                <CrossIcon className="absolute right-3  top-[65%] cursor-pointer" />
            </div>
            <div className="flex flex-col my-3 gap-y-3">
                <label className="label-text">Beskrivning</label>
                <textarea
                    {...register("description")}
                    className="textarea px-2 border-[1px] font-nunito text-[#000] border-veryDarkBlue leading-snug"
                    placeholder="Denna skiftnyckel köptes in för tre år sedan och är i mycket bra skick..."
                    rows={4}
                />
            </div>
            <label className="label-text">Kategori</label>
            <select
                name=""
                id=""
                className=" select  border-veryDarkBlue border-[1px]"
            >
                <option disabled selected>
                    Välj kategori
                </option>
                {categories.map((category) => {
                    return (
                        <option
                            {...register("categoryId")}
                            key={category.id}
                            value={category.name}
                        >
                            {category.name}
                        </option>
                    );
                })}
            </select>

            {errors && <span>{errors.title?.message}</span>}
            {errors && <span>{errors.description?.message}</span>}
            {errors && <span>{errors.price?.message}</span>}

            <input
                type="submit"
                className="my-4 text-white border-0 btn bg-softRed"
            />
        </form>
    );
};

export default ItemForm;
