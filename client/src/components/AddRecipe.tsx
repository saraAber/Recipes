import axios from "axios";
import { useFieldArray, useForm } from "react-hook-form";
import { AddRecipeValidation } from "../Repositories/Validations";
import { yupResolver } from "@hookform/resolvers/yup";

const AddRecipe = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(AddRecipeValidation)
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: "instructions", // תוודא שהשם תואם למבנה הנתונים
    });

    const addRecipe = async (data: any) => {
        try {
            const response = await axios.post("http://localhost:8080/api/recipe", data);
            console.log(response.data);
        } catch (error) {
            console.error("Add recipe failed:", error.message);
        }
    };

    const onSubmit = async (data: any) => {
        await addRecipe(data);
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* שם המתכון */}
                <div>
                    <input
                        type="text"
                        placeholder="שם מתכון"
                        {...register("Name", { required: "שם המתכון חובה" })}
                    />
                    <small>{errors.Name?.message}</small>
                </div>

                {/* הוראות המתכון */}
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <section className="section">
                            <input
                                placeholder="שם ההוראה"
                                {...register(`instructions.${index}.name`, {
                                    required: "שם ההוראה חובה"
                                })}
                                className={errors?.instructions?.[index]?.name ? "error" : ""}
                            />
                            <input
                                placeholder="כמות"
                                type="number"
                                {...register(`instructions.${index}.quantity`, {
                                    valueAsNumber: true,
                                    required: "כמות חובה"
                                })}
                                className={errors?.instructions?.[index]?.quantity ? "error" : ""}
                            />
                            <input
                                placeholder="מחיר"
                                type="number"
                                {...register(`instructions.${index}.price`, {
                                    valueAsNumber: true,
                                    required: "מחיר חובה"
                                })}
                                className={errors?.instructions?.[index]?.price ? "error" : ""}
                            />
                            <button type="button" onClick={() => remove(index)}>
                                מחק
                            </button>
                        </section>
                    </div>
                ))}

                {/* כפתור להוספת הוראה חדשה */}
                <button type="button" onClick={() => append({ name: "", quantity: "", price: "" })}>
                    הוסף הוראה
                </button>

                <input type="submit" value="הוסף מתכון" />
            </form>
        </>
    );
};

export default AddRecipe;