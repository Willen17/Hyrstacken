import { useForm } from "react-hook-form";
import { apiItemSchema } from "../lib/schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";

const CreateItem = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<z.infer<typeof apiItemSchema>>({
    resolver: zodResolver(apiItemSchema)
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    fetch("/api/createItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  })

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={onSubmit} className="form-control flex flex-col">
      {/* register your input into the hook by invoking the "register" function */}
      <label className="label">
        <span className="label-text">Titel</span>
        <input {...register("title")} className="input input-primary"/>
      </label>
      <label className="label">
        Beskrivning
        <input {...register("description")} className="input"/>
      </label>
      <label className="label">
        Pris per dag
        <input type="number" {...register("price", {valueAsNumber: true})} className="input"/>
      </label>

      {errors && <span>{errors.title?.message}</span>}
      {errors && <span>{errors.description?.message}</span>}
      {errors && <span>{errors.price?.message}</span>}
      
      <input type="submit" className="btn btn-primary"/>
    </form>
  );
};

export default CreateItem;
