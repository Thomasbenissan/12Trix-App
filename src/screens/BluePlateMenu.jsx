import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';

const BluePlateMenu = ({ style, onItemPress, operation }) => {
    
    console.log('Operation:', operation);
    
    return (

        <ImageBackground source={require('../../assets/menu-bg-4.png')} resizeMode="contain" style={[styles.container, style]}>
            <Text style={styles.title}>4</Text>

            {operation === 'plus' ? (
                <ScrollView>
                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Were Born')}>
                        <Text style={styles.menuItemText}>Were Born</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/born-icon.png')} style={{ width: 34, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Received a Gift')}>
                        <Text style={styles.menuItemText}>Received a Gift</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/gift-icon.png')} style={{ width: 40, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Duplicate')}>
                        <Text style={styles.menuItemText}>Duplicate</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/duplicated-icon.png')} style={{ width: 36, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Adopted')}>
                        <Text style={styles.menuItemText}>Adopted</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/adopted-icon.png')} style={{ width: 41, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Fly to The Moon and Find')}>
                        <Text style={[styles.menuItemText, { fontSize: 16 }]}>Fly to The Moon and Find</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/fly-to-moon-icon.png')} style={{ width: 42, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Bake Bread')}>
                        <Text style={styles.menuItemText}>Bake Bread</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/bake-icon.png')} style={{ width: 43, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Fell on Him')}>
                        <Text style={styles.menuItemText}>Fell on Him</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/fell-on-him-icon.png')} style={{ width: 29, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Rained on Him')}>
                        <Text style={styles.menuItemText}>Rained on Him</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/rainfall-icon.png')} style={{ width: 50, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Picked from the Tree')}>
                        <Text style={[styles.menuItemText, { fontSize: 16 }]}>Picked from the Tree</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/picking-icon.png')} style={{ width: 36, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('The Tooth Fairy Brought')}>
                        <Text style={[styles.menuItemText, { fontSize: 16 }]}>The Tooth Fairy Brought</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/tooth-icon.png')} style={{ width: 46, height: 42 }} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            ) : (
                <ScrollView style={{ flex: 1, paddingHorizontal: 32 }}>
                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Were Eaten')}>
                        <Text style={styles.menuItemText}>Were Eaten</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/eaten-icon.png')} style={{ width: 50, height: 36 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Disappeared')}>
                        <Text style={styles.menuItemText}>Disappeared</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/disappeared-icon.png')} style={{ width: 52, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Ran Away')}>
                        <Text style={styles.menuItemText}>Ran Away</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/ran-away-icon.png')} style={{ width: 51, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Fly to Another Country')}>
                        <Text style={[styles.menuItemText, { fontSize: 16 }]}>Fly to Another Country</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/fly-icon.png')} style={{ width: 58, height: 32 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Ephraim')}>
                        <Text style={styles.menuItemText}>Hide</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/hide-icon.png')} style={{ width: 45, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Went On A Trip')}>
                        <Text style={styles.menuItemText}>Went On A Trip</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/trip-icon.png')} style={{ width: 51, height: 32 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Will Be Lost')}>
                        <Text style={styles.menuItemText}>Will Be Lost</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/got-lost-icon.png')} style={{ width: 31, height: 40 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Went To The Sea')}>
                        <Text style={[styles.menuItemText, { fontSize: 16 }]}>Went To The Sea</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/sea-icon.png')} style={{ width: 62, height: 30 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Were Broken')}>
                        <Text style={styles.menuItemText}>Were Broken</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/broken-icon.png')} style={{ width: 23, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Melted')}>
                        <Text style={styles.menuItemText}>Melted</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/melted-icon.png')} style={{ width: 46, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Were Born')}>
                        <Text style={styles.menuItemText}>Were Born</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/born-icon.png')} style={{ width: 34, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Received a Gift')}>
                        <Text style={styles.menuItemText}>Received a Gift</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/gift-icon.png')} style={{ width: 40, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Duplicate')}>
                        <Text style={styles.menuItemText}>Duplicate</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/duplicated-icon.png')} style={{ width: 36, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Adopted')}>
                        <Text style={styles.menuItemText}>Adopted</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/adopted-icon.png')} style={{ width: 41, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Fly to The Moon and Find')}>
                        <Text style={[styles.menuItemText, { fontSize: 16 }]}>Fly to The Moon and Find</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/fly-to-moon-icon.png')} style={{ width: 42, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Bake Bread')}>
                        <Text style={styles.menuItemText}>Bake Bread</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/bake-icon.png')} style={{ width: 43, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Fell on Him')}>
                        <Text style={styles.menuItemText}>Fell on Him</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/fell-on-him-icon.png')} style={{ width: 29, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Rained on Him')}>
                        <Text style={styles.menuItemText}>Rained on Him</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/rainfall-icon.png')} style={{ width: 50, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('Picked from the Tree')}>
                        <Text style={[styles.menuItemText, { fontSize: 16 }]}>Picked from the Tree</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/picking-icon.png')} style={{ width: 36, height: 42 }} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem} onPress={() => onItemPress('The Tooth Fairy Brought')}>
                        <Text style={[styles.menuItemText, { fontSize: 16 }]}>The Tooth Fairy Brought</Text>
                        <View style={styles.menuItemIcon}>
                            <Image source={require('../../assets/tooth-icon.png')} style={{ width: 46, height: 42 }} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>
            )}
        
            
        </ImageBackground>
    )
}

export default BluePlateMenu;

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
        width: 62,
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