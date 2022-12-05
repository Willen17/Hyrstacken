/* eslint-disable @next/next/no-img-element */
import { zodResolver } from "@hookform/resolvers/zod";
import router from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CrossIcon from "../../assets/cross.svg";
import { profileSchema } from "../../lib/schemas";
import FormLabel from "../FormLabel/FormLabel";
import Loader from "../Loader/Loader";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

type Props = {
    name?: string | null;
    id: string;
    image?: string | null;
    setFormVisible: Dispatch<SetStateAction<boolean>>;
};

const ProfileForm = (props: Props) => {
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        watch,
        resetField,
        formState: { errors },
    } = useForm<z.infer<typeof profileSchema>>({
        mode: "onBlur",
        resolver: zodResolver(profileSchema),
    });
    const onSubmit = handleSubmit((data) => {
        data.image =
            data.image ||
            props.image ||
            "https://miro.medium.com/max/720/1*W35QUSvGpcLuxPo3SRTH4w.png";
        console.log(data);
        setLoading(true);
        fetch("/api/editProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async (data) => {
                setFetchError(data.ok === false);
                const body = await data.json();

                data.ok && router.reload();

                return;
            })
            .catch((e) => console.log(e));
    });

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
        <>
            <div className="relative flex items-center justify-between px-2 mt-10">
                <p className="mr-2 font-bold whitespace-nowrap">
                    Redigera profil
                </p>
                <div className="bg-[#26324540] w-full h-px" />
            </div>

            <form onSubmit={onSubmit} className="px-2 pb-5 mt-10 ">
                <div className="relative flex flex-col my-3 gap-y-3">
                    <FormLabel required>Namn</FormLabel>
                    <input
                        placeholder="Ditt förnamn"
                        // {...register("title", { required: "Måste ha en titel" })}
                        className="pl-2 pr-10 font-bold border-b-[1px] h-9 border-veryDarkBlue"
                        {...register("name", {
                            required: "Måste ha ett namn",
                        })}
                        defaultValue={props.name || undefined}
                    />
                    <CrossIcon
                        onClick={() => resetField("name")}
                        className="absolute right-3  top-[65%] cursor-pointer"
                    />
                </div>
                {errors.name && (
                    <span className="text-error">{errors.name?.message}</span>
                )}
                <div className="relative flex flex-col my-3 gap-y-3">
                    <FormLabel>Profilbild</FormLabel>
                    <input
                        placeholder="Bild-URL"
                        // {...register("title", { required: "Måste ha en titel" })}
                        className="pl-2 pr-10 font-bold border-b-[1px] h-9 border-veryDarkBlue"
                        {...register("image")}
                        defaultValue={props.image || undefined}
                    />
                    <CrossIcon
                        onClick={() => resetField("image")}
                        className="absolute right-3  top-[65%] cursor-pointer"
                    />
                </div>
                {errors.image && (
                    <span className="text-error">{errors.image?.message}</span>
                )}
                <div className="pb-5 mt-10">
                    <PrimaryButton>Spara ändringar</PrimaryButton>
                </div>
            </form>
        </>
    );
};

export default ProfileForm;
