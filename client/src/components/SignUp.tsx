// import * as Yup from 'yup';
// import axios from "axios";
// import { useState } from "react";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup'; 
// import IFormInputSignUp from "./Repositories/IFormInputSignUp";

// const SignUp = () => {
//     const [count, setCount] = useState(1);


//     const validationSchema = Yup.object().shape({
//         username: Yup.string()
//             .required('Name is required')
//             .min(3, 'Name must be at least 3 characters long'),
//         password: Yup.string()
//             .required('Password is required')
//             .min(6, 'Password must be at least 6 characters long'),
//         name: Yup.string()
//             .required('Full name is required'),
//         phone: Yup.string()
//             .required('Phone number is required')
//             .matches(/^[0-9]+$/, 'Phone number must be digits only')
//             .min(10, 'Phone number must be at least 10 digits long'),
//         email: Yup.string()
//             .required('Email is required')
//             .email('Email is not valid'),
//         TZ: Yup.string()
//             .required('ID number is required')
//             .matches(/^[0-9]+$/, 'ID number must be digits only')
//             .min(9, 'ID number must be at least 9 digits long'),
//     });

//     const { register, handleSubmit, formState: { errors } } = useForm<IFormInputSignUp>({
//         resolver: yupResolver(validationSchema) 
//     });

//     const onSubmit: SubmitHandler<IFormInputSignUp> = async data => {
//         axios.post<IFormInputSignUp>('http://localhost:8080/api/user/signup',)
//             .then((response) => {
//                 // ניתוב לדף הבית
//                 console.log("home page");

//             })
//             .catch((error) => {
//                 console.error('Registration failed:', error.message); // זריקת שגיאה ליוזר
//             });
//     }

//     return (
//         <div>
//             <h1>SignUp</h1>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div>
//                     <label htmlFor="username">Name</label>
//                     <input id="username" {...register('username')} />
//                     {errors.username && <span>{errors.username.message}</span>}
//                 </div>

//                 <div>
//                     <label htmlFor="password">Password</label>
//                     <input id="password" type="password" {...register('password')} />
//                     {errors.password && <span>{errors.password.message}</span>}
//                 </div>

//                 <div>
//                     <label htmlFor="name">Full Name</label>
//                     <input id="name" {...register('name')} />
//                     {errors.name && <span>{errors.name.message}</span>}
//                 </div>

//                 <div>
//                     <label htmlFor="phone">Phone</label>
//                     <input id="phone" {...register('phone')} />
//                     {errors.phone && <span>{errors.phone.message}</span>}
//                 </div>

//                 <div>
//                     <label htmlFor="email">Email</label>
//                     <input id="email" type="email" {...register('email')} />
//                     {errors.email && <span>{errors.email.message}</span>}
//                 </div>

//                 <div>
//                     <label htmlFor="TZ">ID Number</label>
//                     <input id="TZ" {...register('TZ')} />
//                     {errors.TZ && <span>{errors.TZ.message}</span>}
//                 </div>

//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     );
// }

// export default SignUp;




// import { yupResolver } from "@hookform/resolvers/yup"
// import { useForm } from "react-hook-form"
// import { SignUpValidation } from "../Repositories/Validations"
// import axios from "axios"
// import { user } from "../Repositories/User"

// const SignUp = () => {
//     const { register, handleSubmit, formState: { errors } } = useForm({
//         resolver: yupResolver(SignUpValidation),
//     })

