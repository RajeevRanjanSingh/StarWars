
import React,{Component} from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,
    Dimensions
    } from 'react-native'
    
import MyActivityIndicator from '../Components/activity_indicator';

const DEVICE_WIDTH = Dimensions.get("window").width;
var arrTitle = ["Climate :", "Diameter :", "Films :", "Gravity :", "Orbital Period :",
                "Population :", "Residents :", "Rotation Period :", "Surface Water :", "Terrain :"]

export default class PlanetDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            planet_name:'',
            arrPlanetDetail:[]
        }
    }

   UNSAFE_componentWillMount() {
    
    var arrPlanetDetails = this.props.navigation.state.params.planetDetails;

    var newArr = [arrPlanetDetails.climate, arrPlanetDetails.diameter,
        arrPlanetDetails.films, arrPlanetDetails.gravity, arrPlanetDetails.orbital_period,
        arrPlanetDetails.population, arrPlanetDetails.residents, arrPlanetDetails.rotation_period,
        arrPlanetDetails.surface_water,arrPlanetDetails.terrain]

    this.setState({
        planet_name:arrPlanetDetails.name,
        arrPlanetDetail:newArr
    })
}

    _renderItem = ({item, index}) => {
            return(
                <View style={{marginTop:5,
                     marginBottom:5
                     }}>
                    <View style={[styles.flatListCell, styles.shadow]}
                       >
                        <Text style={{marginLeft:5, 
                            marginVertical:15,
                            flex:1}}>
                            {item}
                        </Text>
                        <Text style={{marginLeft:5, marginVertical:15,
                        flex:3}}>
                            {this.state.arrPlanetDetail[index]}
                        </Text>
                    </View>
                </View>
            )
        }

    render() {

        return(
            <View style={styles.container}>
                {this.state.loader ? <MyActivityIndicator /> : null}
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.backButton} onPress={()=>this.props.navigation.goBack()}>
                    <Text style={{color:'white'}}>
                        Back
                    </Text>
                </TouchableOpacity>
                <Text style={{fontSize:18, 
                    fontWeight:'600',
                    marginTop:30,
                    width:DEVICE_WIDTH - 140,
                    textAlign:'center'}}>
                        {this.state.planet_name}
                </Text>
                </View>
                <View style={{marginTop:10, marginBottom:130}}>
                    <FlatList
                        data={arrTitle}
                        renderItem={this._renderItem}
                        keyExtractor={item => item.name}
                        />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    constainer:{flex: 1, 
                backgroundColor:'lightgray'},
                shadow: {shadowColor: '#999666',
                shadowOffset: {width: 5, height: 5},
                shadowOpacity: 0.4,
                shadowRadius: 4,
                elevation: 5
                    },
    flatListCell:{marginHorizontal:20,
                  backgroundColor:'white',
                  borderRadius: 5,
                  flexDirection:'row'},
    backButton:{ marginTop:20,
                marginLeft:20,
                width:50,
                height:40,
                backgroundColor:'gray',
                borderRadius:5,
                justifyContent:'center',
                alignItems:'center'}
    })