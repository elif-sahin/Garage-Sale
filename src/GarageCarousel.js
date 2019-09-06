import React, { Component } from 'react';
import { Text, View, Dimensions } from 'react-native';
import EventEmitter from "./EventEmitter"
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './SliderEntry.style';
import SliderEntry from './SliderEntry';
import styles, { colors } from './index.style';

let carousel = null;
const SLIDER_1_FIRST_ITEM = 0;
export default class Item extends Component {

  constructor(props) {
    super(props);
    this.state = { selectedMarker: 0, slider1ActiveSlide: SLIDER_1_FIRST_ITEM };

  }


  selectMarker = (item) => {
    EventEmitter.emit('selectMarker', item);

  }
  componentDidMount() {
    EventEmitter.on('goMarker', function (key) {
      carousel.snapToItem(key, animated = true, fireCallback = true);
    })
  }

  componentWillUnmount() {
    EventEmitter.removeAllListeners();
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

  render() {
    const example1 = this.mainExample(1, ' dots');
    return (
      <View>
        {example1}
      </View>
    );
  }
}

