import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import EventEmitter from "./EventEmitter"
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient'
import { Body, Card, CardItem, Header, Left, Thumbnail, Title } from 'native-base'

const swidth = Dimensions.get('window').width;
const sheight = Dimensions.get('window').height;
export default class Item extends Component {

  constructor(props) {
    super(props);
    this.states = { selectedMarker: 0 };
  }

  scrollY = new Animated.Value(0)


  //headerY = Animated.multiply(Animated.diffClamp(this.scroll, 0, 56), -1)

  selectMarker = (item) => {
    EventEmitter.emit('selectMarker', item);
  }

  renderItem = ({ item, index }) => {
    return (
      /*
      <TouchableOpacity style={[styles.item]}
        onPress={() => {
          this.selectMarker(index)
        }}
      >
        <Text style={styles.text}>{item.key}</Text>
      </TouchableOpacity>
      */

      <View style={StyleSheet.absoluteFill}>

        <Animated.ScrollView scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          style={{ zIndex: 0 }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }], { useNativeDriver: true })}>


          <Animated.View style={{
            height: sheight * 0.8,

            transform: [{ translateY: Animated.multiply(this.scrollY, 0.5) }]
          }}>



          </Animated.View>
          <TouchableOpacity
            onPress={() => {
              this.selectMarker(index)
            }}
          >
            <View style={[styles.item]}>
              <Text style={styles.text}>{item.key}  Uzunca bir açıklama yazısı. Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.</Text>
            </View>
          </TouchableOpacity>
          <View style={{ position: 'absolute', height: sheight * 2, width: swidth, zIndex: -1 }}>
            <LinearGradient
              colors={['rgba(245,245,245,0.0)', 'rgba(245,245,245,0.35)', 'rgba(245,245,245,1)']}
              locations={[0, 0.3, 1]}
              style={StyleSheet.absoluteFill} />
          </View>

          <View style={{
            transform: [{ translateY: -100 }],
            width: '100%',

            backgroundColor: 'transparent'
          }}>
            <View style={{ ...StyleSheet.absoluteFillObject, top: 100, backgroundColor: 'rgb(245,245,245)' }} />

          </View>
        </Animated.ScrollView>

      </View>

    )
  };

  render() {

    return (
      <View>
        <View>

          <Carousel
            ref={(c) => {
              this._carousel = c;
            }}
            style={styles.carousel}
            data={this.props.markers}
            renderItem={this.renderItem}
            itemWidth={swidth}
            sliderWidth={swidth}
            containerWidth={swidth}
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
    backgroundColor: "orange",
    width: swidth * 0.7,
    marginLeft: swidth * 0.15

  },
  carouselContainer: {
    height: 200,
    marginTop: sheight - 100
  },

  text: {
    fontSize: 100,
    fontWeight: 'bold',
    color: "purple"
  }
});

