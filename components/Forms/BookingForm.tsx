//create a booking form using react-hook-form the form will be used to create a booking for a user on the front end. the api will be used to create a booking on the backend. the enpoint is /api/booking/add and there is a bookingschema from zod. the form has two date input fields, one for startdate and the other for enddate

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookingSchema } from "../../lib/schemas";
import { useState } from "react";
import { z } from "zod";

export default function BookingForm() {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(bookingSchema),
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
                <label htmlFor="startDate">Start Date</label>
                <input
                    type="date"
                    {...register("startDate")}
                    value={startDate.toISOString().substring(0, 10)}
                    onChange={(e) => setStartDate(new Date(e.target.value))}
                />
                {errors.startDate && <p>fel start</p>}
            </div>
            <div className="flex flex-col">
                <label htmlFor="endDate">End Date</label>
                <input
                    type="date"
                    {...register("endDate")}
                    value={endDate.toISOString().substring(0, 10)}
                    onChange={(e) => setEndDate(new Date(e.target.value))}
                />
                {errors.endDate && <p>fel slut</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

