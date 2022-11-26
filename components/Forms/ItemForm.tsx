import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { itemSchema } from '../../lib/schemas';

type ItemFormProps = {
  categories: {
    id: string;
    name: string;
  }[];
}

const ItemForm = ({categories}: ItemFormProps) => {

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
    <form onSubmit={onSubmit} className="form-control flex flex-col p-5">
      <label className='label'>
        <span className='label-text'>Bildlänk</span>
      </label>
      <input {...register("imageUrl")} />
      <label className="label">
        <span className="label-text">Titel</span>
      </label>
      <input {...register("title", {required: "Måste ha en titel"})} className="input w-full border-b border-b-veryDarkBlue"/>
      <label className="input-group input-group-vertical">
        <span className="label-text">Pris per dag</span>
        <input type="number" {...register("price", {valueAsNumber: true})} className="input"/>
      <label className="label">
        Beskrivning
      </label>
      <textarea {...register("description")} className="textarea textarea-bordered max-h-28"/>
      </label>
      <label className="label">
        <select {...register('categoryId')} name="" id="" className='select w-full max-w-xs'>
          <option disabled selected> Välj kategori</option>
          {categories.map((category) => {
            return <option key={category.id} value={category.id}>{category.name}</option>
          })
        }</select>
      </label>

      {errors && <span>{errors.title?.message}</span>}
      {errors && <span>{errors.description?.message}</span>}
      {errors && <span>{errors.price?.message}</span>}
      
      <input type="submit" className="btn bg-[#e37e7e] mt-12"/>
    </form>
  )
}

export default ItemForm