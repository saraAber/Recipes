import React from 'react';
import '../styles/Footer.css';

interface FooterProps {
  // ניתן להוסיף פרופס לפי הצורך
}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>ספר המתכונים שלי</h3>
          <p>המקום לשמור ולארגן את כל המתכונים האהובים עליך</p>
        </div>
        
        <div className="footer-section">
          <h3>קישורים מהירים</h3>
          <ul>
            <li><a href="#">דף הבית</a></li>
            <li><a href="#">כל המתכונים</a></li>
            <li><a href="#">קטגוריות</a></li>
            <li><a href="#">מועדפים</a></li>
            <li><a href="#">הוספת מתכון</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>עזרה ותמיכה</h3>
          <ul>
            <li><a href="#">מדריך שימוש</a></li>
            <li><a href="#">שאלות נפוצות</a></li>
            <li><a href="#">צור קשר</a></li>
          </ul>
        </div>
      </div>
      
      <div className="copyright">
        <p>© {new Date().getFullYear()} ספר המתכונים שלי. כל הזכויות שמורות.</p>
      </div>
    </footer>
  );
};

export default Footer;