import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import EventEmitter from "./EventEmitter"
import Carousel from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient'
import { Body, Card, CardItem, Header, Left, Thumbnail, Title } from 'native-base'

const swidth = Dimensions.get('window').width;
const sheight = Dimensions.get('window').height;
let carousel = null;
export default class Item extends Component {

  constructor(props) {
    super(props);
    this.states = { selectedMarker: 0 };
  }

  scrollY = new Animated.Value(0)
  //headerY = Animated.multiply(Animated.diffClamp(this.scrollY, 0, 56), -1)

  selectMarker = (item) => {
    EventEmitter.emit('selectMarker', item);

  }
  componentDidMount() {

    EventEmitter.on('goMarker', function (key) {

      console.log("this.map: ", key);
      carousel.snapToItem(key - 1, animated = true, fireCallback = true);

    })

    console.log("event emdid mount sont");
  }

  renderItem = ({ item, index }) => {
    // animasyon :style={{ backgrounColor: "red", height: sheight * 0.3, marginTop: sheight - sheight * 0.3 }}
    return (

      < View >

        <Animated.ScrollView scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          style={{ zIndex: -1 }}
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
            <Animated.View style={{ ...styles.item }} >
              <Text style={styles.text}>{item.key}  </Text>
              <Text>Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı. Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.Uzunca bir açıklama yazısı.</Text>
            </Animated.View>
          </TouchableOpacity>
          <View style={{ position: 'absolute', height: sheight, width: swidth, zIndex: -2 }}>
            <LinearGradient
              colors={['rgba(245,245,245,0)', 'rgba(245,245,245,0.35)', 'rgba(245,245,245,1)']}
              locations={[0, 0.3, 1]}
              style={StyleSheet.absoluteFill} />
          </View>

          <View style={{
            transform: [{ translateY: -100 }],
            width: '100%',

            backgroundColor: 'transparent'
          }}>
            <View style={{ ...StyleSheet.absoluteFill, top: 100, backgroundColor: 'rgb(245,245,245)' }} />

          </View>
        </Animated.ScrollView>

      </View >

    )
  };

  render() {
    return (

      <View style={{ height: sheight * 0.3, marginTop: sheight - sheight * 0.3 }}>

        <Carousel
          ref={(c) => {
            carousel = c;
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
    backgroundColor: "red"
  },

  item: {
    backgroundColor: 'rgb(245,245,245)',
    width: swidth * 0.7,

    marginLeft: swidth * 0.15,
    marginTop: -sheight * 0.7,



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

