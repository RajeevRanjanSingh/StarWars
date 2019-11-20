
import React, {Component} from 'react';
import {
View,
StyleSheet,
FlatList,
Text,
TextInput,
TouchableOpacity,
Dimensions,
Alert
} from 'react-native'

import MyActivityIndicator from '../Components/activity_indicator';
import api from '../../api';

const planetFontSize = 35
const DEVICE_HEIGHT = Dimensions.get("window").height;
const DEVICE_WIDTH = Dimensions.get("window").width;

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            loader:false,
            arrSearchData:[],
            enteredText:'',
            starWarName:'',
            searchCount:0,
            startSearchTime:''
        }
    }

UNSAFE_componentWillMount(){
    this.setState({starWarName:this.props.navigation.state.params.starwarName})
}

 searchingPlanet(value) {
  
    this.setState({enteredText:value})

    if(this.state.searchCount === 0){

        var currentDateTime =  new Date(Date.now())
        this.setState({startSearchTime:currentDateTime})
        this.apiForSearchPlanet(value)
    }else if(this.state.searchCount > 15){

        var newDateTime =  new Date(Date.now())
        var msDiff = newDateTime.getTime() - this.state.startSearchTime.getTime();
        var timeDiff = Math.round((msDiff/1000)/60)

        if(timeDiff >= 1){

            if(this.state.starWarName.toLowerCase() === "luke skywalker"){
               this.apiForSearchPlanet(value)
            }else{
                Alert.alert(
                    "",
                    "Cannot search more than 15.",
                    [
                      {
                        text: "OK",
                        onPress: () =>
                        this.props.navigation.navigate("Login")
                      }
                    ],
                    { cancelable: false }
                  );
            }
        }else{
            this.apiForSearchPlanet(value)
        }
    }else{
        this.apiForSearchPlanet(value)
    }
}

    async apiForSearchPlanet(value){
        if(value.length === 0){
            this.setState({arrSearchData:[]})
        }else{
            this.setState({searchCount:this.state.searchCount + 1})
            try {
                this.setState({loader:true})
                let response = await api.request(`planets/?search=${value}`, 'GET', null);
                this.setState({loader:false})
                if (response.status === 200) {
                    response.json().then((res) => {
                      if(res.results){
                        var newArr = [...res.results]
                        newArr.sort(function(a, b){return parseFloat(b.population)-parseFloat(a.population)});
                           this.setState({arrSearchData:newArr})
                      }
                    })
                  }else{
                   alert("Oops error occured!")
                  }
              } catch (error) {
                // Error retrieving data
                console.log("called error " + error);
              }
            }
    }

    openPlanetDetailScreen(item) {
        this.props.navigation.navigate('PlanetDetail', {planetDetails:item})
    }

    logOutAction(){
     this.props.navigation.navigate("Login")
    }

    _renderItem = ({item, index}) => {
        return(

            <View style={{marginTop:5, marginBottom:5}}>
                <TouchableOpacity style={[styles.flatListCell, styles.shadow]}
                    onPress={()=>this.openPlanetDetailScreen(item)}>
                    <Text style={{marginLeft:5, 
                        marginTop:5,
                        fontSize:planetFontSize-index-5}}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            </View>
            )
        }

    render() {

        return(
            <View style={styles.container}>
                {this.state.loader ? <MyActivityIndicator /> : null}
                <TextInput style={styles.searchTextField}
                    placeholder='Search for planets'
                    autoCorrect ={false}
                    underlineColorAndroid='transparent'
                    value={this.state.enteredText}
                    onChangeText={(value)=>this.searchingPlanet(value)}
                />
                {
                    this.state.arrSearchData.length > 0 ? (
                        <View style={{marginTop:10,height:DEVICE_HEIGHT-180}}>
                            <FlatList
                                data={this.state.arrSearchData}
                                renderItem={this._renderItem}
                                keyExtractor={item => item.name}
                                />
                        </View>
                    ) : (
                        <View style={{marginTop:10, 
                        height:DEVICE_HEIGHT-180,
                        justifyContent:'center',
                        alignItems:'center'}}>
                            <Text style={{fontSize:25}}>
                                Sorry! No planet available.
                            </Text>
                        </View>
                    )
                }
                <TouchableOpacity style={styles.logoutButton}
                        onPress={()=>this.logOutAction()}>
                    <Text>
                    Logout
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    constainer:{flex: 1, 
                alignItems:'center', 
                backgroundColor:'lightgray'},
    searchTextField:{marginHorizontal:20,
                height:36,
                marginTop:20,
                borderRadius:10,
                borderColor:'black',
                borderWidth:2,
                padding:10},
    shadow: {shadowColor: '#999666',
            shadowOffset: {width: 5, height: 5},
            shadowOpacity: 0.4,
            shadowRadius: 4,
            elevation: 5
                },
    flatListCell:{marginHorizontal:20,
                 backgroundColor:'white',
                 justifyContent:'center',
                 borderRadius: 5},
    logoutButton:{width:200,
                marginLeft:DEVICE_WIDTH/2-100,
                height:40,
                borderRadius:20,
                backgroundColor:'orange',
                justifyContent:'center',
                alignItems:'center',
                marginVertical:20}
})