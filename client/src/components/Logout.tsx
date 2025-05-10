import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import UserStore from '../Repositories/stores/UserStore';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (UserStore.currentUser) {
            UserStore.logout();

            Swal.fire({
                icon: 'success',
                title: 'התנתקת בהצלחה',
                text: 'נעבור למסך ההתחברות בעוד רגע...',
                confirmButtonText: 'אישור',
                timer: 2500,
                timerProgressBar: true,
                allowOutsideClick: false,
            }).then(() => {
                navigate('/login');
            });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'לא היית מחובר',
                text: 'אין צורך להתנתק. נעבור למסך ההתחברות...',
                confirmButtonText: 'אישור',
                timer: 2500,
                timerProgressBar: true,
                allowOutsideClick: false,
            }).then(() => {
                navigate('/login');
            });
        }
    }, [navigate]);

    return null;
};

export default Logout;