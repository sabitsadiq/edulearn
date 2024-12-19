import { View, Text } from 'react-native'
import React from 'react'
import Animated, { FadeInDown } from 'react-native-reanimated'

export default function Welcome() {
    return (
        <View className='gap-4 p-4 flex-1 items-center justify-center bg-white'>
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
        </View>
    )
}