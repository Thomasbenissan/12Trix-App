import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';

const YellowPlateMenu = ({ style, onItemPress }) => {
    return (
        <ImageBackground source={require('../../assets/menu-bg-3.png')} resizeMode="contain" style={[styles.container, style]}>
            <Text style={styles.title}>3</Text>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Hands')}>
                <Text style={styles.menuItemText}>Hands</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/hands-icon.png')} style={{ width: 66, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Tails')}>
                <Text style={styles.menuItemText}>Tails</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/tails-icon.png')} style={{ width: 38, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Heads')}>
                <Text style={styles.menuItemText}>Heads</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/heads-icon.png')} style={{ width: 51, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Gnomes')}>
                <Text style={styles.menuItemText}>Gnomes</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/gnoms-icon.png')} style={{ width: 30.46, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Green Giants')}>
                <Text style={styles.menuItemText}>Green Giants</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/green-giants-icon.png')} style={{ width: 58, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Baldness')}>
                <Text style={styles.menuItemText}>Baldness</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/bald-heads-icon.png')} style={{ width: 52, height: 37 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Camels')}>
                <Text style={styles.menuItemText}>Camels</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/camels-icon.png')} style={{ width: 67, height: 38 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Peppers')}>
                <Text style={styles.menuItemText}>Peppers</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/peppers-icon.png')} style={{ width: 48, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Flies')}>
                <Text style={styles.menuItemText}>Flies</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/flies-icon.png')} style={{ width: 43.39, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Names')}>
                <Text style={styles.menuItemText}>Names</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/grid-icon.png')} style={{ width: 48.33, height: 42 }} />
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default YellowPlateMenu;

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
        justifyContent: 'space-between',
        paddingBottom: 2
    },
    menuItemIcon: {
        width: 67,
        alignItems: 'center',
        justifyContent: 'center'
    },
    menuItemText: {
        fontFamily: 'Rubik-Regular',
        color: '#ffffff',
        fontSize: 24,
        lineHeight: 28,
    }
});