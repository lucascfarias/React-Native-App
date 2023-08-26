import * as React from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



// LOGIN SCREEN
function LoginScreen({navigation}){

  // Hide statusbar (batery, time, wifi...)
  StatusBar.setHidden(false); // don't hide 


  // States
  const [Username, setUsername] = React.useState('')
  const [Password, setPassword] = React.useState('')
  
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
        <TextInput style={styles.InputLogin} placeholder='Username' placeholderTextColor={'#C0C0C0'}/>
        <TextInput style={styles.InputLogin} placeholder='Password' placeholderTextColor={'#C0C0C0'} secureTextEntry={true}/>
        {/* Button to Register */}
        <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.textButton}>Verificar</Text>
        </TouchableOpacity>

        {/* Button to register */}
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



// HOME PAGE
function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>

      <Text style={styles.titleHome}>Home Screen</Text>


      {/* Button to Detials */}
      <TouchableOpacity style={styles.btnHome} onPress={() => navigation.navigate('Login')}>
        <Text style={{color:'#000'}}>Voltar pro Login</Text>
      </TouchableOpacity>

    </View>
  );
}


// POKEMON SCREEN
function PokemonScreen(){
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
      <Text style={styles.LabelUserScreen}>:</Text>
      <Text style={styles.LabelUserScreen}>Password:</Text>
      <Text style={styles.LabelUserScreen}>:</Text>


      {/* Button Logout */}
      <View style={styles.LogoutView}>
        <TouchableOpacity style={styles.btnLogout} onPress={() => navigation.navigate('Login')}>
          <Text style={{color:'#fff'}}>LOGOUT</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}


// function alert(){
//   alert(senha)
// }



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
        <Stack.Screen name="Porshe" component={PokemonScreen} />
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