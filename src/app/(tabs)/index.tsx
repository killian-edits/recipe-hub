import SafeAreaView from "@/components/SafeAreaView";
import { Image, Button, Text, View } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@clerk/expo";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
