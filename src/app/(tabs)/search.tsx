import SafeAreaView from "@/components/SafeAreaView";
import {
  fetchAddToFavorites,
  fetchAllRecipes,
} from "@/services/recipes.services";
import { IAddToFavourite, IRecipe } from "@/types/recipes.types";
import { useUser } from "@clerk/expo";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import SearchCardRecipe from "@/components/SearchCardRecipe";

const SearchScreen = () => {
  const { user } = useUser();
  const [searchValue, setSearchValue] = useState("");
  const [allRecipes, setAllRecipes] = useState<IRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipies] = useState<IRecipe[]>([]);

  const handleFetchAllRecipes = async () => {
    const response = await fetchAllRecipes();
    const recipes = response?.allRecipes ?? [];
    setAllRecipes(recipes);
    setFilteredRecipies(recipes);
  };

  const handleAddToFavorites = async (recipe: IAddToFavourite) => {
    if (!user) return;
    try {
      await fetchAddToFavorites({ userId: user.id, ...recipe });
    } catch (error) {
      console.log("Failed to add to favorites", error);
    }
  };
  useEffect(() => {
    const search = searchValue.trim().toLowerCase();

    if (!search) {
      setFilteredRecipies(allRecipes);
      return;
    }

    const filtered = allRecipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(search),
    );

    setFilteredRecipies(filtered);
  }, [searchValue, allRecipes]);

  useEffect(() => {
    handleFetchAllRecipes();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-vista-white p-4" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="relative">
          <TextInput
            className="h-12 rounded-lg bg-global-sand pl-12"
            placeholder="Search recipes..."
            placeholderTextColor="#594139"
            value={searchValue}
            onChangeText={setSearchValue}
          />
          <Feather
            name="search"
            size={22}
            color="#594139"
            style={{ position: "absolute", left: 12, top: 8 }}
          />
        </View>

        <View className="mt-4 pb-4">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <SearchCardRecipe
                key={recipe.id}
                recipe={recipe}
                onHandleAddToFavourites={handleAddToFavorites}
              />
            ))
          ) : (
            <Text className="mt-10 text-center text-base text-kabul">
              No recipes found
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
