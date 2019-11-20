
import React, {Component} from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import MyActivityIndicator from '../Components/activity_indicator';
import api from '../../api';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password:'',
      loader: false
    };
  }

 async submitAction() {
   
    if(this.state.name.length === 0){
      alert("Please enter name.")
    }else if(this.state.password.length === 0){
      alert("Please enter password.")
    }else {
        try {
          this.setState({loader:true})
          let response = await api.request(`people/?search=${this.state.name}`, 'GET', null);
          this.setState({loader:false})
          console.log("utoiwuw")
          console.log(response)
          if (response.status === 200) {

              response.json().then((res) => {
                if(res.results){
                  if(res.results[0].birth_year === this.state.password){
                    this.props.navigation.navigate('Home', {starwarName:this.state.name})
                  }else{
                    alert("Please enter correct password.")
                  }
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

  render() {
    
    return(
    <View style={styles.constainer}>
      {this.state.loader ? <MyActivityIndicator /> : null}

      <Text style={styles.header}>
        Login
      </Text>
      <Text style={styles.noteText}>
        Note :- Login as a character from STAR WARS using the character name as the username and
        birth year as the password.
      </Text>
      <TextInput style={styles.textField}
        placeholder='Name'
        autoCorrect ={false}
        underlineColorAndroid='transparent'
        value={this.state.name}
        onChangeText={(value)=>this.setState({name:value})}
      />
       <TextInput style={styles.textField}
        placeholder='Password'
        autoCorrect ={false}
        secureTextEntry={true}
        underlineColorAndroid='transparent'
        value={this.state.password}
        onChangeText={(value)=>this.setState({password:value})}
      />
      <TouchableOpacity style={styles.saveButton}
            onPress={()=>this.submitAction()}>
        <Text>
          Submit
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
  header:{fontSize:30,
          fontWeight:'bold',
          marginTop:50},
  noteText:{color:'gray',
            fontSize:12,
            marginTop:5,
            marginHorizontal:'10%'},
  textField:{width:'80%',
            height:36,
            marginTop:20,
            borderRadius:10,
            borderColor:'black',
            borderWidth:2,
            padding:10},
  saveButton:{width:'60%',
              height:40,
              borderRadius:20,
              backgroundColor:'orange',
              justifyContent:'center',
              alignItems:'center',
              marginTop:30}
})