//     const onSubmit = async (data: any) => {
//         await axios.post<user>('http://localhost:8080/api/user/sighin', data, {
//             headers: { "Content-Type": "application/json" },
//         })
//             .then(response => {
//                 console.log(response.data) 
//             })
//             .catch(error => {
//                 if (error.response?.data?.includes("unique"))
//                     console.log('המשתמש כבר רשום במערכת')
//                 else
//                     console.error('Registration failed:', error.message)
//             })
//         console.log(data)
//     }

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="שם משתמש"
//                     {...register("UserName")}
//                 />
//                 <small>{errors.UserName?.message}</small>
//             </div>
//             <div>
//                 <input
//                     type="password"
//                     placeholder="סיסמה"
//                     {...register("Password")}
//                 />
//                 <small>{errors.Password?.message}</small>
//             </div>
//             <div>
//                 <input
//                     type="text"
//                     placeholder="שם"
//                     {...register("Name")}
//                 />
//                 <small>{errors.Name?.message}</small>
//             </div>
//             <div>
//                 <input
//                     type="Phone"
//                     placeholder="טלפון"
//                     {...register("Phone")}
//                 />
//                 <small>{errors.Phone?.message}</small>
//             </div>
//             <div>
//                 <input
//                     type="email"
//                     placeholder="אימייל"
//                     {...register("Email")}
//                 />
//                 <small>{errors.Email?.message}</small>
//             </div>
//             <div>
//                 <input
//                     type="TZ"
//                     placeholder="ת.ז."
//                     {...register("Tz")}
//                 />
//                 <small>{errors.Tz?.message}</small>
//             </div>
//             <input type="submit" />
//         </form>
//     )
// }

// export default SignUp;



// import { yupResolver } from "@hookform/resolvers/yup";
// import { useForm } from "react-hook-form";
// import { SignUpValidation } from "../Repositories/Validations";
// import axios from "axios";
// import { user } from "../Repositories/User";
// import { useNavigate } from "react-router-dom";

// const SignUp = () => {
//     const navigate = useNavigate();

//     const { register, handleSubmit, formState: { errors } } = useForm({
//         resolver: yupResolver(SignUpValidation),
//     });

//     const onSubmit = async (data: any) => {
//         try {
//             const response = await axios.post<user>(
//                 'http://localhost:8080/api/user/sighin',
//                 data,
//                 { headers: { "Content-Type": "application/json" } }
//             );

//             console.log("ההרשמה הצליחה:", response.data);
//             navigate('/'); // ניווט לעמוד הבית

//         } catch (error: any) {
//             if (error.response?.data?.includes("unique")) {
//                 console.log('המשתמש כבר רשום במערכת');
//             } else {
//                 console.error('שגיאה בהרשמה:', error.message);
//             }
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <div>
//                 <input type="text" placeholder="שם משתמש" {...register("UserName")} />
//                 <small>{errors.UserName?.message}</small>
//             </div>
//             <div>
//                 <input type="password" placeholder="סיסמה" {...register("Password")} />
//                 <small>{errors.Password?.message}</small>
//             </div>
//             <div>
//                 <input type="text" placeholder="שם" {...register("Name")} />
//                 <small>{errors.Name?.message}</small>
//             </div>
//             <div>
//                 <input type="text" placeholder="טלפון" {...register("Phone")} />
//                 <small>{errors.Phone?.message}</small>
//             </div>
//             <div>
//                 <input type="email" placeholder="אימייל" {...register("Email")} />
//                 <small>{errors.Email?.message}</small>
//             </div>
//             <div>
//                 <input type="text" placeholder="ת.ז." {...register("Tz")} />
//                 <small>{errors.Tz?.message}</small>
//             </div>
//             <button type="submit">הירשם</button>
//         </form>
//     );
// };

// export default SignUp;



import axios from "axios"
import { useForm, type SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  Box, Button, TextField, Typography, Stack, Alert, Paper, Avatar, Link, Divider, Grid
} from "@mui/material"
import { PersonAddOutlined } from "@mui/icons-material"

type UserSignUp = {
  UserName: string
  Password: string
  Name: string
  Phone: string
  Email: string
  Tz: string
}

type UserSignUpRes = {
  Id: string
  Name: string
  Email: string
  Password: string
}

