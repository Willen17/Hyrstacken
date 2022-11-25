import { useForm } from "react-hook-form";
import { itemSchema } from "../lib/schemas";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { InferGetServerSidePropsType, NextPage } from "next";
import prisma from "../lib/prisma";

export async function getServerSideProps() {
  const categories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    }
  });
  return {
    props: {
      categories,
    },
  };
};

const CreateItem: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({categories}) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<z.infer<typeof itemSchema>>({
    resolver: zodResolver(itemSchema)
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
      <label className="label">
        <select {...register('categoryId')} name="" id="">{
          categories.map((category) => {
            return <option key={category.id} value={category.id}>{category.name}</option>
          })
        }</select>
      </label>

      {errors && <span>{errors.title?.message}</span>}
      {errors && <span>{errors.description?.message}</span>}
      {errors && <span>{errors.price?.message}</span>}
      
      <input type="submit" className="btn btn-primary"/>
    </form>
  );
};

export default CreateItem;
