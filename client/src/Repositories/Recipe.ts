type Recipe = {
    Id: number
    Name: string
    Instructions: string[]
    Difficulty: number
    Duration: number
    Description: string
    UserId: number
    CategoryId: number
    Img: string
    Ingredients: Ingredient[]
}

type Ingredient = {
    Name: string
    Amount: number
    Type: string
}

export default Recipe