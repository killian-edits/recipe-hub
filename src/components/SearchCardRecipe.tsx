import { Image, Pressable, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import { IAddToFavourite, IRecipe } from "../types/recipes.types";
import AntDesign from "@expo/vector-icons/AntDesign";

const SearchCardRecipe = ({
  recipe,
  onHandleAddToFavourites,
}: {
  recipe: IRecipe;
  onHandleAddToFavourites: (obj: IAddToFavourite) => void;
}) => {
  const router = useRouter();

  const handleNavigation = (id: string) => {
    router.push(`/detail/${id}`);
  };

  return (
    <Pressable
      onPress={() => handleNavigation(String(recipe.id))}
      key={recipe.id}
      className="relative rounded-3xl shadow-lg mt-4 overflow-hidden"
    >
      <Image source={{ uri: recipe.thumbnail }} className="w-full h-59.5" />
      <View className="absolute top-4 left-4 flex flex-row gap-1 items-center bg-ebb py-2 px-2.5 rounded-full">
        <AntDesign name="field-time" size={16} color="black" />
        <Text className="text-cod-gray text-[12px] font-medium">
          {recipe.prepTimeMinutes}m
        </Text>
      </View>

      <View className="absolute top-4 left-24 flex flex-row gap-1 items-center bg-ebb py-1.5 px-2.5 rounded-full">
        <Text className="text-burning-orange">★</Text>
        <Text className="text-cod-gray text-[0.75rem] font-medium">
          {recipe.rating}
        </Text>
      </View>

      <Pressable
        onPress={() =>
          onHandleAddToFavourites({
            recipeId: recipe.id,
            title: recipe.name,
            image: recipe.thumbnail,
            cookTime: String(recipe.prepTimeMinutes),
            servings: String(recipe.servings),
            description: recipe.shortDescription,
          })
        }
        className="absolute top-4 right-4 flex flex-row gap-1 items-center bg-ebb py-2 px-2.5 rounded-full"
      >
        <Entypo name="heart-outlined" size={24} color="black" />
      </Pressable>

      <View className="p-4">
        <Text className="text-xl font-medium">{recipe.name}</Text>
        <Text className="mt-1 text-kabul">{recipe.shortDescription}</Text>
      </View>
    </Pressable>
  );
};

export default SearchCardRecipe;
