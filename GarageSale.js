import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Item from './src/GarageCarousel.js';
import EventEmitter from "./src/EventEmitter";
import { fetchData } from './src/redux/actions/garageActions.js';
import { connect } from "react-redux";
import propTypes from "prop-types";

let mapView = null;
const selectedPin = require('./images/marker-selected.png');
const pin = require('./images/marker.png');
let mounth = true;
class GarageSale extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedMarkerIndex: 0,
    };

  }

  goMarker = (key) => {

    this.setState({ selectedMarkerIndex: key }, () => {
      EventEmitter.emit('goMarker', key);

    });


  }

  componentDidMount() {
    if (mounth) {
      this.props.fetchData();
    }
    EventEmitter.on('selectMarker', (selectMarker) => {

      this.setState({ selectedMarkerIndex: selectMarker })

      mapView.animateCamera({
        center: {
          latitude: this.props.markers[selectMarker].latitude,
          longitude: this.props.markers[selectMarker].longitude,
        }
      });
    })
  }

  componentWillUnmount() {
    mounth = false;
    EventEmitter.removeAllListeners();
  }
  render() {
    console.log(this.props.markers);
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
          {this.props.markers.map(elm => {
            return <Marker.Animated
              key={elm._id}
              coordinate={{
                longitude: elm.longitude,
                latitude: elm.latitude
              }}
              title={elm.title}
              description={elm.description}
              onPress={() => { this.goMarker(this.props.markers.indexOf(elm)) }}
              image={this.state.selectedMarkerIndex === (this.props.markers.indexOf(elm)) ? selectedPin : pin}

            >

            </Marker.Animated>
          })}
        </MapView>

        <Item markers={this.props.markers}></Item>



      </View>
    );



  }
}

GarageSale.propTypes = {
  fetchData: propTypes.func.isRequired,
  markers: propTypes.array.isRequired
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },


});
const mapStateToprops = state => {
  return {
    markers: state.markers
  }
}
export default connect(mapStateToprops, { fetchData })(GarageSale);

