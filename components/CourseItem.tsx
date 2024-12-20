import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Course } from '@/types/types';
import { useWishListStore } from '@/store/wishListStore';

interface CourseItemProps {
    course: Course;
    customStyle?: string;
    index: number;
}

const CourseItem: React.FC<CourseItemProps> = ({
    course,
    customStyle,
    index
}) => {
    const { addToWishList, removeFromWishList, isInWishList } = useWishListStore();

    const isWishListed = isInWishList(course.id)

    const toggleWishlist = () => {
        if (isWishListed) {
            removeFromWishList(course.id)
        } else {
            addToWishList(course)
        }
    }


    return (
        <Pressable className={"pt-4" + { customStyle? customStyle: "" }}>
            <Animated.View className={"gap-2 w-full border border-gray-300 overflow-hidden rounded-2xl"} entering={FadeInDown.duration(100).delay(index * 300).springify()}>
                <Image source={{ uri: course.image_480x270 }} className='w-full h-40' />
                <View className='px-4 p-2'>
                    <Text className='text-lg min-h-16'
                        style={{ fontFamily: "BarlowBold" }}>{course.title}</Text>
                    <View className='flex-row items-center pt-2 pb-4 justify-between'>
                        <Text>{course.is_paid ? `${course.price}` : "Free"}</Text>
                    </View>
                    <Pressable onPress={toggleWishlist}><Ionicons size={24} color={isWishListed ? "red" : "gray"} name={isWishListed ? "heart" : "heart-outline"} /></Pressable>
                </View>
            </Animated.View>
        </Pressable>
    )
}

export default CourseItem