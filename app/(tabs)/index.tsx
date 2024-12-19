import { HelloWave } from "@/components/HelloWave";
import { Pressable, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Greetings */}
      <View className="pt-16 pb-6 px-6 bg-[#2563eb]">
        <Animated.View className={"flex-row justify-between items-center"}>
          <View>
            <View className="flex-row items-end gap-2">
              <Text
                className="text-white text-lg"
                style={{ fontFamily: "BarlowMedium" }}
              >
                Good Morning
              </Text>
              <View>
                <HelloWave />
              </View>
            </View>
            <Text className="text-white text-2xl" style={{ fontFamily: "BarlowBold" }}>Marisson Kalao</Text>
          </View>
          <View>
            <MaterialCommunityIcons
              size={30}
              name="bell-badge-outline"
              color="white" />
          </View>
        </Animated.View>
      </View>
      {/* Search Area */}
      <Pressable onPress={() => router.push("/explore")}>
        <View className="flex-row items-center bg-white/20 rounded-2xl p-4 mt-4">
          <MaterialCommunityIcons name="magnify" size={20} color="white" />
          <Text
            className="text-white ml-2"
            style={{ fontFamily: "BarlowMedium" }}
          >
            What do you want to learn?
          </Text>
        </View>
      </Pressable>
    </View>
  );
}


