import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "../../lib/schemas";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { z } from "zod";
import SuperJSON from "superjson";


export default function BookingForm({ itemId, userId, orderSubmitted}: { itemId: string, userId: string, orderSubmitted: Dispatch<SetStateAction<boolean>> }) {

    

    const { register, handleSubmit, formState: { errors, isSubmitting, isValid }, watch, setError, control } = useForm<z.infer<typeof bookingSchema>>({
        resolver: zodResolver(bookingSchema),
    });

    // const validateDate = () => {
    //     const currentDate = new Date();
    //     if(watch("startDate") >= watch("endDate") || watch("startDate") < currentDate) {
    //         return true

    //     } else return false;
    // }

    // const startDate = useWatch({
    //     control,
    //     name: "startDate",
    // });


    const onSubmit = handleSubmit(async(data) => {
        if (userId) {
            try {
                const res = await fetch("/api/booking/add", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: SuperJSON.stringify(data),
                })
                if (!res.ok) {
                    throw new Error("Something went wrong");
                } else {
                    const result = await res.json();
                    console.log(result);
                    orderSubmitted(true);
                }
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            alert("Du måste vara inloggad för att kunna göra en förfrågan");
        } 
    });

    return (
        <form onSubmit={onSubmit}>
            <input
                type="hidden"
                {...register("itemId")}
                value={itemId}
            />
            <div className="flex flex-col">
                <label htmlFor="startDate">Start Date</label>
                <input
                    type="date"
                    {...register("startDate", { valueAsDate: true })}
                />
                {errors.startDate && <p>{errors.startDate.message}</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="endDate">End Date</label>
                <input
                    type="date"
                    {...register("endDate", { valueAsDate: true })}
                />
                {errors.endDate && <p>{errors.endDate.message}</p>
                }

            </div>
            <input type="submit" value={isValid ? "Skicka förfrågan" : "Ange datum"} className="btn btn-primary" />
        </form>
    );
}

