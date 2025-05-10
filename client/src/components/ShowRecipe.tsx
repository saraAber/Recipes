import Dialog from '@mui/material/Dialog';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import logo from "../Repositories/pictures/Logo.png"
import RecipeStore from '../Repositories/stores/RecipeStore';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Recipe from '../Repositories/Recipe';
import { RecipesProps } from '../Repositories/RecipesProps';

const ShowRecipe = (props: RecipesProps) => {
    const { open, onClose, AddToFavorites, Edit, Delete } = props;
    const recipe: Recipe | null = RecipeStore.currentRecipe;

    return (
        <Dialog
            onClose={onClose}
            open={open}
            // fullWidth
            maxWidth="md"
            BackdropProps={{
                style: {
                    backgroundColor: 'rgba(245, 245, 245, 0.2)',
                },
            }}
        >
            <Card sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
                <CardHeader
                    title={recipe?.Name}
                    subheader={recipe?.Description}
                    action={<IconButton onClick={onClose} aria-label="close"><CloseIcon /></IconButton>}
                />
                <div style={{ overflowY: 'auto', flexGrow: 1 }}>
                    <CardMedia
                        component="img"
                        image={recipe?.Img}
                        onError={e => { e.currentTarget.src = logo }}
                        alt={recipe?.Name}
                        sx={{ height: '70%', objectFit: 'contain' }}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ padding: 2 }}>
                        <strong>הוראות:</strong> {recipe?.Instructions.join(', ')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ padding: 2 }}>
                        <strong>דרגת קושי:</strong> {recipe?.Difficulty}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ padding: 2 }}>
                        <strong>משך זמן הכנה:</strong> {recipe?.Duration} דקות
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ padding: 2 }}>
                        <strong>מרכיבים:</strong>
                    </Typography>
                    <ul>
                        {recipe?.Ingredients && recipe?.Ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient.Amount} {ingredient.Type} של {ingredient.Name}</li>
                        ))}
                    </ul>
                </div>
                <CardActions>
                    <Tooltip title="הוסף לרשימת המועדפים">
                        <IconButton aria-label="add to favorites" onClick={AddToFavorites}>
                            <FavoriteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="עריכה">
                        <IconButton aria-label="edit" onClick={() => Edit(recipe!)}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="מחיקה">
                        <IconButton aria-label="delete" onClick={() => {Delete(recipe?.Id!); onClose()}}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        </Dialog>
    );
}

export default ShowRecipe;
