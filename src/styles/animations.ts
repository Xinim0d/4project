import { Animated } from 'react-native';

export const fadeIn = (duration = 300) => {
    const opacity = new Animated.Value(0);
    Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
    }).start();
    return opacity;
};

export const fadeOut = (duration = 300) => {
    const opacity = new Animated.Value(1);
    Animated.timing(opacity, {
        toValue: 0,
        duration,
        useNativeDriver: true,
    }).start();
    return opacity;
};