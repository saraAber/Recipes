import * as yup from "yup"

export const LoginValidation = yup.object().shape({
    UserName: yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
    Password: yup.string()
        .required("Password is required")
        .min(5, "Password must be at least 5 characters"),
    RememberMe: yup.boolean()
})

export const SignUpValidation = yup.object().shape({
    UserName: yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
        Instructions: yup.array().of(yup.string()
        .required("Instruction can't be empty"))
        .min(1, "Instructions are required"),
    Password: yup.string()
        .required("Password is required")
        .min(5, "Password must be at least 5 characters"),
    Name: yup.string()
        .required("Name is required")
        .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters"),
    Phone: yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Phone number must be digits only")
        .min(9, "Phone number must be at least 9 digits long")
        .max(15, "Phone number must be at most 15 digits long"),
    Email: yup.string()
        .required("Email is required")
        .email("Email is not valid"),
    Tz: yup.string()
        .required("ID number is required")
        .matches(/^[0-9]+$/, "ID number must be digits only")
        .length(9, "ID number must be exactly 9 digits long"),
})

export const AddRecipeValidation = yup.object().shape({
    Name: yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),
    Description: yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters"),
    Ingredients: yup.string()
        .required("Ingredients are required")
        .min(10, "Ingredients must be at least 10 characters"),
    Instructions: yup.string()
        .required("Instructions are required")
        .min(10, "Instructions must be at least 10 characters"),
    Image: yup.string()
        .required("Image is required")
        .url("Image must be a valid URL"),
})