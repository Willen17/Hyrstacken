import { zodResolver } from "@hookform/resolvers/zod";
import { watch } from "fs";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import SuperJSON from "superjson";
import { z } from "zod";
import { bookingSchema } from "../../lib/schemas";
import FormLabel from "../FormLabel/FormLabel";
import Loader from "../Loader/Loader";

export default function BookingForm({
    itemId,
    userId,
    orderSubmitted,
    setBookingId,
}: {
    itemId: string;
    userId: string;
    orderSubmitted: Dispatch<SetStateAction<boolean>>;
    setBookingId: Dispatch<SetStateAction<string | undefined>>;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },watch
    } = useForm<z.infer<typeof bookingSchema>>({
        resolver: zodResolver(bookingSchema),
        mode: "onChange",
    });

    // function get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    function minEndDate() {
        const endDate = new Date();
        if(watch("startDate")){
            endDate.setDate(watch("startDate").getDate() + 1);
        }
        return endDate.toISOString().split("T")[0];

    }

    

    

   




    const onSubmit = handleSubmit(async (data) => {
        if (userId) {
            try {
                const res = await fetch("/api/booking/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: SuperJSON.stringify(data),
                });
                if (!res.ok) {
                    throw new Error("Something went wrong");
                } else {
                    const result = await res.json();
                    setBookingId(result);
                    orderSubmitted(true);
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Du måste vara inloggad för att kunna göra en förfrågan");
        }
    });

    return (
        <>
        {isSubmitting ? <Loader /> : (
            <form onSubmit={onSubmit}>
                <input type="hidden" {...register("itemId")} value={itemId} />
                <div className="flex flex-col">
                    <FormLabel required >Startdatum</FormLabel>
                    <input
                        type="date"
                        {...register("startDate", { valueAsDate: true })}
                        min={tomorrow.toISOString().split("T")[0]}
                    />
                    {errors.startDate && <p className="text-error">{errors.startDate.message}</p>}
                </div>
                <div className="flex flex-col">
                    <FormLabel required >Slutdatum</FormLabel>
                    <input
                        type="date"
                        {...register("endDate", { valueAsDate: true })}
                        min={minEndDate()}
                    />
                    {errors.endDate && <p className="text-error">{errors.endDate.message}</p>}
                </div>
                <input
                    type="submit"
                    value={isValid ? "Skicka förfrågan" : "Ange datum"}
                    className="mt-4 btn btn-primary"
                    id="submit-btn"
                    disabled={!isValid}

                />
            </form>
        )}
        </>
    );
}
