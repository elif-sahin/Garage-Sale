import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import EventEmitter from "./EventEmitter"
import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');
export default class Item extends Component {

  constructor(props) {
    super(props);
    this.states = { selectedMarker: 0 };
  }

  selectMarker = (item) => {
    EventEmitter.emit('selectMarker', item);
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={[styles.item]}
        onPress={() => {
          this.selectMarker(index)
        }}
      >
        <Text style={styles.text}>{item.key}</Text>
      </TouchableOpacity>)
  };

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.carouselContainer}>
          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            style={styles.carousel}
            data={this.props.markers}
            renderItem={this.renderItem}
            itemWidth={250}
            sliderWidth={width}
            containerWidth={width}
            separatorWidth={20}
            onSnapToItem={(index) => {
              this.selectMarker(index)
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  flatList: {
    height: 200,
    marginTop: 575,
  },

  listItem: {
    flexDirection: "row",
    paddingLeft: 20,

  },

  container: {
    paddingHorizontal: 200
  },

  carousel: {
    flex: 1,

  },

  item: {
    height: 250,
    backgroundColor: "orange",

  },
  carouselContainer: {
    height: 200,
    marginTop: height - 100
  },

  text: {
    fontSize: 100,
    fontWeight: 'bold',
    color: "purple"
  }
});

