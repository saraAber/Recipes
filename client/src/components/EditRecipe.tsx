import { useState, useEffect } from 'react';
import axios from 'axios';
import Recipe from '../Repositories/Recipe';
import RecipeStore from '../Repositories/stores/RecipeStore';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import logo from "../Repositories/pictures/Logo.png";
import './EditRecipe.css';

interface EditRecipeProps {
  open: boolean;
  onClose: () => void;
  onSave: (recipe: Recipe) => Promise<void>;
  isNew?: boolean;
}

interface Ingredient {
  Name: string;
  Amount: number;
  Type: string;
}

const EditRecipe = (props: EditRecipeProps) => {
  const { open, onClose, onSave, isNew = false } = props;
  
  const initialState = {
    Id: 0,
    Name: '',
    Description: '',
    Img: '',
    Instructions: [''],
    Ingredients: [{ Name: '', Amount: 0, Type: '' }],
    Difficulty: 1,
    Duration: 0,
    UserId: 0, // Add default UserId
    CategoryId: 0, // Add default CategoryId
  };
  
  const [recipe, setRecipe] = useState<Recipe>(initialState);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    if (open) {
      if (!isNew && RecipeStore.currentRecipe) {
        setRecipe(JSON.parse(JSON.stringify(RecipeStore.currentRecipe)));
        setImagePreview(RecipeStore.currentRecipe.Img);
      } else {
        setRecipe(initialState);
        setImagePreview('');
      }
    }
  }, [open, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      [name]: value
    });
  };

  const handleDifficultyChange = (e: any) => {
    setRecipe({
      ...recipe,
      Difficulty: e.target.value
    });
  };

  const handleInstructionChange = (index: number, value: string) => {
    const newInstructions = [...recipe.Instructions];
    newInstructions[index] = value;
    setRecipe({
      ...recipe,
      Instructions: newInstructions
    });
  };

  const addInstruction = () => {
    setRecipe({
      ...recipe,
      Instructions: [...recipe.Instructions, '']
    });
  };

  const removeInstruction = (index: number) => {
    const newInstructions = [...recipe.Instructions];
    newInstructions.splice(index, 1);
    setRecipe({
      ...recipe,
      Instructions: newInstructions
    });
  };

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const newIngredients = [...recipe.Ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: value
    };
    setRecipe({
      ...recipe,
      Ingredients: newIngredients
    });
  };

  const addIngredient = () => {
    setRecipe({
      ...recipe,
      Ingredients: [...recipe.Ingredients, { Name: '', Amount: 0, Type: '' }]
    });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = [...recipe.Ingredients];
    newIngredients.splice(index, 1);
    setRecipe({
      ...recipe,
      Ingredients: newIngredients
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setRecipe({
          ...recipe,
          Img: base64String
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await onSave(recipe);
      onClose();
    } catch (error) {
      console.error('Failed to save recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      className="edit-recipe-dialog"
    >
      <DialogTitle className="dialog-title">
        {isNew ? 'הוספת מתכון חדש' : 'עריכת מתכון'}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Name"
              label="שם המתכון"
              name="Name"
              value={recipe.Name}
              onChange={handleChange}
              dir="rtl"
              className="text-field"
            />
            
            <TextField
              margin="normal"
              fullWidth
              id="Description"
              label="תיאור"
              name="Description"
              value={recipe.Description}
              onChange={handleChange}
              multiline
              rows={2}
              dir="rtl"
              className="text-field"
            />
            
            <Box className="difficulty-duration-container">
              <FormControl variant="outlined" className="form-control">
                <InputLabel id="difficulty-label">דרגת קושי</InputLabel>
                <Select
                  labelId="difficulty-label"
                  id="Difficulty"
                  value={recipe.Difficulty}
                  onChange={handleDifficultyChange}
                  label="דרגת קושי"
                >
                  <MenuItem value={1}>קל</MenuItem>
                  <MenuItem value={2}>בינוני</MenuItem>
                  <MenuItem value={3}>מורכב</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                type="number"
                margin="normal"
                id="Duration"
                label="זמן הכנה (דקות)"
                name="Duration"
                value={recipe.Duration}
                onChange={handleChange}
                inputProps={{ min: 0 }}
                className="text-field"
              />
            </Box>
            
            <Box className="image-upload-container">
              <Button
                variant="contained"
                component="label"
                className="upload-button"
              >
                העלאת תמונה
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
              
              {imagePreview && (
                <Card className="image-preview-card">
                  <CardMedia
                    component="img"
                    image={imagePreview}
                    onError={(e: any) => { e.target.src = logo }}
                    alt="תצוגה מקדימה של תמונת המתכון"
                    className="image-preview"
                  />
                </Card>
              )}
            </Box>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box className="section-title">מרכיבים</Box>
            {recipe.Ingredients.map((ingredient, index) => (
              <Box key={index} className="ingredient-row">
                <TextField
                  margin="dense"
                  label="שם המרכיב"
                  value={ingredient.Name}
                  onChange={(e) => handleIngredientChange(index, 'Name', e.target.value)}
                  dir="rtl"
                  className="ingredient-field"
                />
                <TextField
                  margin="dense"
                  label="כמות"
                  value={ingredient.Amount}
                  onChange={(e) => handleIngredientChange(index, 'Amount', e.target.value)}
                  className="amount-field"
                />
                <TextField
                  margin="dense"
                  label="סוג (כפית, כוס וכו')"
                  value={ingredient.Type}
                  onChange={(e) => handleIngredientChange(index, 'Type', e.target.value)}
                  dir="rtl"
                  className="type-field"
                />
                <IconButton
                  aria-label="מחק מרכיב"
                  onClick={() => removeIngredient(index)}
                  disabled={recipe.Ingredients.length <= 1}
                  className="remove-button"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addIngredient}
              className="add-button"
            >
              הוסף מרכיב
            </Button>
            
            <Box className="section-title">הוראות הכנה</Box>
            {recipe.Instructions.map((instruction, index) => (
              <Box key={index} className="instruction-row">
                <TextField
                  margin="dense"
                  fullWidth
                  label={`שלב ${index + 1}`}
                  value={instruction}
                  onChange={(e) => handleInstructionChange(index, e.target.value)}
                  multiline
                  dir="rtl"
                  className="instruction-field"
                />
                <IconButton
                  aria-label="מחק הוראה"
                  onClick={() => removeInstruction(index)}
                  disabled={recipe.Instructions.length <= 1}
                  className="remove-button"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button
              startIcon={<AddIcon />}
              onClick={addInstruction}
              className="add-button"
            >
              הוסף שלב
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions className="dialog-actions">
        <Button onClick={onClose} color="secondary">
          ביטול
        </Button>
        <Button 
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading || !recipe.Name}
        >
          {loading ? 'שומר...' : 'שמור'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRecipe;