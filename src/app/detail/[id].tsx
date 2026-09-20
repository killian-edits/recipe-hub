import { IRecipe } from "@/types/recipes.types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import SafeAreaView from "@/components/SafeAreaView";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { fetchRecipeDetails } from "@/services/recipes.services";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const DetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recipeDetails, setRecipeDetails] = useState<IRecipe>();

  const handleFetchRecipeDetails = async () => {
    const response = await fetchRecipeDetails(id);
    setRecipeDetails(response.recipeDetail[0]);
  };

  useEffect(() => {
    handleFetchRecipeDetails();
  }, []);

  if (!recipeDetails) return null;

  return (
    <SafeAreaView className="h-full bg-vista-white" edges={["bottom"]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="relative">
          <Image
            source={{ uri: recipeDetails.thumbnail }}
            className="h-132 w-full"
            alt="detail-image"
          />
          <Pressable
            className="absolute top-20 left-6"
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </Pressable>
        </View>

        <View className="p-4">
          <Text className="font-bold text-[1.75rem]">{recipeDetails.name}</Text>
          <Text className="mt-2 text-kabul">
            {recipeDetails.shortDescription}
          </Text>

          <View className="mt-8 flex-row items-center gap-2">
            <View className="px-4 py-3 items-center justify-center flex-row gap-2 bg-white rounded-xl border border-ebb">
              <Text className="text-orange-400">★</Text>
              <Text className="font-bold text-kabul">
                {recipeDetails.rating} (120)
              </Text>
            </View>
            <View className="px-4 py-3 items-center justify-center flex-row gap-2 bg-white rounded-xl border border-ebb">
              <AntDesign name="field-time" size={16} color="black" />
              <Text className="font-bold text-kabul">
                {recipeDetails.prepTimeMinutes} mins
              </Text>
            </View>
            <View className="px-4 py-3 items-center justify-center flex-row gap-2 bg-white rounded-xl border border-ebb">
              <SimpleLineIcons name="energy" size={16} color="black" />
              <Text className="font-bold text-kabul">
                {recipeDetails.calorie} Cal
              </Text>
            </View>
          </View>

          <View className="mt-8">
            <Text className="text-xl font-semibold text-cod-gray">
              Ingredients
            </Text>
            <View className="border-b border-ebb mt-4"></View>
            <View className="gap-4 mt-8">
              {recipeDetails.ingredients.map((item) => {
                return (
                  <View key={item} className="flex-row gap-4 items-center">
                    <View className="h-8 w-8 rounded-lg border-[1.5px] border-kabul"></View>
                    <Text>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View className="p-4 bg-white border-ebb border rounded-2xl mt-8">
            <Text className="font-semibold text-cod-gray text-xl">
              Nutrition per serving
            </Text>
            <View className="mt-4 flex-row gap-2">
              <View className="flex-1 mx-1 items-center justify-center rounded-2xl bg-white p-4 shadow">
                <Text className="text-kabul text-sm font-medium">Protein</Text>
                <Text className="mt-1 text-xl font-bold text-cod-gray">
                  {recipeDetails.protein}g
                </Text>
              </View>

              <View className="flex-1 mx-1 items-center justify-center rounded-2xl bg-white p-4 shadow">
                <Text className="text-kabul text-sm font-medium">Carbs</Text>
                <Text className="mt-1 text-xl font-bold text-cod-gray">
                  {recipeDetails.carbs}g
                </Text>
              </View>

              <View className="flex-1 mx-1 items-center justify-center rounded-2xl bg-white p-4 shadow">
                <Text className="text-kabul text-sm font-medium">Fats</Text>
                <Text className="mt-1 text-xl font-bold text-cod-gray">
                  {recipeDetails.fats}g
                </Text>
              </View>
            </View>
          </View>

          <View className="mt-8">
            <Text className="text-xl font-semibold text-cod-gray">
              Instructions
            </Text>
            <View className="gap-4 mt-4">
              {recipeDetails.instructions.map((item) => {
                return (
                  <View
                    key={item}
                    className="border border-ebb flex-1 mx-1 items-start justify-center rounded-2xl bg-white p-4 shadow"
                  >
                    <Text className="font-medium text-lg text-kabul">
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailScreen;
