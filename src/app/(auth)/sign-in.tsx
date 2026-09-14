import useSocialAuth from "@/hooks/useSocialAuth";
import { Image, Pressable, Text, View } from "react-native";

const SignInScreen = () => {
  const { handleSocialAuth } = useSocialAuth();

  return (
    <View>
      <Image source={require("@/assets/images/hero.png")} className="w-full" />
      <View className="-mt-12 h-full bg-white rounded-tr-[3rem] rounded-tl-[3rem] p-8 mb-16">
        <View className="flex gap-2 items-center">
          <Text className="text-center text-cod-gray text-4xl font-bold">
            Discover Amazing Recipes
          </Text>
          <Text className="text-base text-kabul text-center">
            Cook Smarter with thousands of curated recipes designed for every
            taste and skill level.
          </Text>
        </View>

        <View className="mt-6 gap-4 flex items-center">
          <Pressable
            onPress={() => handleSocialAuth("oauth_google")}
            className="cursor-pointer flex items-center justify-center flex-row gap-4 w-full border border-ebb py-4 rounded-full"
          >
            <Image
              source={require("@/assets/images/google.png")}
              className="w-5 h-5"
            />
            <Text className="text-base font-semibold text-cod-gray">
              Continue with Google
            </Text>
          </Pressable>

          <Pressable
            onPress={() => handleSocialAuth("oauth_apple")}
            className="bg-black cursor-pointer flex items-center justify-center flex-row gap-4 w-full border border-ebb py-4 rounded-full"
          >
            <Image
              source={require("@/assets/images/apple.png")}
              style={{ width: 20, height: 20, tintColor: "white" }}
            />
            <Text className="text-base font-semibold text-white">
              Continue with Apple
            </Text>
          </Pressable>

          <Text className="w-[80%] text-center mt-9 text-kabul font-medium">
            By continuing, you agree to our Terms and Privacy Policy.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;
