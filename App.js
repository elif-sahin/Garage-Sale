import React, { Component, useRef } from 'react';
import { Text, FlatList, View, StyleSheet, Animated, TouchableHighlight } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Modalize from 'react-native-modalize';
import Item from './src/GarageCarousel.js';
import { ListItem } from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import EventEmitter from "./src/EventEmitter"

let markers = [
  {
    key: 1,
    latitude: 37.69824,
    longitude: -122.4324,
    isSelected: false

  }, {
    key: 2,
    latitude: 37.68825,
    longitude: -122.4324,
    isSelected: false

  },
  {
    key: 3,
    latitude: 37.67825,
    longitude: -122.4324,
    isSelected: false

  }
]

let mapView = null;


export default class GarageMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers,
    };

  }
  goMarker = (key) => {
    EventEmitter.emit('goMarker', key);
  }

  componentDidMount() {
    console.log("did mounth bas calisti");
    EventEmitter.on('selectMarker', function (selectMarker) {
      console.log("event emit");
      //console.log("this.map: ", mapView)
      mapView.animateCamera({
        center: {
          latitude: markers[selectMarker].latitude,
          longitude: markers[selectMarker].longitude,
        }
      });

    })

    console.log("event emdid mount sont");
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
              onPress={() => this.goMarker(elm.key)}
            >
              <MapView.Callout tooltip style={styles.customView}>
                <View style={styles.calloutText}>
                  <Text>{elm.key}{"\n"}</Text>
                </View>
              </MapView.Callout>
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



