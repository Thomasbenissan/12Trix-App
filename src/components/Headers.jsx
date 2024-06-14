import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from 'react-native';
import { MenuIcon, VolumeIcon, MuteIcon } from '../components/Icons';
import Constants from 'expo-constants';
import MainMenu from '../screens/MainMenu';

export const HeaderWithMenu = ({ style }) => {
    return (
        <View style={[styles.headerWithMenu, style]}>
            <Image source={require('../../assets/header-logo.png')} style={{ width: 223, height: 19, objectFit: 'contain', }} />
            <TouchableOpacity style={styles.headerWithMenuBtn}>
                <MenuIcon />
            </TouchableOpacity>
        </View>
    )
}

export const HomeHeader = ({ style, onMenuPress }) => {
    const [isMute, setIsMute] = useState(false);
    const mainMenuTranslation = useRef(new Animated.Value(0)).current;

    const onMainMenuOpenTranslation = () => {
        Animated.timing(mainMenuTranslation, {
            toValue: 100,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }

    const onMainMenuCloseTranslation = () => {
        Animated.timing(mainMenuTranslation, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }

    return (
        <View style={{ position: 'relative', flex: 1, width: '100%' }}>
            <View style={[styles.homeHeader, style]}>
                <TouchableOpacity onPress={() => setIsMute(!isMute)} style={[styles.headerWithMenuBtn, { bottom: 10, left: 20 }]}>
                    {isMute ? <MuteIcon /> : <VolumeIcon />}
                </TouchableOpacity>
                <Image source={require('../../assets/header-logo.png')} style={{ width: 223, height: 19, objectFit: 'contain' }} />
                <TouchableOpacity style={[styles.headerWithMenuBtn, { bottom: 10, right: 20 }]} onPress={onMainMenuOpenTranslation}>
                    <MenuIcon />
                </TouchableOpacity>
            </View>

            <Animated.View style={[styles.mainMenu, {
                transform: [
                    {
                        translateX: mainMenuTranslation.interpolate({
                            inputRange: [0, 100],
                            outputRange: [360, 2],
                        })
                    },
                ]
            }]}>
                <MainMenu onClosePress={onMainMenuCloseTranslation} />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    headerWithMenu: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Constants.statusBarHeight + 16,
    },
    homeHeader: {
        backgroundColor: '#001744',
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight + 16,
        paddingBottom: 14,
        zInex: 150,
    },
    headerWithMenuBtn: {
        position: 'absolute',
        right: 0,
    },
    headerWithMenuLeftBtn: {
        position: 'absolute',
        left: 0,
    },
    mainMenu: {
        width: 355,
        height: '100%',
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 170,
        transform: [{ translateX: 360 }]
    }
});