import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginValidation } from '../Repositories/Validations';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UserStore from '../Repositories/stores/UserStore';

export default function Login() {
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(LoginValidation),
    });

    useEffect(() => {
        // אם יש מידע לזכור, אפשר להשתמש בזה או להסיר לגמרי
        const userName = localStorage.getItem('userName');
        const password = localStorage.getItem('password');
        if (userName && password) {
            setValue('UserName', userName);
            setValue('Password', password);
        }
    }, [setValue]);

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post('http://localhost:8080/api/user/login', data);
            
            const { UserName, Password, RememberMe } = data;

            // שמירת המשתמש ב־MobX store
            UserStore.setCurrentUser(response.data);

            // שמירת פרטי התחברות רק אם נבחר "זכור אותי"
            if (RememberMe) {
                localStorage.setItem('userName', UserName);
                localStorage.setItem('password', Password);
            } else {
                localStorage.removeItem('userName');
                localStorage.removeItem('password');
            }

            Swal.fire({
                icon: 'success',
                title: 'התחברת בהצלחה!',
                text: 'ברוך הבא!',
                confirmButtonText: 'המשך',
                timer: 2000,
                timerProgressBar: true,
                allowOutsideClick: false,
            }).then(() => {
                navigate('/home');
            });

        } catch (error: any) {
            if (error.response?.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'שגיאה',
                    html: 'משתמש לא רשום במערכת.<br><a href="/signup">להרשמה הקליקו כאן.</a>',
                    confirmButtonText: 'אישור'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'שגיאה בהתחברות',
                    text: 'נסה שוב מאוחר יותר.',
                    confirmButtonText: 'אישור'
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input
                    type="text"
                    placeholder="שם משתמש"
                    {...register("UserName")}
                />
                {errors.UserName && <small style={{ color: 'red' }}>{errors.UserName.message}</small>}
            </div>
            <div>
                <input
                    type="password"
                    placeholder="סיסמה"
                    {...register("Password")}
                />
                {errors.Password && <small style={{ color: 'red' }}>{errors.Password.message}</small>}
            </div>
            <div>
                <label htmlFor="RememberMe">
                    <input type="checkbox" {...register("RememberMe")} />
                    זכור אותי
                </label>
            </div>
            <input type="submit" value="התחבר" />
        </form>
    );
}