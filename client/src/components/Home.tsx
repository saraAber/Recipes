import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import '../Repositories/pictures/Background.png';

// טיפוס עבור מתכון
type Recipe = {
  id: number;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  prepTime: string;
  favorite: boolean;
  dateAdded: string;
};

const Home: React.FC = () => {
  // מתכונים אחרונים שנוספו
  const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([
    {
      id: 1,
      title: "עוגת גבינה של סבתא",
      category: "קינוחים",
      description: "עוגת גבינה אפויה בסגנון ישן עם בסיס פריך ומילוי קרמי",
      imageUrl: "/api/placeholder/400/300",
      prepTime: "שעה וחצי",
      favorite: true,
      dateAdded: "03.05.2025"
    },
    {
      id: 2,
      title: "מרק ירקות שורש מסורתי",
      category: "מרקים",
      description: "מרק חם ומחמם עם שורשים מקומיים, מושלם לימי החורף",
      imageUrl: "/api/placeholder/400/300",
      prepTime: "45 דקות",
      favorite: false,
      dateAdded: "01.05.2025"
    },
    {
      id: 3,
      title: "לחם כפרי מחמצת",
      category: "מאפים",
      description: "לחם ביתי עם קראסט פריך וטעם עשיר במיוחד",
      imageUrl: "/api/placeholder/400/300",
      prepTime: "3 שעות",
      favorite: true,
      dateAdded: "28.04.2025"
    }
  ]);

  // מתכונים מועדפים
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([
    {
      id: 1,
      title: "עוגת גבינה של סבתא",
      category: "קינוחים",
      description: "עוגת גבינה אפויה בסגנון ישן עם בסיס פריך ומילוי קרמי",
      imageUrl: "/api/placeholder/400/300",
      prepTime: "שעה וחצי",
      favorite: true,
      dateAdded: "03.05.2025"
    },
    {
      id: 4,
      title: "פשטידת תפוחי אדמה",
      category: "תבשילים",
      description: "פשטידה עשירה וטעימה לארוחות משפחתיות",
      imageUrl: "/api/placeholder/400/300",
      prepTime: "שעה",
      favorite: true,
      dateAdded: "25.04.2025"
    },
    {
      id: 3,
      title: "לחם כפרי מחמצת",
      category: "מאפים",
      description: "לחם ביתי עם קראסט פריך וטעם עשיר במיוחד",
      imageUrl: "/api/placeholder/400/300",
      prepTime: "3 שעות",
      favorite: true,
      dateAdded: "28.04.2025"
    }
  ]);

  // קטגוריות פופולריות
  const categories = [
    { id: 1, name: "מאפים", count: 12, icon: "🍞" },
    { id: 2, name: "תבשילים", count: 18, icon: "🍲" },
    { id: 3, name: "מרקים", count: 8, icon: "🍵" },
    { id: 4, name: "קינוחים", count: 15, icon: "🍰" },
    { id: 5, name: "סלטים", count: 10, icon: "🥗" },
    { id: 6, name: "ארוחות בוקר", count: 7, icon: "🍳" },
    { id: 7, name: "מנות עיקריות", count: 20, icon: "🍽️" },
    { id: 8, name: "אוכל טבעוני", count: 9, icon: "🌱" },
    { id: 9, name: "אוכל ללא גלוטן", count: 5, icon: "🚫🌾" },
    { id: 10, name: "משקאות", count: 6, icon: "🍹" },
    { id: 11, name: "חטיפים", count: 11, icon: "🍿" },
    { id: 12, name: "פסטות", count: 13, icon: "🍝" },
    { id: 13, name: "פיצות", count: 10, icon: "🍕" },
    { id: 14, name: "גריל ובשרים", count: 14, icon: "🥩" },
    { id: 15, name: "דגים", count: 7, icon: "🐟" },
    { id: 16, name: "מטבח אסייתי", count: 9, icon: "🍜" },
    { id: 17, name: "מטבח איטלקי", count: 8, icon: "🇮🇹" },
    { id: 18, name: "מטבח ים תיכוני", count: 12, icon: "🌊" },
    { id: 19, name: "כריכים", count: 6, icon: "🥪" },
    { id: 20, name: "עוגיות", count: 16, icon: "🍪" }
  ];  

  // מצב עבור חיפוש מתכונים
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // פונקציה לטיפול בחיפוש
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      alert(`מחפש מתכונים עם: ${searchTerm}`);
      // כאן בעתיד יהיה ניתוב לעמוד תוצאות חיפוש
    }
  };

  // פונקציה להוספת מתכון לרשימת מועדפים
  const toggleFavorite = (id: number) => {
    setRecentRecipes(recipes => 
      recipes.map(recipe => 
        recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
      )
    );
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
    <div className="recipe-book-app">
      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>ספר המתכונים האישי שלך</h2>
            <p>ארגן, שמור וגלה את כל המתכונים האהובים עליך במקום אחד</p>
            
            <form className="search-form" onSubmit={handleSearch}>
              <div className="search-container">
                <input 
                  type="text" 
                  placeholder="חפש מתכון לפי שם, רכיב או קטגוריה..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="search-btn">חפש</button>
              </div>
            </form>
            
            <div className="hero-buttons">
              <a href="#" className="btn-primary">הוסף מתכון חדש</a>
              <a href="#categories" className="btn-secondary">עיין בקטגוריות</a>
            </div>
          </div>
        </section>

        <section className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon">📘</div>
            <div className="stat-number">63</div>
            <div className="stat-label">מתכונים במאגר</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-number">15</div>
            <div className="stat-label">מתכונים מועדפים</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-number">5</div>
            <div className="stat-label">התווספו החודש</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔖</div>
            <div className="stat-number">8</div>
            <div className="stat-label">קטגוריות</div>
          </div>
        </section>

        <section className="recent-recipes">
          <div className="section-header">
            <h2>המתכונים האחרונים שהוספת</h2>
            <a href="#" className="view-all">צפה בכל המתכונים</a>
          </div>
          
          <div className="recipe-grid">
            {recentRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-image">
                  <img src={recipe.imageUrl} alt={recipe.title} />
                  <span className="category-badge">{recipe.category}</span>
                  <button 
                    className={`favorite-btn ${recipe.favorite ? 'active' : ''}`}
                    onClick={() => toggleFavorite(recipe.id)}
                  >
                    {recipe.favorite ? '★' : '☆'}
                  </button>
                </div>
                <div className="recipe-content">
                  <div className="recipe-meta">
                    <span className="prep-time">{recipe.prepTime}</span>
                    <span className="date-added">נוסף: {recipe.dateAdded}</span>
                  </div>
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                  <div className="recipe-actions">
                    <a href="#" className="btn-view">צפה במתכון</a>
                    <a href="#" className="btn-edit">ערוך</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="categories" className="categories">
          <div className="section-header">
            <h2>עיון לפי קטגוריות</h2>
            <p>כל המתכונים מסודרים בקטגוריות לנוחותך</p>
          </div>
          
          <div className="category-container">
            {categories.map(category => (
              <div key={category.id} className="category-item">
                <div className="category-icon">{category.icon}</div>
                <h3>{category.name}</h3>
                <span className="category-count">{category.count} מתכונים</span>
                <a href="#" className="category-link">צפה בקטגוריה</a>
              </div>
            ))}
          </div>
        </section>

        <section className="favorite-recipes">
          <div className="section-header">
            <h2>המתכונים המועדפים עליך</h2>
            <a href="#" className="view-all">צפה בכל המועדפים</a>
          </div>
          
          <div className="recipe-grid">
            {favoriteRecipes.map(recipe => (
              <div key={recipe.id} className="recipe-card">
                <div className="recipe-image">
                  <img src={recipe.imageUrl} alt={recipe.title} />
                  <span className="category-badge">{recipe.category}</span>
                  <button className="favorite-btn active">★</button>
                </div>
                <div className="recipe-content">
                  <div className="recipe-meta">
                    <span className="prep-time">{recipe.prepTime}</span>
                    <span className="date-added">נוסף: {recipe.dateAdded}</span>
                  </div>
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                  <div className="recipe-actions">
                    <a href="#" className="btn-view">צפה במתכון</a>
                    <a href="#" className="btn-edit">ערוך</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="add-recipe-cta">
          <div className="cta-content">
            <div className="cta-icon">📝</div>
            <h2>יש לך מתכון חדש להוסיף?</h2>
            <p>הוסף את המתכונים האהובים עליך לספר המתכונים האישי שלך</p>
            <a href="#" className="btn-primary">הוסף מתכון חדש</a>
          </div>
        </section>

        <section className="tips">
  <div className="section-header">
    <h2>טיפים לשימוש בספר המתכונים</h2>
  </div>

  <div className="tips-container">
    <div className="tip-card">
      <div className="tip-icon">🔍</div>
      <h3>חיפוש חכם</h3>
      <p>חפש מתכונים לפי שם, רכיבים, זמן הכנה או קטגוריה</p>
    </div>
    <div className="tip-card">
      <div className="tip-icon">⭐</div>
      <h3>סימון מועדפים</h3>
      <p>סמן מתכונים כמועדפים לגישה מהירה אליהם</p>
    </div>
    <div className="tip-card">
      <div className="tip-icon">📱</div>
      <h3>גישה מכל מקום</h3>
      <p>המתכונים שלך זמינים בכל מכשיר ובכל זמן</p>
    </div>
    <div className="tip-card">
      <div className="tip-icon">🔄</div>
      <h3>עריכה קלה</h3>
      <p>ערוך והתאם את המתכונים לטעם האישי שלך</p>
    </div>
    <div className="tip-card">
      <div className="tip-icon">🧾</div>
      <h3>רשימת קניות חכמה</h3>
      <p>הוסף רכיבים מרשימת המתכונים ישירות לרשימת קניות</p>
    </div>
    <div className="tip-card">
      <div className="tip-icon">📸</div>
      <h3>העלאת תמונות</h3>
      <p>הוסף תמונות משלך לכל מתכון כדי לשתף השראה</p>
    </div>
    <div className="tip-card">
      <div className="tip-icon">👨‍🍳</div>
      <h3>מתכונים מותאמים</h3>
      <p>קבל המלצות מותאמות אישית לפי מה שאתה אוהב לבשל</p>
    </div>
    <div className="tip-card">
      <div className="tip-icon">🕒</div>
      <h3>זמני הכנה</h3>
      <p>סנן מתכונים לפי זמן ההכנה כדי להתאים ללוח הזמנים שלך</p>
    </div>
    <div className="tip-card">
      <div className="tip-icon">🗂️</div>
      <h3>ניהול לפי קטגוריות</h3>
      <p>סדר את המתכונים בתיקיות לפי נושאים וסוגים</p>
    </div>
    <div className="tip-card">
      <div className="tip-icon">📝</div>
      <h3>כתיבת הערות</h3>
      <p>הוסף תובנות אישיות וטיפים משלך לכל מתכון</p>
    </div>
  </div>
</section>
      </main>
    </div>
  );
};

export default Home;