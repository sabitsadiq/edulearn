import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'
import Button from '@/components/Button'
import { router } from 'expo-router'
import LottieView from 'lottie-react-native';

export default function Welcome() {
    const animation = useRef<LottieView>(null)
    return (
        <View className='gap-4 p-4 flex-1 items-center justify-center bg-white'>
            <Animated.View
                className={"w-full"}
                entering={FadeInDown.duration(300).springify()}
            >
                <LottieView
                    ref={animation}
                    source={require("../assests/animation/learner.json")}
                    autoPlay
                    loop
                    style={{ width: "100%", height: 400 }}
                />
            </Animated.View>
            <Animated.View
                className={"w-full"}
                entering={FadeInDown.duration(300).delay(200).springify()}
            >

                <Text
                    className='text-5xl text-center leading-[3.5rem]'
                    style={{ fontFamily: "BarlowExtraBold" }}
                >
                    Discover and improve your skills.
                </Text>
            </Animated.View>
            <Animated.View
                className={"w-full"}
                entering={FadeInDown.duration(300).delay(200).springify()}
            >

                <Text
                    className='text-xl text-center leading-[2rem]'
                    style={{ fontFamily: "BarlowSemiBold" }}
                >
                    Learn from the best course & tutorials.
                </Text>
            </Animated.View>
            <Animated.View
                className={"w-full justify-center items-center mt-8"}
                entering={FadeInDown.duration(300).delay(600).springify()}
            >

                <Button
                    title='Get Started'
                    action={() => router.push("/(tabs)")}
                />
            </Animated.View>
        </View>
    )
}