import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';

const GreenPlateMenu = ({ style, onItemPress, navigation }) => {
    return (
        <ImageBackground source={require('../../assets/menu-bg-5.png')} resizeMode="contain" style={[styles.container, style]}>
            <Text style={styles.title}>5</Text>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('1')}>
                <Image source={require('../../assets/green-1.png')} style={{ width: 14, height: 22, objectFit: 'contain' }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('2')}>
                <Image source={require('../../assets/green-2.png')} style={{ width: 19, height: 22, objectFit: 'contain' }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('3')}>
                <Image source={require('../../assets/green-3.png')} style={{ width: 19, height: 22, objectFit: 'contain' }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('4')}>
                <Image source={require('../../assets/green-4.png')} style={{ width: 20, height: 22, objectFit: 'contain' }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('5')}>
                <Image source={require('../../assets/green-5.png')} style={{ width: 19, height: 22, objectFit: 'contain' }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('6')}>
                <Image source={require('../../assets/green-6.png')} style={{ width: 19, height: 22, objectFit: 'contain' }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('7')}>
                <Image source={require('../../assets/green-7.png')} style={{ width: 17, height: 22, objectFit: 'contain' }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('8')}>
                <Image source={require('../../assets/green-8.png')} style={{ width: 19, height: 22, objectFit: 'contain' }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('9')}>
                <Image source={require('../../assets/green-9.png')} style={{ width: 19, height: 22, objectFit: 'contain' }} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('10')}>
                <Image source={require('../../assets/green-10.png')} style={{ width: 35, height: 22, objectFit: 'contain' }} />
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default GreenPlateMenu;

const styles = StyleSheet.create({
    container: {
        width: 391,
        height: 755,
        objectFit: 'fill',
        padding: 36,
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Rubik-ExtraBold',
        color: '#ffffff',
        fontSize: 64,
        lineHeight: 76,
        textAlign: 'center',
        marginBottom: 12
    },
    menuItem: {
        width: 235,
        height: 56,
        borderBottomColor: '#E8F8FF',
        borderBottomWidth: 2,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 6
    },
    menuItemIcon: {
        width: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuItemText: {
        fontFamily: 'Rubik-ExtraBold',
        color: '#F37735',
        fontSize: 28,
        lineHeight: 33,
        textShadowColor: '#ffffff',
        textShadowOffset: {
            width: 1,
            height: 1,
        },
        textShadowRadius: 10,
    }
});