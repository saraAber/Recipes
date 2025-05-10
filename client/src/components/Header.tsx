// import { Link, Outlet } from 'react-router-dom';
// import '../styles/Header.css'

// const Header = () => {
//     return (
//         <>
//             <header className="header">
//                 <div className="logo-container">
//                     <img src={Logo} alt="לוגו מתכוני סבתא" className="logo-animated" />
//                 </div>
//                 <nav className="main-nav">
//                     <ul>
//                         <li className="header-menu-item"><Link to="/login">כניסה</Link></li>
//                         <li className="header-menu-item"><Link to="/home">בית</Link></li>
//                         <li className="header-menu-item"><Link to="/recipes">מתכונים</Link></li>
//                         <li className="header-menu-item"><Link to="/addrecipe">הוספת מתכון</Link></li>
//                         <li className="header-menu-item"><Link to="/logout">יציאה</Link></li>
//                     </ul>
//                 </nav>
//                 <div className="search-icon">
//                     <span>🔍</span>
//                 </div>
//             </header>
//             <Outlet />
//         </>
//     );
// };

// export default Header;

import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Logo from '../Repositories/pictures/Logo.png'
import '../styles/Header.css';

interface HeaderProps {
    // ניתן להוסיף פרופס לפי הצורך
}

const Header: React.FC<HeaderProps> = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-container">
                    <Link to="/home"><img src={Logo} alt="לוגו מתכוני סבתא" className="logo-animated" /></Link>
                </div>

                <button className="menu-toggle" onClick={toggleMenu}>
                    <span className="menu-icon"></span>
                </button>

                <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><Link to="/login">כניסה</Link></li>
                        <li><Link to="/signup">הרשמה</Link></li>
                        <li><Link to="/recipes">כל המתכונים</Link></li>
                        <li><a href="#">קטגוריות</a></li>
                        <li><a href="#">מועדפים</a></li>
                        <li className="add-recipe-btn"><Link to="/addrecipe">הוסף מתכון חדש +</Link></li>
                        <li><Link to="/logout">יציאה</Link></li>

                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;