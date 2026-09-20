import { IRecipe } from "@/types/recipes.types";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";
import { Pressable, Image, View, Text } from "react-native";

const RecipeCard = ({ recipe }: { recipe: IRecipe }) => {
  const router = useRouter();

  const handleNavigation = (id: string) => {
    router.push(`/detail/${id}`);
  };

  return (
    <Pressable
      className="relative mt-4 rounded-xl overflow-hidden bg-white border border-cavern-pink"
      onPress={() => handleNavigation(String(recipe.id))}
    >
      <Image source={{ uri: recipe.thumbnail }} className="w-59.5 h-59.5" />
      <View className="flex flex-row gap-1 items-center bg-white py-1 px-3 rounded-lg absolute opacity-90 right-3 top-3">
        <Text className="text-orange-400">★</Text>
        <Text className="text-cod-gray text-[12px] font-medium">
          {recipe.rating}
        </Text>
      </View>
      <View className="p-3 gap-1">
        <Text className="font-semibold text-base text-cod-gray">
          {recipe.name}
        </Text>
        <View className="flex flex-row items-center gap-2">
          <View className="flex flex-row items-center gap-1">
            <AntDesign name="field-time" size={16} color="black" />
            <Text className="font-medium text-sm text-kabul">
              {recipe.prepTimeMinutes}m
            </Text>
          </View>
          <View className="h-1.5 w-1.5 bg-kabul opacity-80 rounded-full" />
          <View className="flex flex-row items-center gap-1">
            <Text className="font-medium text-sm text-kabul">
              {recipe.calorie}
            </Text>
            <SimpleLineIcons name="energy" size={16} color="black" />
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RecipeCard;
