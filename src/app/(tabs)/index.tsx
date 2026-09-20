import SafeAreaView from "@/components/SafeAreaView";
import { Image, Button, Text, View, ScrollView, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { IRecipe } from "@/types/recipes.types";
import { fetchAllRecipes } from "../../services/recipes.services";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import RecipeCard from "@/components/RecipeCard";

const HomeScreen = () => {
  const router = useRouter();
  const [allRecipes, setAllRecipes] = useState<IRecipe[]>([]);

  const handleGetAllRecipes = async () => {
    const response = await fetchAllRecipes();
    setAllRecipes(response?.allRecipes || []);
  };

  const handleNavigation = (id: string) => {
    router.push(`/detail/${id}`);
  };

  useEffect(() => {
    handleGetAllRecipes();
  }, []);

  if (allRecipes.length === 0) return null;

  return (
    <SafeAreaView className="h-full p-4 bg-vista-white" edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative">
          <Image
            source={{ uri: allRecipes[0].thumbnail }}
            className="w-full h-75 rounded-lg"
          />
          <View className="h-full opacity-10 rounded-lg w-full bg-black absolute"></View>
          <LinearGradient
            colors={["transparent", "rgba(0, 0, 0, 0.60)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 8,
            }}
          />
        </View>
        <View className="absolute top-[3.8rem] left-4 flex items-start">
          <View className="flex flex-row gap-2">
            <View className="flex flex-row gap-1 items-center bg-ebb py-1 px-3 rounded-full">
              <AntDesign name="field-time" size={16} color="black" />
              <Text className="text-cod-gray text-[12px] font-medium">
                {allRecipes[0].prepTimeMinutes} min
              </Text>
            </View>
            <View className="flex flex-row gap-1 items-center bg-ebb py-1 px-3 rounded-full">
              <Text className="text-burning-orange">★</Text>
              <Text className="text-cod-gray text-[12px] font-medium">
                {allRecipes[0].rating}
              </Text>
            </View>
          </View>
          <Text className="text-white text-[1.75rem] font-bold mt-3">
            {allRecipes[0].name}
          </Text>
          <Text className="text-white text-base mt-3">
            {allRecipes[0].shortDescription}
          </Text>
          <Pressable
            onPress={() => handleNavigation(String(allRecipes[0].id))}
            className="mt-3 bg-burning-orange rounded-lg px-4 py-3"
          >
            <Text className="text-white text-[0.875rem] font-semibold">
              View Recipe
            </Text>
          </Pressable>
        </View>

        <View className="mt-8">
          <Text className="text-cod-gray font-semibold text-[1.25rem]">
            Trending Now
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 18 }}
          >
            {allRecipes?.map((recipe) => {
              if (Number(recipe.rating) >= 4.8) {
                return <RecipeCard key={recipe.id} recipe={recipe} />;
              }
            })}
          </ScrollView>
        </View>

        <View className="mt-8 pb-24">
          <Text className="text-cod-gray font-semibold text-[1.25rem]">
            All Recipes
          </Text>
          {allRecipes?.map((recipe) => {
            return (
              <Pressable
                key={recipe.id}
                onPress={() => handleNavigation(String(recipe.id))}
                className="flex flex-row items-center gap-4 mt-4 border border-cavern-pink bg-white rounded-2xl"
              >
                <Image
                  source={{ uri: recipe.thumbnail }}
                  className="h-24 w-24 rounded-lg"
                />
                <View className="flex">
                  <Text className="text-cod gray text-lg font-medium">
                    {recipe.name}
                  </Text>
                  <Text className="kabul">
                    {recipe.shortDescription.length > 30
                      ? recipe.shortDescription.slice(0, 30) + "..."
                      : recipe.shortDescription}
                  </Text>
                  <View className="flex flex-row gap-3 mt-2">
                    <View className="flex flex-row gap-1 items-center">
                      <AntDesign name="field-time" size={16} color="black" />
                      <Text className="font-medium text-sm text-kabul">
                        {recipe.prepTimeMinutes}m
                      </Text>
                    </View>
                    <View className="flex flex-row gap-1 items-center">
                      <Text className="font-medium text-sm text-kabul">
                        <MaterialCommunityIcons
                          name="cookie-settings-outline"
                          size={16}
                          color="black"
                        />
                        {recipe.servings} Servings
                      </Text>
                    </View>
                    <View className="flex flex-row gap-1 items-center">
                      <Text className="text-orange-400">★</Text>
                      <Text className="font-medium text-sm text-kabul">
                        {recipe.rating}
                      </Text>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
