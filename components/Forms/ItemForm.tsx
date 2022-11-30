import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { itemSchema } from "../../lib/schemas";
import CrossIcon from "../../assets/cross.svg";
import Loader from "../Loader/Loader";
import FormLabel from "../FormLabel/FormLabel";
import router from "next/router";

type ItemFormProps = {
    categories: {
        id: string;
        name: string;
    }[];
};

const ItemForm = ({ categories }: ItemFormProps) => {
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        watch,
        resetField,
        formState: { errors },
    } = useForm<z.infer<typeof itemSchema>>({
        mode: "onBlur",
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
            .then(async (data) => {
                setFetchError(data.ok === false);
                const body = await data.json();
                data.ok && router.push(`product/${body.id}`);
            })
            .catch((e) => console.log(e))
            .finally(() => {
                setLoading(false);
            });
    });

    const allFilled = () => {
        let status = true;
        let { description, categoryId, title, price } = watch();

        if (
            !description ||
            !categoryId ||
            categoryId === "DEFAULT" ||
            !title ||
            !price
        )
            status = false;
        return status;
    };

    return loading ? (
        <div className="grid h-screen place-content-center">
            <Loader />
        </div>
    ) : fetchError ? (
        <div className="flex flex-col items-center justify-center h-screen font-bold gap-y-5">
            <p>Något gick tyvärr fel...</p>
            <button
                onClick={() => {
                    setFetchError(false);
                }}
                className="text-white border-0 btn bg-softRed"
            >
                Försök igen
            </button>
        </div>
    ) : (
        <form
            onSubmit={onSubmit}
            className="container flex flex-col w-full h-full p-5 justify-evenly tablet:p-10"
        >
            <h1 className="text-2xl font-bold text-veryDarkBlue">
                Skapa ny annons
            </h1>
            <div className="relative flex flex-col my-3 gap-y-3">
                <FormLabel required>Titel</FormLabel>
                <input
                    placeholder="Skiftnyckel"
                    {...register("title", { required: "Måste ha en titel" })}
                    className="pl-2 pr-10 font-bold border-b-[1px] h-9 border-veryDarkBlue"
                />
                <CrossIcon
                    onClick={() => resetField("title")}
                    className="absolute right-3  top-[65%] cursor-pointer"
                />
            </div>
            {errors.title && (
                <span className="text-error">{errors.title?.message}</span>
            )}
            <div className="relative flex flex-col my-3 gap-y-3">
                <FormLabel>Bild-URL</FormLabel>

                <input
                    {...register("imageUrl")}
                    placeholder="https://dinbild.se/din-bild"
                    className="pl-2 pr-10 font-bold border-b-[1px] h-9 border-veryDarkBlue"
                />
                <CrossIcon
                    onClick={() => resetField("imageUrl")}
                    className="absolute right-3  top-[65%] cursor-pointer"
                />
            </div>
            <div className="relative flex flex-col my-3 gap-y-3">
                <FormLabel required>Pris per dag</FormLabel>

                <input
                    placeholder="10"
                    className="pl-2 pr-10 font-bold border-b-[1px] h-9 border-veryDarkBlue"
                    type="number"
                    {...register("price", { valueAsNumber: true })}
                />
                <CrossIcon
                    onClick={() => resetField("price")}
                    className="absolute right-3  top-[65%] cursor-pointer"
                />
            </div>
            {errors.price && (
                <span className="text-error">{errors.price?.message}</span>
            )}
            <div className="flex flex-col my-3 gap-y-3">
                <FormLabel required>Beskrivning</FormLabel>

                <textarea
                    {...register("description")}
                    className="textarea px-2 border-[1px] font-nunito text-[#000] border-veryDarkBlue leading-snug"
                    placeholder="Denna skiftnyckel köptes in för tre år sedan och är i mycket bra skick..."
                    rows={4}
                />
            </div>
            {errors.description && (
                <span className="text-error">
                    {errors.description?.message}
                </span>
            )}
            <FormLabel required>Kategori</FormLabel>

            <select
                id=""
                className=" select  border-veryDarkBlue border-[1px]"
                {...register("categoryId")}
                defaultValue={"DEFAULT"}
            >
                <option disabled value="DEFAULT">
                    Välj kategori
                </option>
                {categories.map((category) => {
                    return (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    );
                })}
            </select>
            {errors.categoryId && (
                <span className="text-error">{errors.categoryId?.message}</span>
            )}
            <input
                type="submit"
                value={allFilled() ? "Skicka" : "Fyll i obligatoriska fält"}
                className={`my-4 text-white border-0 btn bg-softRed ${
                    !allFilled() && "btn-disabled opacity-50"
                }`}
            />
        </form>
    );
};

export default ItemForm;
