// import { AppProvider } from '@toolpad/core/AppProvider';
// import {
//   SignInPage,
//   type AuthProvider,
//   type AuthResponse,
// } from '@toolpad/core/SignInPage';
// import { useTheme } from '@mui/material/styles';

// const providers = [{ id: 'credentials', name: 'Email and password' }];

// const signIn: (
//   provider: AuthProvider,
//   formData?: FormData,
// ) => Promise<AuthResponse> | void = async (provider, formData) => {
//   const promise = new Promise<AuthResponse>((resolve) => {
//     setTimeout(() => {
//       const email = formData?.get('email');
//       const password = formData?.get('password');
//       alert(
//         `Signing in with "${provider.name}" and credentials: ${email}, ${password}`,
//       );
//       // preview-start
//       resolve({
//         type: 'CredentialsSignin',
//         error: 'Invalid credentials.',
//       });
//       // preview-end
//     }, 300);
//   });
//   return promise;
// };

// export default function NotificationsSignInPageError() {
//   const theme = useTheme();
//   return (
//     // preview-start
//     <AppProvider theme={theme}>
//       <SignInPage
//         signIn={signIn}
//         providers={providers}
//         slotProps={{ emailField: { autoFocus: false } }}
//       />
//     </AppProvider>
//     // preview-end
//   );
// }

import { useForm, useFieldArray, useWatch, Control } from "react-hook-form";


type FormValues = {
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
};


const Total = ({ control }: { control: Control<FormValues> }) => {
  const formValues = useWatch({
    name: "cart",
    control
  });
  const total = formValues.reduce(
    (acc, current) => acc + (current.price || 0) * (current.quantity || 0),
    0
  );
  return <p>Total Amount: {total}</p>;
};


export default function Mock() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      cart: [{ name: "test", quantity: 1, price: 23 }]
    },
    mode: "onBlur"
  });
  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control
  });
  const onSubmit = (data: FormValues) => console.log(data);


  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section className={"section"} key={field.id}>
                <input
                  placeholder="name"
                  {...register(`cart.${index}.name` as const, {
                    required: true
                  })}
                  className={errors?.cart?.[index]?.name ? "error" : ""}
                />
                <input
                  placeholder="quantity"
                  type="number"
                  {...register(`cart.${index}.quantity` as const, {
                    valueAsNumber: true,
                    required: true
                  })}
                  className={errors?.cart?.[index]?.quantity ? "error" : ""}
                />
                <input
                  placeholder="value"
                  type="number"
                  {...register(`cart.${index}.price` as const, {
                    valueAsNumber: true,
                    required: true
                  })}
                  className={errors?.cart?.[index]?.price ? "error" : ""}
                />
                <button type="button" onClick={() => remove(index)}>
                  DELETE
                </button>
              </section>
            </div>
          );
        })}


        <Total control={control} />


        <button
          type="button"
          onClick={() =>
            append({
              name: "",
              quantity: 0,
              price: 0
            })
          }
        >
          APPEND
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}
