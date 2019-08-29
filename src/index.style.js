import { StyleSheet, Dimensions } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

const swidth = Dimensions.get('window').width;
const sheight = Dimensions.get('window').height;

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.black
    },
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        paddingVertical: sheight * 0.25,


    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },

    title: {
        marginTop: sheight * 0.45,


    },
    titleDark: {
        color: colors.black
    },

    slider: {
        marginTop: sheight / 7,
        overflow: 'visible',// for custom animations

    },
    sliderContentContainer: {
        paddingVertical: 2,// 

    },
    paginationContainer: {
        paddingVertical: 8,

    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    }
});