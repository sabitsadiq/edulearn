import { HelloWave } from "@/components/HelloWave";
import { ActivityIndicator, FlatList, Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import axios from "axios";
import { password, username } from "@/utils/apiKeys";
import { useQuery } from "@tanstack/react-query";
import CourseItem from "@/components/CourseItem";

interface Course {
  id: number;
  title: string;
  subtitle: string;
  image_480x270: string;
  is_paid: string;
  price: string;
  num_reviews: number;
}

interface SearchResponse {
  results: Course[];
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: "business", name: "Business", icon: "briefcase-outline" },
  { id: "tech", name: "Tech", icon: "hardware-chip-outline" },
  { id: "design", name: "Design", icon: "color-palette-outline" },
  { id: "marketing", name: "Marketing", icon: "megaphone-outline" },
  { id: "health", name: "Health", icon: "fitness-outline" },
  { id: "music", name: "Music", icon: "musical-notes-outline" },
  { id: "lifestyle", name: "Lifestyle", icon: "heart-outline" },
];

const fetchCourses = async (searchTerm: string): Promise<SearchResponse> => {
  const response = axios.get(`https://www.udemy.com/api-2/courses/`, {
    params: { search: searchTerm },
    auth: {
      username: username,
      password: password
    }

  });
  return response.data;
}
const fetchRecommendedCourses = async (): Promise<SearchResponse> => {
  const response = axios.get(`https://www.udemy.com/api-2/courses/`, {
    auth: {
      username: username,
      password: password
    }

  });
  return response.data;
}
export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState("business");

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["searchCourses", selectedCategory],
    queryFn: () => fetchCourses(selectedCategory),
    enabled: true
  })
  const { data: recommendedcourse, error: recommendecourseError, isLoading: recommendecourseLoading } = useQuery({
    queryKey: ["recommendedcourse"],
    queryFn: () => fetchRecommendedCourses(),
  })

  const renderCategories = ({ item }: { item: Category }) => {
    return (
      <Pressable
        onPress={() => setSelectedCategory(item.id)}
        className="mr-4 p-4 rounded-full items-center flex-col gap-4"
      >
        <View
          className={`p-4 rounded-full flex-row items-center ${selectedCategory === item.id
            ? "border border-blue-700"
            : "border border-gray-400"
            }`}
        >
          <Ionicons
            name={item.icon as any}
            size={24}
            color={selectedCategory === item.id ? "#1d4ed8" : "gray"}
          />
        </View>
        <Text
          style={{
            fontFamily: selectedCategory === item.id ? "BarlowBold" : "BarlowMedium",
          }}
        >
          {item.name}
        </Text>
      </Pressable>
    );
  };

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
            <Text
              className="text-white text-2xl"
              style={{ fontFamily: "BarlowBold" }}
            >
              Marisson Kalao
            </Text>
          </View>
          <View>
            <MaterialCommunityIcons
              size={30}
              name="bell-badge-outline"
              color="white"
            />
          </View>
        </Animated.View>
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
      <ScrollView className="flex-1 bg-white gap-4">
        {/* Category */}
        <Animated.View
          className={"gap-6"}
          entering={FadeInDown.duration(500).delay(200).springify()}
        >
          <View className="flex-row justify-between px-6 pt-4 items-center">
            <Text className="text-xl" style={{ fontFamily: "BarlowBold" }}>
              Explore Topics
            </Text>
            <Text className="text-blue-700" style={{ fontFamily: "BarlowSemiBold" }}>
              See more
            </Text>
          </View>
          {/* Category List */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => renderCategories({ item: category }))}
          </ScrollView>
        </Animated.View>
        {/* Category Course */}
        {isLoading ? (<View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#2563eb" />
        </View>) : error ? (<Text>Error:{(error as Error).message}</Text>) : data?.results ? (
          <FlatList
            horizontal={true}
            data={data.results}
            renderItem={({ item }) => (<CourseItem course={item} customStyle="w-[22rem] pl-6" />)}
            keyExtractor={(item) => item.id.toString()} showsHorizontalScrollIndicator={false}
          />) : (<View className="flex-1 justify-center items-center">
            <Text>No results. Try search for a different course.</Text>
          </View>)}
        {/* Recommended Courses */}
        <View className="pt-6">
          <View className="flex-row justify-between px-6 pt-4 items-center">
            <Text className="text-xl" style={{ fontFamily: "BarlowBold" }}>
              Recommended Courses
            </Text>
            <Text className="text-blue-700" style={{ fontFamily: "BarlowSemiBold" }}>
              See more
            </Text>
          </View>
          {recommendecourseLoading ? (<View className="flex-1 items-center justify-center pt-8">
            <ActivityIndicator size="large" color="#2563eb" />
          </View>) : recommendecourseError ? (<Text>Error:{(error as Error).message}</Text>) : recommendedcourse?.results ? (
            <FlatList
              horizontal={true}
              data={recommendedcourse?.results}
              renderItem={({ item }) => (<CourseItem course={item} customStyle="w-[22rem] pl-6" />)}
              keyExtractor={(item) => item.id.toString()} showsHorizontalScrollIndicator={false}
            />) : (<View className="flex-1 justify-center items-center">
              <Text>No results. Try search for a different course.</Text>
            </View>)}
        </View>
      </ScrollView>
    </View>
  );
}
