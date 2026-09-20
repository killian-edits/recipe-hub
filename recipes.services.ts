import { IAddToFavourite } from "@/types/recipes.types";
import { convertKeysToCamelCase } from "@/utils/app.utils";
import { BASE_URL } from "@/utils/constants";

const fetchAllRecipes = async () => {
  try {
    const url = `${BASE_URL}/all-recipes`;
    const response = await fetch(url);
    const data = await response.json();
    const parsedRecipes = convertKeysToCamelCase(data);

    return parsedRecipes;
  } catch (error) {
    console.log("Error while fetching all recipes", error);
  }
};

const fetchAddToFavorites = async (requestPayload: IAddToFavourite) => {
  try {
    const url = `${BASE_URL}/add-to-favorites`;
    const { userId, recipeId, title, image, cookTime, servings, description } =
      requestPayload || {};

    const payload = {
      userId,
      recipeId,
      title,
      image,
      cookTime,
      servings,
      description,
    };
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error while adding to favorites");
  }
};

const fetchUserFavoritesRecipes = async (userId: string) => {
  try {
    const url = `${BASE_URL}/favorites/${userId}`;
    const response = await fetch(url);
    const data = await response.json();
    const parsedData = await convertKeysToCamelCase(data);

    return parsedData;
  } catch (error) {
    console.log("Error while fetching user saved recipes", error);
  }
};

const fetchRecipeDetails = async (recipeId: string) => {
  try {
    const url = `${BASE_URL}/detail/${recipeId}`;
    const response = await fetch(url);
    const data = response.json();
    const parsedData = convertKeysToCamelCase(data);

    return data;
  } catch (error) {
    console.log("Error while fetching recipe details", error);
  }
};

export {
  fetchAllRecipes,
  fetchAddToFavorites,
  fetchUserFavoritesRecipes,
  fetchRecipeDetails,
};
