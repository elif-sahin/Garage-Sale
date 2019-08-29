import React, { Component, useRef } from 'react';
import { Text, FlatList, View, StyleSheet, Animated, TouchableHighlight } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modalize from 'react-native-modalize';
import Item from './src/GarageCarousel.js';
import { ListItem } from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import EventEmitter from "./src/EventEmitter"
import { EMLINK } from 'constants';

let markers = [
  {
    key: 1,
    latitude: 37.69824,
    longitude: -122.4324,
    description: 'Zurna dürüm bulunur.',
    title: 'Zurnacı',
    photo: require('./images/zurna.png')


  }, {
    key: 2,
    latitude: 37.68825,
    longitude: -122.4324,
    description: 'Los Angelesın en kral tornacısı',
    title: 'Tornacı',
    photo: require('./images/torna.png')


  },
  {
    key: 3,
    latitude: 37.67825,
    longitude: -122.4324,
    description: 'Overlok makinesi ayağınıza gelmiyor, buradayız.',
    title: 'Overlokçu',
    photo: require('./images/overlok.png')


  }
]

let mapView = null;
const selectedPin = require('./images/marker-selected.png');
const pin = require('./images/marker.png');


export default class GarageMap extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markers, selectedMarkerIndex: 0
    };

  }
  goMarker = (key) => {

    this.setState({ selectedMarkerIndex: key - 1 }, () => {
      EventEmitter.emit('goMarker', key);
      //this.forceUpdate()
    });


  }





  componentDidMount() {
    console.log("did mounth bas calisti");
    EventEmitter.on('selectMarker', (selectMarker) => {
      console.log("event emit");
      //console.log("this.map: ", mapView)
      this.setState({ selectedMarkerIndex: selectMarker })

      mapView.animateCamera({
        center: {
          latitude: markers[selectMarker].latitude,
          longitude: markers[selectMarker].longitude,
        }
      });
    })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <MapView
          ref={el => { mapView = el; }}
          initialRegion={{
            latitude: 37.68825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}

          style={{
            ...StyleSheet.absoluteFillObject,
            zIndex: 0,
          }}

        >
          {this.state.markers.map(elm => {
            return <Marker.Animated
              key={elm.key}
              coordinate={{
                longitude: elm.longitude,
                latitude: elm.latitude
              }}
              title={elm.title}
              description={elm.description}
              onPress={() => { this.goMarker(elm.key) }}
              image={this.state.selectedMarkerIndex === (elm.key - 1) ? selectedPin : pin}

            >

            </Marker.Animated>
          })}
        </MapView>
        <Item markers={this.state.markers}></Item>
      </View>
    );



  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },


});



