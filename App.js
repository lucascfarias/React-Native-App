import * as React from 'react';
import { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Authentication
const authenticateUser = (username, password) => {
  if (username === 'Admin' && password === '123') {
    return true; // Authentication successful
  }
  return false; // Authentication failed
};

// LOGIN SCREEN
export function LoginScreen({navigation}){

  // Hide statusbar (batery, time, wifi...)
  StatusBar.setHidden(false); // don't hide 


  // States
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');


  // Verify login
  const verifyLogin = async () => {
    if (authenticateUser(username, password)) {
      await AsyncStorage.setItem('Admin', 'Admin');
      navigation.navigate('Main');
    } else {
      alert('Username or Password Invalid');
    }
  };
  
  return(
    
    // Main Container
    <View style={styles.container}>


      {/* Logo Container */}
      <View style={styles.LogoContainer}>
        <Image style={styles.Logo} source={require('./assets/Logo.jpg')}/>
        <Text style={{color:'#fff', fontSize:30, marginTop:10, marginBottom:20}}>Welcome to MyApp</Text>
      </View>


      {/* Form Container */}
      <View style={styles.FormContainer}>
        <TextInput style={styles.InputLogin} placeholder='Username' placeholderTextColor={'#C0C0C0'} onChangeText={(text) => setUsername(text)}/>
        <TextInput style={styles.InputLogin} placeholder='Password' placeholderTextColor={'#C0C0C0'} secureTextEntry={true} onChangeText={(text) => setPassword(text)}/>
        {/* Button to verificate */}
        <TouchableOpacity style={styles.btnLogin} onPress={verifyLogin}>
          <Text style={styles.textButton}>Verificar</Text>
        </TouchableOpacity>

        {/* Button I dont have an account */}
        <TouchableOpacity style={styles.btnIDHAA} onPress={() => navigation.navigate('Register')}>
          <Text style={{color:'#fff', fontSize:16, marginTop:30, marginBottom:20}}>I don't have an account</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
}


// REGISTER SCREEN
function RegisterScreen({navigation}){

  // Hide statusbar (batery, time, wifi...)
  StatusBar.setHidden(false); // don't hide 
  
  return(
    
    // Main Container
    <View style={styles.container}>


      {/* Logo Container */}
      <View style={styles.LogoContainer}>
        <Image style={styles.Logo} source={require('./assets/Logo.jpg')}/>
        <Text style={{color:'#fff', fontSize:30, marginTop:10, marginBottom:20}}>Sign up now!</Text>
      </View>


      {/* Form Container */}
      <View style={styles.FormContainer}>
        <TextInput style={styles.InputLogin} placeholder='Username' placeholderTextColor={'#C0C0C0'}/>
        <TextInput style={styles.InputLogin} placeholder='Password' placeholderTextColor={'#C0C0C0'} secureTextEntry={true}/>
        {/* Button to Register */}
        <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.textButton}>Sign up</Text>
        </TouchableOpacity>

        {/* Button to register */}
        <TouchableOpacity style={styles.btnIDHAA} onPress={() => navigation.navigate('Login')}>
          <Text style={{color:'#fff', fontSize:16, marginTop:30, marginBottom:20}}>I already have an account</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}


// POKEMON SCREEN
function PokemonScreen(){

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const authToken = await AsyncStorage.getItem('Admin');
    if (authToken) {
      // existing user
    } else {
      // no user, go back to login screen
      navigation.navigate('Login');
    }
  };


  return(
    <View style={styles.container}>


    </View>
  );
}


// PORSHE SCREEN
function PorsheScreen(){
  return(
    <View style={styles.container}>


    </View>
  );
}


// USER SCREEN
function UserScreen({navigation}){
  return(
    <View style={styles.UserContainer}>

      <Text style={styles.TitleUserScreen}>User Data</Text>

      <Text style={styles.LabelUserScreen}>Username:</Text>
      <Text style={{color:'#fff'}}>{LoginScreen.username}</Text>
      <Text style={styles.LabelUserScreen}>Password:</Text>
      <Text style={{color:'#fff'}}>{LoginScreen.password}</Text>


      {/* Button Logout */}
      <View style={styles.LogoutView}>
        <TouchableOpacity style={styles.btnLogout} onPress={() => navigation.navigate('Login')}>
          <Text style={{color:'#fff'}}>LOGOUT</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}



// STYLESHEET

const styles = StyleSheet.create({

  // Container
  container:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor:'#000', // background color (black)
  },


  // Login Page

  // Logo Container
  LogoContainer:{
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  Logo:{
    width:200,
    height:100,
  },


  // Form Container
  FormContainer:{
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  InputLogin:{
    width: '70%',
    height: 40,

    borderBottomColor: '#7D838C', // grey
    borderTopColor:'#000', // background color
    borderRightColor:'#000', // background color
    borderLeftColor:'#000', // background color
    borderWidth: 1,

    marginBottom: 10,
    paddingHorizontal: 10,

    color:'#fff',
    
  },

  btnLogin: {
    backgroundColor: '#1E90FF', // light blue
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 40,
    width:'50%',
    alignItems:'center'
  },
  textButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center',
  },



  // User Screen 

  UserContainer:{
    flex: 1, 
    alignItems: 'center', 
    backgroundColor:'#000', // background color (black)
  
  },

  TitleUserScreen:{
    color:'#fff',
    fontSize:40,
    marginTop:40,
    marginBottom:50,
  },

  LabelUserScreen:{
    color:'#fff',
    fontSize:20,
    marginBottom:20,
  },

  LogoutView:{
    paddingTop:300,
  },

  btnLogout:{
    backgroundColor:'red',
    width:200,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
  },
  
})



// ROUTES AND TABS
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AppNavigator() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Main" component={AppTabs} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Pokemon" component={PokemonScreen} />
        <Stack.Screen name="Porshe" component={PorsheScreen} />
        <Stack.Screen name="User" component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
 

// TAB NAVIGATION 

function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Pokemon" component={PokemonScreen} />
      <Tab.Screen name="Porshe" component={PorsheScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}


export default AppNavigator;