import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, Animated, TouchableOpacity, Dimensions, Platform, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import EventEmitter from "./EventEmitter"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient'
import { Body, Card, CardItem, Header, Left, Thumbnail, Title } from 'native-base'
import { sliderWidth, itemWidth } from './SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles, { colors } from './index.style';
import { ENTRIES1, ENTRIES2 } from './entries';
import { scrollInterpolators, animatedStyles } from './animations';

const swidth = Dimensions.get('window').width;
const sheight = Dimensions.get('window').height;
let carousel = null;
const SLIDER_1_FIRST_ITEM = 1;
export default class Item extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedMarker: 0, slider1ActiveSlide: SLIDER_1_FIRST_ITEM };

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
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      >

      </SliderEntry>
    );
  }
  mainExample() {

    const { slider1ActiveSlide } = this.state;
    return (
      <View >
        <View style={styles.title}></View>

        <Carousel
          ref={c => carousel = c}
          data={this.props.markers}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          firstItem={SLIDER_1_FIRST_ITEM}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          // inactiveSlideShift={20}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
          loop={true}
          loopClonesPerSide={2}
          onSnapToItem={(index) => {
            this.selectMarker(index);
            this.setState({ slider1ActiveSlide: index });
          }}
        />
        <Pagination
          dotsLength={this.props.markers.length}
          activeDotIndex={slider1ActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={'rgba(255, 255, 255, 0.92)'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={carousel}
          tappableDots={!!carousel}
        />
      </View>
    );
  }

  renderItem = ({ item, index }) => {
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
    const example1 = this.mainExample(1, ' dots');
    return (
      <View>
        {example1}
      </View>
    );
  }
}

