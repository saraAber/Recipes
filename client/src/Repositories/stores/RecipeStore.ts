// import Recipe from "../Recipe"
// import { makeAutoObservable } from 'mobx'

// class RecipeStore {
//     currentRecipe: Recipe | null = null

//     constructor() {
//         makeAutoObservable(this)
//     }
//     setCurrentRecipe(recipe: Recipe) {
//         this.currentRecipe = recipe
//     }
// }

// export default new RecipeStore()

import { makeAutoObservable } from 'mobx'
import Recipe from "../Recipe"

class RecipeStore {
    currentRecipe: Recipe | null = null  // טיפוס אופציונלי: Recipe או null

    constructor() {
        makeAutoObservable(this)  // הופך את כל המחלקה לאוטומטית לצפייה ושינוי
    }

    setCurrentRecipe(recipe: Recipe) {
        this.currentRecipe = recipe  // עדכון המצב של המתכון
    }

    getCurrentRecipe() {
        return this.currentRecipe  // מחזיר את המתכון הנוכחי
    }

    clearCurrentRecipe() {
        this.currentRecipe = null  // מאפס את המתכון הנוכחי
    }
}

export default new RecipeStore()  // יצירת מופע של RecipeStore