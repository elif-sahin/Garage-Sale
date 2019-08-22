import { StyleSheet } from 'react-native';

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

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
        paddingVertical: 195,

    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },

    title: {
        marginTop: 410,

    },
    titleDark: {
        color: colors.black
    },

    slider: {
        marginTop: 65,
        overflow: 'visible' // for custom animations
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