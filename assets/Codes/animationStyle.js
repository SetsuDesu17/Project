import { StyleSheet } from "react-native"

const animStyle = StyleSheet.create({
    idle: {
        position: 'absolute',
        width: 96,
        resizeMode: 'contain',
        left: 140,
        bottom: -103,
    },
    skill1: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 300,
        height: 170,
        left: 100,
        bottom: 77,
    },
    skill2: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 355,
        height: 170,
        left: 120,
        bottom: 80,
    },
    skill3: {
        position: 'absolute',
        resizeMode: 'contain',
        width: 370,
        height: 550,
        left: 120,
        bottom: -100
    }
})

export default animStyle;