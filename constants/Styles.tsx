import { StyleSheet } from 'react-native';
import Colors from './Colors';

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    headerText: {
        fontFamily: 'montB',
        fontSize: 16,
        alignSelf: 'center',
        marginTop: '20%',
        marginBottom: 30
    }
});