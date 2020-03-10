import React from 'react';
import { Image, Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {connect} from "react-redux";
import * as actions from "../../Store/Actions/AuthActions";
import View from "../../theme/components/View";

const homePlace = { description: 'Home', geometry: { location: { lat: 33.711409, lng: 73.043140 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 33.645076, lng: 72.965527 } }};

const GooglePlacesInput = () => {
    return (

            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={true}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row => row.description} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}

                getDefaultValue={() => ''}

                query={{
                    // available options: https://developers.google.com/places/web-service/autocomplete
                    key: 'AIzaSyBNBrWGhiL26l5t76_vdLlTf-Y1ReGC3Oo',
                    language: 'en', // language of the results
                    types: 'geocode' // default: 'geocode'
                }}

                styles={{
                    container:{
                        marginTop:25,
                    },
                    textInputContainer: {
                        width: '100%',
                        paddingStart: 10,
                        paddingEnd: 10,
                        height:45,
                    },
                    description: {
                        fontWeight: 'bold'
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb'
                    }
                }}

                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    rankby: 'distance',
                    type: 'cafe'
                }}

                GooglePlacesDetailsQuery={{
                    // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                    fields: 'geometry',
                }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                predefinedPlaces={[homePlace, workPlace]}

                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                renderLeftButton={()  => <Image style={{ marginStart:5, height: 20, width: 20, alignSelf:'center' }} source={require('./../../../assets/search.png')} />}
                // renderRightButton={() => <Text>Custom text after the input</Text>}
            />
    );
}

export default GooglePlacesInput;
