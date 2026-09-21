import SafeAreaView from "@/components/SafeAreaView";
import {
  fetchDeleteFavorites,
  fetchUserFavoritesRecipes,
} from "@/services/recipes.services";
import { IAddToFavourite } from "@/types/recipes.types";
import { useUser } from "@clerk/expo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
  Image,
} from "react-native";

const FavoritesScreen = () => {
  const router = useRouter();
  const [favoritesList, setFavoritesList] = useState<IAddToFavourite[]>([]);
  const { user } = useUser();

  const handleFetchFavoritesRecipes = async () => {
    if (!user) return null;

    const data = await fetchUserFavoritesRecipes(user.id);
    setFavoritesList(data || []);
  };

  const handleDeleteFavorites = async (id: number) => {
    if (!user) return null;

    try {
      await fetchDeleteFavorites(user.id, id);
    } catch (error) {
      console.log("Error while deleting favorite recipe", error);
    }

    handleFetchFavoritesRecipes();
  };

  const handleNavigation = (id: string) => {
    router.push(`/detail/${id}`);
  };

  useFocusEffect(
    useCallback(() => {
      handleFetchFavoritesRecipes();
    }, []),
  );

  return (
    <SafeAreaView className="h-full p-4 bg-vista-white" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-[2rem] font-bold">Favorites</Text>
        <Text className="mt-2 text-kabul">
          {favoritesList.length} Recipes saved for your next culinary adventure.
        </Text>

        <View className="mt-8 flex gap-8 pb-24">
          {favoritesList.map((recipe, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => handleNavigation(String(recipe.recipeId))}
                className="relative rounded-xl bg-white shadow overflow-hidden"
              >
                <Image
                  source={{ uri: recipe.image }}
                  className="w-full h-108"
                />
                <View className="absolute top-4 right-4 bg-white opacity-80 rounded-full p-3">
                  <AntDesign name="heart" size={24} color="#970000bf" />
                </View>
                <Pressable
                  onPress={() => handleDeleteFavorites(recipe.recipeId || 0)}
                  className="absolute top-20 right-4 bg-white opacity-80 rounded-full p-3"
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={22}
                    className="text-kabul"
                  />
                </Pressable>
                <View className="p-4">
                  <Text className="font-semibold text-xl">{recipe.title}</Text>
                  <Text className="mt-2 text-kabul">{recipe.description}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FavoritesScreen;
