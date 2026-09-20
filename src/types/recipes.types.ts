type IRecipe = {
  id: number;
  name: string;
  ingredients: string[];
  tags: string[];
  shortDescription: string;
  rating: string;
  prepTimeMinutes: number;
  servings: number;
  calorie: number;
  protein: number;
  carbs: number;
  fats: number;
  thumbnail: string;
  instructions: string[];
};

type IAddToFavourite = {
  id?: number;
  userId?: string;
  recipeId: number;
  title: string;
  image: string;
  cookTime: string;
  servings: string;
  description: string;
};

export { IRecipe, IAddToFavourite };
