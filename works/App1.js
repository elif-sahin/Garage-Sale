import React, { Component } from "react";
import { View, Text, FlatList } from "react-native";
import {ListItem} from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import LinearGradient from 'react-native-linear-gradient'; // Only if no expo


export default class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    return (
      
      <View>
      <FlatList style = {{  height:200,  marginTop:575}}
        data={this.state.data}
        horizontal={true}
        renderItem={({ item }) => (
          <ListItem  style = {{flexDirection:"row", paddingRight: 20,}}
            containerStyle={{paddingHorizontal:70}}
            Component={TouchableScale}
            
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} //
            linearGradientProps={{
              colors: ['#FF9800', '#F44336'],
              start: {x:1, y:0},
              end: {x:0.2,y:0},
            }}
            ViewComponent={LinearGradient} // Only if no expo
            leftAvatar={{ rounded: true, source: { uri: "https://www.belightsoft.com/products/imagetricks/img/core-image-filters@2x.jpg" } }}
            title={item.name.first}
            titleStyle={{ color: 'white', fontWeight: 'bold' }}
            subtitleStyle={{ color: 'white' }}
            subtitle="Vice Chairman"
            chevronColor="white"
            chevron
          />
        )}
      />
      </View>
      
    );
  }
}

