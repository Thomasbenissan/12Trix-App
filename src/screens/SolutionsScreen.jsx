import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HomeHeader } from '../components/Headers';
import { BottomTabs } from '../components/BottomTabs';

const SolutionsScreen = ({ navigation }) => {
    return (
        <LinearGradient colors={['#011E57', '#001744']} style={styles.container}>
            <View style={styles.bgRobot}>
                <Image
                    style={{ width: 529, height: 1321, objectFit: 'contain' }}
                    source={require('../../assets/robot-3.png')}
                />
            </View>

            <View style={styles.content}>
                <Text style={styles.contentTitle}>Solutions</Text>

                <ScrollView style={{ flex: 1 }}>
                    <ImageBackground source={require('../../assets/plate2.png')} resizeMode="contain" style={styles.plate}>
                        <View style={[styles.plateRow]}>
                            <Image source={require('../../assets/grandma-icon.png')} style={{ width: 37, height: 34 }} />
                            <Text style={[styles.plateText, { marginHorizontal: 8 }]}>had</Text>
                            <Image source={require('../../assets/orange-6-3d.png')} style={{ width: 30, height: 34 }} />
                            <Image source={require('../../assets/hands-icon.png')} style={{ width: 54, height: 34, marginLeft: 8 }} />
                        </View>

                        <View style={[styles.plateRow, { marginTop: 12 }]}>
                            <Image source={require('../../assets/born-icon.png')} style={{ width: 28, height: 34 }} />
                            <Text style={[styles.plateText, { marginHorizontal: 8 }]}>to</Text>
                            <Image source={require('../../assets/green-3-3d.png')} style={{ width: 30, height: 34 }} />
                            <Image source={require('../../assets/hands-icon.png')} style={{ width: 54, height: 34, marginLeft: 8 }} />
                        </View>

                        <View style={[styles.plateRow, { marginTop: 12 }]}>
                            <Text style={[styles.plateText]}>How many</Text>
                            <Image source={require('../../assets/hands-icon.png')} style={{ width: 54, height: 34, marginHorizontal: 8 }} />
                            <Image source={require('../../assets/grandma-icon.png')} style={{ width: 37, height: 34, marginRight: 8 }} />
                            <Text style={[styles.plateText]}>have now?</Text>
                        </View>

                        <View style={[styles.plateRow, { marginTop: 16, marginBottom: 16 }]} >
                            <ImageBackground source={require('../../assets/right-btn.png')} resizeMode="contain" style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.numPadBtnText}>9</Text>
                            </ImageBackground>
                        </View>

                        <View style={[styles.plateRow, { height: 44 }]}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/sound-btn.png')} style={{ width: 47, height: 44 }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginHorizontal: 16 }}>
                                <Image source={require('../../assets/redo-btn.png')} style={{ width: 47, height: 44 }} />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image source={require('../../assets/next-btn.png')} style={{ width: 47, height: 44 }} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    <ImageBackground source={require('../../assets/plate2.png')} resizeMode="contain" style={styles.plate}>
                        <View style={[styles.plateRow]}>
                            <Image source={require('../../assets/grandma-icon.png')} style={{ width: 37, height: 34 }} />
                            <Text style={[styles.plateText, { marginHorizontal: 8 }]}>had</Text>
                            <Image source={require('../../assets/orange-6-3d.png')} style={{ width: 30, height: 34 }} />
                            <Image source={require('../../assets/hands-icon.png')} style={{ width: 54, height: 34, marginLeft: 8 }} />
                        </View>

                        <View style={[styles.plateRow, { marginTop: 12 }]}>
                            <Image source={require('../../assets/born-icon.png')} style={{ width: 28, height: 34 }} />
                            <Text style={[styles.plateText, { marginHorizontal: 8 }]}>to</Text>
                            <Image source={require('../../assets/green-3-3d.png')} style={{ width: 30, height: 34 }} />
                            <Image source={require('../../assets/hands-icon.png')} style={{ width: 54, height: 34, marginLeft: 8 }} />
                        </View>

                        <View style={[styles.plateRow, { marginTop: 12 }]}>
                            <Text style={[styles.plateText]}>How many</Text>
                            <Image source={require('../../assets/hands-icon.png')} style={{ width: 54, height: 34, marginHorizontal: 8 }} />
                            <Image source={require('../../assets/grandma-icon.png')} style={{ width: 37, height: 34, marginRight: 8 }} />
                            <Text style={[styles.plateText]}>have now?</Text>
                        </View>

                        <View style={[styles.plateRow, { marginTop: 16, marginBottom: 16 }]} >
                            <ImageBackground source={require('../../assets/right-btn.png')} resizeMode="contain" style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.numPadBtnText}>9</Text>
                            </ImageBackground>
                        </View>

                        <View style={[styles.plateRow, { height: 44 }]}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/sound-btn.png')} style={{ width: 47, height: 44 }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginHorizontal: 16 }}>
                                <Image source={require('../../assets/redo-btn.png')} style={{ width: 47, height: 44 }} />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image source={require('../../assets/next-btn.png')} style={{ width: 47, height: 44 }} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                    <ImageBackground source={require('../../assets/plate2.png')} resizeMode="contain" style={styles.plate}>
                        <View style={[styles.plateRow]}>
                            <Image source={require('../../assets/grandma-icon.png')} style={{ width: 37, height: 34 }} />
                            <Text style={[styles.plateText, { marginHorizontal: 8 }]}>had</Text>
                            <Image source={require('../../assets/orange-6-3d.png')} style={{ width: 30, height: 34 }} />
                            <Image source={require('../../assets/hands-icon.png')} style={{ width: 54, height: 34, marginLeft: 8 }} />
                        </View>

                        <View style={[styles.plateRow, { marginTop: 12 }]}>
                            <Image source={require('../../assets/born-icon.png')} style={{ width: 28, height: 34 }} />
                            <Text style={[styles.plateText, { marginHorizontal: 8 }]}>to</Text>
                            <Image source={require('../../assets/green-3-3d.png')} style={{ width: 30, height: 34 }} />
                            <Image source={require('../../assets/hands-icon.png')} style={{ width: 54, height: 34, marginLeft: 8 }} />
                        </View>

                        <View style={[styles.plateRow, { marginTop: 12 }]}>
                            <Text style={[styles.plateText]}>How many</Text>
                            <Image source={require('../../assets/hands-icon.png')} style={{ width: 54, height: 34, marginHorizontal: 8 }} />
                            <Image source={require('../../assets/grandma-icon.png')} style={{ width: 37, height: 34, marginRight: 8 }} />
                            <Text style={[styles.plateText]}>have now?</Text>
                        </View>

                        <View style={[styles.plateRow, { marginTop: 16, marginBottom: 16 }]} >
                            <ImageBackground source={require('../../assets/right-btn.png')} resizeMode="contain" style={{ width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={styles.numPadBtnText}>9</Text>
                            </ImageBackground>
                        </View>

                        <View style={[styles.plateRow, { height: 44 }]}>
                            <TouchableOpacity>
                                <Image source={require('../../assets/sound-btn.png')} style={{ width: 47, height: 44 }} />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ marginHorizontal: 16 }}>
                                <Image source={require('../../assets/redo-btn.png')} style={{ width: 47, height: 44 }} />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image source={require('../../assets/next-btn.png')} style={{ width: 47, height: 44 }} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </ScrollView>
            </View>

            <View style={{ position: 'absolute', zInex: 250, top: 0, left: 0, right: 0, width: '100%' }}>
                <HomeHeader />
            </View>

            <View style={{ position: 'absolute', zInex: 250, top: 0, bottom: 0, left: 0, right: 0, width: '100%' }}>
                <BottomTabs navigation={navigation} />
            </View>
        </LinearGradient>
    )
}

export default SolutionsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    bgRobot: {
        position: 'absolute',
        top: -62,
        left: '50%',
        zIndex: 0,
        transform: [{ translateX: -264.5 }],
        width: 529,
        height: 1321,
        objectFit: 'contain',
    },
    content: {
        position: 'absolute',
        top: 390,
        left: '50%',
        width: 340,
        height: 420,
        transform: [{ translateX: -170 }],
        padding: 10,
    },
    contentTitle: {
        fontFamily: 'Rubik-ExtraBold',
        color: '#001744',
        fontSize: 34,
        lineHeight: 42,
        textAlign: 'center',
        marginBottom: 4,
    },
    plate: {
        width: 322,
        height: 265,
        paddingHorizontal: 16,
        paddingVertical: 24,
        marginBottom: 10,
    },
    plateRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
    },
    plateText: {
        fontFamily: 'Rubik-Regular',
        color: '#00324A',
        fontSize: 17,
        lineHeight: 25,
        textAlign: 'left'
    },
    numPadBtnText: {
        fontFamily: 'Rubik-ExtraBold',
        color: '#E8F8FF',
        fontSize: 24,
        lineHeight: 28,
    },
});