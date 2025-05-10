import axios from "axios"
import Recipe from "../Repositories/Recipe"
import { useEffect, useState } from "react"
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import { logo } from "../Repositories/MyWebsite"
import logo from "../Repositories/pictures/Logo.png"
import { useNavigate } from "react-router-dom";
import ShowRecipe from "./ShowRecipe";
import RecipeStore from "../Repositories/stores/RecipeStore";

const Recipes = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        getRecipes()
        console.log(recipes)
    }, [])

    const getRecipes = async () => {
        setLoading(true)
        await axios.get('http://localhost:8080/api/recipe')
            .then(response => {
                setRecipes(response.data)
            })
            .catch((error) => {
                console.error('Registration failed:', error.message)
            })
        setLoading(false)
    }

    const handleEdit = async (recipe: Recipe) => {
        const response = await axios.post('http://localhost:8080/api/recipe/edit', recipe)
            .then(() => {
                getRecipes()
            })
            .catch((error) => {
                console.error('Registration failed:', error.message)
            })
        return response
    }

    const handleDelete = async (id: number) => {
        await axios.post(`http://localhost:8080/api/recipe/delete/${id}`, id)
            .then(() => {
                // setRecipes(recipes.filter(recipe => recipe.Id !== id))
                getRecipes()
            })
            .catch((error) => {
                console.error('Registration failed:', error.message)
            })
    }

    const handleAddToFavorites = () => {
        console.log("נוסף לרשימת המועדפים!");
    }

    const handleOpen = (recipe: Recipe) => {
        RecipeStore.setCurrentRecipe(recipe)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    };

    return (
        <div>
            <h1>Recipes</h1>
            <div style=
                {{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start', // מרכז את הכרטיסים
                    justifyContent: 'center', // מרכז את הכרטיסים במרכז
                    gap: 45, // רווח בין הכרטיסים (הערך כאן הוא בגודל של מדידה שניתן לשנות)
                }}>
                {recipes.map((recipe: Recipe) => {
                    return (
                        <div key={recipe.Id}>
                            <Card
                                sx={{ maxWidth: 345 }} onClick={() => handleOpen(recipe)}>
                                <CardHeader
                                    title={recipe.Name}
                                    subheader={recipe.Description}
                                />
                                <CardMedia
                                    component="img"
                                    sx={{
                                        height: 400,
                                        width: 350,
                                        objectFit: 'contain',
                                        transition: "0.3s",
                                        "&:hover": {
                                            filter: "brightness(80%)",
                                            transform: "scale(1.05)",
                                        },
                                    }}
                                    image={recipe.Img}
                                    onError={e => { e.currentTarget.src = logo }}
                                    alt={recipe.Name}
                                />
                                <CardActions disableSpacing onClick={(e) => e.stopPropagation()}>
                                    <Tooltip title="הוסף לרשימת המועדפים">
                                        <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
                                            <FavoriteIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="ערוך">
                                        <IconButton aria-label="edit" onClick={() => handleEdit(recipe)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="מחק">
                                        <IconButton aria-label="delete" onClick={() => handleDelete(recipe.Id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </CardActions>
                            </Card>
                            <ShowRecipe
                                open={open}
                                onClose={handleClose}
                                AddToFavorites={handleAddToFavorites}
                                Edit={handleEdit}
                                Delete={handleDelete}
                            />
                        </div>

                    )
                })}
            </div>
            <h2>Click me to add a recipe</h2>
            <button>click me👆🏼</button>

        </div>
    )
}

export default Recipes

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Recipe from "../Repositories/Recipe";
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardActions from '@mui/material/CardActions';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import logo from "../Repositories/pictures/Logo.jpg";
// import { useNavigate } from "react-router-dom";
// import ShowRecipe from "./ShowRecipe";
// import RecipeStore from "../Repositories/stores/RecipeStore";
// import '../styles/Recipes.css';

// const Recipes = () => {
//     const [recipes, setRecipes] = useState<Recipe[]>([]);
//     const [open, setOpen] = useState(false);
//     const [expandedRecipeId, setExpandedRecipeId] = useState<number | null>(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         getRecipes();
//     }, []);

//     const getRecipes = async () => {
//         await axios.get('http://localhost:8080/api/recipe')
//             .then(response => {
//                 setRecipes(response.data);
//             })
//             .catch((error) => {
//                 console.error('Registration failed:', error.message);
//             });
//     };

//     const handleEdit = async (recipe: Recipe) => {
//         await axios.post('http://localhost:8080/api/recipe/edit', recipe)
//             .then(() => {
//                 getRecipes();
//             })
//             .catch((error) => {
//                 console.error('Registration failed:', error.message);
//             });
//     };

//     const handleDelete = async (id: number) => {
//         await axios.post(`http://localhost:8080/api/recipe/delete/${id}`, id)
//             .then(() => {
//                 getRecipes();
//             })
//             .catch((error) => {
//                 console.error('Registration failed:', error.message);
//             });
//     };

//     const handleAddToFavorites = () => {
//         console.log("נוסף לרשימת המועדפים!");
//     };

//     const handleOpen = (recipe: Recipe) => {
//         RecipeStore.setCurrentRecipe(recipe);
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setExpandedRecipeId(null);
//     };

//     const toggleExpand = (id: number) => {
//         setExpandedRecipeId(expandedRecipeId === id ? null : id);
//     };

//     return (
//         <div>
//             <h1>Recipes</h1>
//             <div style={{
//                 display: 'flex',
//                 flexWrap: 'wrap',
//                 alignItems: 'flex-start',
//                 justifyContent: 'center',
//                 gap: 45,
//                 padding: 2
//             }}>
//                 {recipes.map((recipe: Recipe) => {
//                     const isExpanded = expandedRecipeId === recipe.Id;
//                     return (
//                         <div key={recipe.Id} style={{ position: 'relative' }}>
//                             <Card
//                                 sx={{
//                                     maxWidth: 345,
//                                     transition: '0.3s',
//                                 }}
//                                 onClick={() => toggleExpand(recipe.Id)}
//                             >
//                                 <CardHeader
//                                     title={recipe.Name}
//                                     subheader={recipe.Description}
//                                 />
//                                 <CardMedia
//                                     component="img"
//                                     sx={{
//                                         height: 400,
//                                         width: '100%',
//                                         objectFit: 'contain'
//                                     }}
//                                     image={recipe.Img}
//                                     onError={e => { e.currentTarget.src = logo }}
//                                     alt={recipe.Name}
//                                 />
//                                 <CardActions disableSpacing>
//                                     <Tooltip title="הוסף לרשימת המועדפים">
//                                         <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
//                                             <FavoriteIcon />
//                                         </IconButton>
//                                     </Tooltip>
//                                     <Tooltip title="ערוך">
//                                         <IconButton aria-label="edit" onClick={() => handleEdit(recipe)}>
//                                             <EditIcon />
//                                         </IconButton>
//                                     </Tooltip>
//                                     <Tooltip title="מחק">
//                                         <IconButton aria-label="delete" onClick={() => handleDelete(recipe.Id)}>
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </Tooltip>
//                                 </CardActions>
//                             </Card>
//                             {isExpanded && (
//                                 <div style={{
//                                     position: 'fixed',
//                                     top: 0,
//                                     left: 0,
//                                     right: 0,
//                                     bottom: 0,
//                                     backgroundColor: 'rgba(0, 0, 0, 0.5)', // רקע מעומעם
//                                     display: 'flex',
//                                     justifyContent: 'center',
//                                     alignItems: 'center',
//                                     zIndex: 1000
//                                 }} onClick={handleClose}>
//                                     <Card
//                                         sx={{
//                                             width: '90%', // גודל הכרטיס המורחב
//                                             maxWidth: 600,
//                                             transition: '0.3s',
//                                         }}
//                                     >
//                                         <CardHeader
//                                             title={recipe.Name}
//                                             subheader={recipe.Description}
//                                         />
//                                         <CardMedia
//                                             component="img"
//                                             sx={{
//                                                 height: '60%',
//                                                 width: '100%',
//                                                 objectFit: 'contain'
//                                             }}
//                                             image={recipe.Img}
//                                             onError={e => { e.currentTarget.src = logo }}
//                                             alt={recipe.Name}
//                                         />
//                                         <CardActions disableSpacing>
//                                             <Tooltip title="הוסף לרשימת המועדפים">
//                                                 <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
//                                                     <FavoriteIcon />
//                                                 </IconButton>
//                                             </Tooltip>
//                                             <Tooltip title="ערוך">
//                                                 <IconButton aria-label="edit" onClick={() => handleEdit(recipe)}>
//                                                     <EditIcon />
//                                                 </IconButton>
//                                             </Tooltip>
//                                             <Tooltip title="מחק">
//                                                 <IconButton aria-label="delete" onClick={() => handleDelete(recipe.Id)}>
//                                                     <DeleteIcon />
//                                                 </IconButton>
//                                             </Tooltip>
//                                         </CardActions>
//                                     </Card>
//                                 </div>
//                             )}
//                             <ShowRecipe
//                                 open={open}
//                                 onClose={handleClose}
//                             />
//                         </div>
//                     );
//                 })}
//             </div>
//             <h2>Click me to add a recipe</h2>
//             <button>click me👆🏼</button>
//         </div>
//     );
// }

// export default Recipes;
