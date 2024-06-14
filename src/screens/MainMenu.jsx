import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { CloseIcon } from '../components/Icons';

const MainMenu = ({ style, onClosePress }) => {
    return (
        <ImageBackground source={require('../../assets/main-menu-bg.png')} resizeMode="contain" style={[styles.container, style]}>
            <TouchableOpacity onPress={onClosePress} style={styles.closeBtn}>
                <CloseIcon />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>New Problem</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.menuItemText}>Sent Problems</Text>
            </TouchableOpacity>

            <Image source={require('../../assets/robot-4.png')} style={styles.robotPic} />
        </ImageBackground>
    )
}

export default MainMenu;

const styles = StyleSheet.create({
    container: {
        width: 355,
        height: 932,
        objectFit: 'scale-down',
        padding: 36,
        position: 'relative',
        paddingTop: 92,
        paddingRight: 60
    },
    closeBtn: {
        width: 35,
        height: 35,
        position: 'absolute',
        top: 48,
        right: 24,
    },
    menuItem: {
        width: 248,
        height: 64,
        borderBottomWidth: 1,
        borderBottomColor: '#E8F8FF',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 18
    },
    menuItemText: {
        fontFamily: 'Rubik-Regular',
        color: '#ffffff',
        fontSize: 34,
        lineHeight: 41
    },
    robotPic: {
        width: 224,
        height: 561,
        objectFit: 'contain',
        position: 'absolute',
        top: 322,
        alignSelf: 'center'
        // left: '50%',
        // transform: [{ translateX: -112 }]
    }
});