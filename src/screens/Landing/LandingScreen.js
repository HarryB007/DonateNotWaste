import React from 'react';
import { View, 
    StyleSheet, 
    Text, 
    Dimensions } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import ImageCard from '../../components/ImageCard';
import ButtonR from '../../components/ButtonR';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const slides = [
    {
        key: '1',
        text: 'You have two hands, one to help yourself, the second to help others.',
        image: require('../../assets/images/donate.png'),
        textWidth: windowWidth * 0.6,
        paddingVertical: windowHeight * 0.13,
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
    },
    {
        key: '2',
        text: "If you can't feed a hundred people, then just feed one.",
        image: require('../../assets/images/donate-1.png'),
        textWidth: windowWidth * 0.9,
        paddingVertical: windowHeight * 0.167,
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
    },
    {
        key: '3',
        text: 'Giving is not just about\n making a donation, it is about\n making a difference.',
        image: require('../../assets/images/donate-2.png'),
        textWidth: windowWidth * 0.8,
        paddingVertical: windowHeight * 0.149,
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
    },
    {
        key: '4',
        text: 'Waste Not, Donate!',
        image: require('../../assets/images/Logo.png'),
        textWidth: windowWidth * 0.8,
        paddingVertical: windowHeight * 0.2,
        fontSize: 28,
        fontFamily: 'Poppins-Bold',
    }
    ];

    const LandingScreenSlider = ({ navigation }) => {
    const handleDone = () => {
        navigation.navigate('LandingPage');
    };

    const handleSkip = () => {
        navigation.navigate('LandingPage');
    };

    const renderDoneButton = () => (
        <ButtonR onPress={handleDone} title={'Get Started!'}/>
    );

    const renderNextButton = () => (
        <View style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
        </View>
    );

    const renderSkipButton = () => (
        <View style={styles.skipButton}>
            <Text style={styles.skipButtonText} onPress={handleSkip}>Skip</Text>
        </View>
    );

    return (
        <AppIntroSlider
        renderItem={({ item, index }) => (
            <View style={styles.container}>
                <ImageCard imageSource={item.image} />
                <View style={[styles.orangeContainer, { paddingVertical: item.paddingVertical }]}>
                    <Text style={[styles.text, { width: item.textWidth,  fontSize: item.fontSize, fontFamily: item.fontFamily }]}>{item.text}</Text>
                    {index < 3 && (
                    <View style={styles.skipButtonContainer}>
                        {renderSkipButton()}
                    </View>
                    )}
                </View>
            </View>
        )}
        data={slides}
        onDone={handleDone}
        renderSkipButton={renderSkipButton}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        />
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    orangeContainer: {
        backgroundColor: '#F86D3B',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        marginBottom: 12,
        textAlign: 'center',
        alignSelf: 'center',
    },
    nextButton: {
        marginHorizontal: 15,
        marginTop: 11,
    },
    nextButtonText: {
        color: 'white',
        fontFamily: 'Poppins-Light',
        fontSize: 18,
    },
    skipButtonContainer: {
        position: 'absolute',
        top: 258,
        left: 20,
        zIndex: 1,
    },
    skipButtonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Poppins-Light',
    },
});

export default LandingScreenSlider;
