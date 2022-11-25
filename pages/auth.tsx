import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface iFormInput {
  name: string;
  email: string;
  password: string;
}

const Auth = () => {
  const { control, handleSubmit } = useForm<iFormInput>();

  const onSubmit: SubmitHandler<iFormInput> = (data) => {
    console.log(data);
  };

  // create login form with react-hook-form
  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" form-control flex flex-col gap-3">
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            type="text"
            placeholder="name"
            className="input input-primary"
          /> 
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            type="email"
            placeholder="email"
            className="input input-primary"
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <input
            {...field}
            type="password"
            placeholder="password"
            className="input input-primary"
          />
        )}
      />
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default Auth;
