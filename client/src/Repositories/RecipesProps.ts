import Recipe from "./Recipe"

export interface RecipesProps {
    open: boolean
    onClose: () => void
    AddToFavorites: () => void
    Edit: (recipe: Recipe) => void
    Delete: (id: number) => void
}