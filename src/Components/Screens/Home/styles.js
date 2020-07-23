import { StyleSheet, Dimensions } from "react-native";
import Colors from "../../../helper/Colors";

const styles = StyleSheet.create({
    mapStyle: {
        width: "100%",
        alignSelf: 'center',
        height: "100%",
    },
    tabContainer: {
        flex: 1,
    },
    tabButton: {
        justifyContent: 'center',
        height: 33,
        backgroundColor: 'blue',
        borderRadius: 30,
        alignItems: 'center',
    },
    deleteButton: {
        alignItems: 'center',
        backgroundColor: '#ff3333',
        padding: 10,
        
        borderRadius: 5,
        marginStart: 5,
        marginEnd: 5, 
        height: 40
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
        flex: 1, padding: 25,
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
    }
});
export default styles;