const SignUp = () => {
  const navigate = useNavigate()
  const [signUpError, setSignUpError] = useState("")

  const { register, handleSubmit, formState: { errors } } = useForm<UserSignUp>()

  const onSubmit: SubmitHandler<UserSignUp> = async (user) => {
    setSignUpError("")
    try {
      const { data } = await axios.post<UserSignUpRes>("http://localhost:8080/api/user/signup", user)
      console.log("ההרשמה הצליחה:", data)
      navigate("/") // הפניה לדף הבית
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setSignUpError(error.response?.data?.message || "שגיאה בהרשמה")
      } else {
        setSignUpError("אירעה שגיאה כללית.")
      }
    }
  }

  const textFieldStyles = {
    '& label': { color: 'white', fontFamily: 'inherit' },
    '& label.Mui-focused': { color: '#90caf9' },
    '& .MuiInputBase-input': {
      color: 'white', textAlign: 'right', fontFamily: 'inherit',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' },
      '&:hover fieldset': { borderColor: '#90caf9' },
      '&.Mui-focused fieldset': { borderColor: '#90caf9' },
    },
  }

  return (
    <Box
      sx={{
        display: "flex", justifyContent: "center", alignItems: "center",
        minHeight: "100vh", backgroundColor: "#1e1e1e", color: "white", padding: 4, fontFamily: "inherit"
      }}
      dir="rtl"
    >
      <Paper elevation={6} sx={{ width: "100%", maxWidth: 600, borderRadius: 3, overflow: "hidden" }}>
        <Box sx={{ padding: 4, background: 'linear-gradient(135deg,#1e1e1e,#90caf9)', textAlign: "center" }}>
          <Avatar sx={{ m: "auto", bgcolor: "#90caf9", width: 56, height: 56 }}>
            <PersonAddOutlined fontSize="large" />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 600, color: "#fff" }}>
            הרשמה לאתר
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "#ccc" }}>
            הצטרפו אלינו ותוכלו להוסיף מתכונים משלכם
          </Typography>
        </Box>

        <Box sx={{ padding: 4, background: '#333', color: "white" }}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField label="שם משתמש" fullWidth {...register("UserName", {
                  required: "שדה חובה", minLength: { value: 3, message: "לפחות 3 תווים" }
                })} error={!!errors.UserName} helperText={errors.UserName?.message} sx={textFieldStyles} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="סיסמה" type="password" fullWidth {...register("Password", {
                  required: "שדה חובה", minLength: { value: 6, message: "לפחות 6 תווים" }
                })} error={!!errors.Password} helperText={errors.Password?.message} sx={textFieldStyles} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="שם מלא" fullWidth {...register("Name", {
                  required: "שדה חובה"
                })} error={!!errors.Name} helperText={errors.Name?.message} sx={textFieldStyles} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="טלפון" fullWidth {...register("Phone", {
                  required: "שדה חובה",
                  pattern: { value: /^[0-9]{9,10}$/, message: "מספר טלפון לא תקין" }
                })} error={!!errors.Phone} helperText={errors.Phone?.message} sx={textFieldStyles} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="תעודת זהות" fullWidth {...register("Tz", {
                  required: "שדה חובה",
                  pattern: { value: /^[0-9]{9}$/, message: "מספר זהות לא תקין" }
                })} error={!!errors.Tz} helperText={errors.Tz?.message} sx={textFieldStyles} />
              </Grid>
              <Grid item xs={12}>
                <TextField label="אימייל" type="email" fullWidth {...register("Email", {
                  required: "שדה חובה",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "כתובת מייל לא תקינה"
                  }
                })} error={!!errors.Email} helperText={errors.Email?.message} sx={textFieldStyles} />
              </Grid>
            </Grid>

            {signUpError && (
              <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>{signUpError}</Alert>
            )}

            <Button
              variant="contained"
              fullWidth
              type="submit"
              size="large"
              sx={{
                mt: 4, py: 1.5, borderRadius: 2, fontSize: "1.1rem", fontWeight: 600,
                background: 'linear-gradient(135deg ,#90caf9,#1e1e1e)', color: "white",
                '&:hover': { backgroundColor: "#1565c0" },
              }}
            >
              הרשמה
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "#90caf9" }}>או</Typography>
            </Divider>

            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body1" sx={{ mb: 1 }}>כבר יש לך חשבון?</Typography>
              <Link href="/login" variant="body1" sx={{
                color: "#90caf9", fontWeight: 600, textDecoration: "none",
                '&:hover': { textDecoration: "underline" }
              }}>
                התחבר עכשיו
              </Link>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  )
}

export default SignUp