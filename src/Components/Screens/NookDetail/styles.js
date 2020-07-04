import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../helper/Colors";

const styles = StyleSheet.create({
    mapStyle: {
        width: "100%",
        alignSelf: 'center',
        height: "95%",
    },
    tabContainer: {
        flex: 1,
    },
    addButton: {
        alignItems: 'center',
        backgroundColor: '#E59413',
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        marginStart: 5,
        marginEnd: 5, height: 40
      },
      bigButton: {
        alignItems: 'center',
        backgroundColor: '#E59413',
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 5,
        marginStart: 5,
        marginEnd: 5,
        height: 65, width: '45%'
    },

    tabButton: {
        justifyContent: 'center',
        height: 35,
        backgroundColor: 'blue',
        borderRadius: 30,
        alignItems: 'center',
    },

    imageContainer: {
        height: 160,
        width: 160,
        marginBottom: 20,
        alignSelf: 'center'
    },
    imageButton: {
        position: 'absolute',
        bottom: -7,
        alignSelf: "flex-end"
    },
    imageView: {
        height: "100%",
        width: "100%",
        position: 'relative',
        marginTop: 20,
        borderWidth: 2,
        borderColor: Colors.primaryColor,
        alignSelf: 'center',
        borderRadius: 100
    },
    textArea: {
        margin: 20,
        paddingTop: 10
    },
    checkbox: {
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        paddingEnd: 10,
        flexDirection: 'row',
    },
    checkboxItem: {
        flex: 1,
        marginStart: 20,
        marginEnd: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container: {
        flex: 1, 
        padding: 25,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.10,
        shadowRadius: 5,
    },
    child: {
        borderRadius: 15,
        // To round image corners
        overflow: 'hidden',
        borderColor: '#999',
        borderWidth: 0,
        backgroundColor: '#FFF',
        // Android shadow
        elevation: 3
    },
    ScreenButtonContainer: {
        flex: 1, 
        // padding: 25,
        paddingTop: 15,
        paddingBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.10,
        shadowRadius: 5,
    },
    ScreenButtonChild: {
        borderRadius: 15,
        // To round image corners
        overflow: 'hidden',
        borderColor: '#999',
        borderWidth: 0,
        backgroundColor: '#FFF',
        // Android shadow
        elevation: 3,
        paddingTop: 5,
        paddingBottom: 20,
    },
    shiftButton: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E59413',
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'column',
        borderRadius: 5,
        marginStart: 5,
        marginEnd: 5,
        height: 65, marginTop: 10, marginBottom: 10
    },
    buttonTextStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        lineHeight: 22,
        paddingTop: 5,
    },
    Inputchild: {
        marginTop:15,
        paddingStart: 15,
        paddingEnd: 15,
        padding:15,
        borderRadius: 30,
        // To round image corners
        overflow: 'hidden',
        borderColor: '#999',
        borderWidth: 0,
        backgroundColor: '#FFF',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 3
    },
});
export default styles;
