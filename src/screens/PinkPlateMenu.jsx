import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';

const PinkPlateMenu = ({ style, onItemPress }) => {
    return (
        <ImageBackground source={require('../../assets/menu-bg-1.png')} resizeMode="contain" style={[styles.container, style]}>
            <Text style={styles.title}>1</Text>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Grandma')}>
                <Text style={styles.menuItemText}>Grandma</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/grandma-icon.png')} style={{ width: 46, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Unicorn')}>
                <Text style={styles.menuItemText}>Unicorn</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/unicorn-icon.png')} style={{ width: 41, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Ephraim')}>
                <Text style={styles.menuItemText}>Ephraim</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/ephraim-icon.png')} style={{ width: 44, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Alien')}>
                <Text style={styles.menuItemText}>Alien</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/alien-icon.png')} style={{ width: 33, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Mouse')}>
                <Text style={styles.menuItemText}>Mouse</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/mouse-icon.png')} style={{ width: 49, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Hippo')}>
                <Text style={styles.menuItemText}>Hippo</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/hippo-icon.png')} style={{ width: 41, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Superman')}>
                <Text style={styles.menuItemText}>Superman</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/superman-icon.png')} style={{ width: 56.56, height: 40 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Princess')}>
                <Text style={styles.menuItemText}>Princess</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/princess-icon.png')} style={{ width: 41, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Pinocchio')}>
                <Text style={styles.menuItemText}>Pinocchio</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/pinocchio-icon.png')} style={{ width: 42.55, height: 42 }} />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Table')}>
                <Text style={styles.menuItemText}>Table</Text>
                <View style={styles.menuItemIcon}>
                    <Image source={require('../../assets/table-icon.png')} style={{ width: 59.87, height: 37 }} />
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default PinkPlateMenu;

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
        width: 60,
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