import * as React from 'react';
import { useState, useContext, createContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, StatusBar, ScrollView, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from './userContext';
import {UserProvider} from './userContext'
import { getModels } from 'car-info';



// LOGIN SCREEN
export function LoginScreen({navigation}){

  // Hide statusbar (batery, time, wifi...)
  StatusBar.setHidden(false); // don't hide 



  const { updateUser } = useUserContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Simulação de autenticação bem-sucedida
    const authenticatedUsername = 'Admin';
    const authenticatedPassword = '123';

    if (username === authenticatedUsername && password === authenticatedPassword) {
      updateUser(username, password);
      AsyncStorage.setItem("admin","adminLogin");
      navigation.navigate('Tabs');
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
      <TextInput
        style={styles.InputLogin}
        placeholder='Username'
        placeholderTextColor={'#C0C0C0'}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.InputLogin}
        placeholder='Password'
        placeholderTextColor={'#C0C0C0'}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
        {/* Button to verificate */}
        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
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
function PokemonScreen({ navigation }) {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = await AsyncStorage.getItem('Admin');
        if (!authToken) {
          navigation.navigate('Login');
          return;
        }

        const pokemonNames = ['zapdos', 'articuno', 'mewtwo','latios','celebi','dialga','regirock','rayquaza','jirachi','palkia','uxie','lugia','registeel','regigigas','entei','suicune','raikou'];
        const promises = pokemonNames.map(name =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(response => response.json())
        );
        const pokemonDataList = await Promise.all(promises);
        setPokemonList(pokemonDataList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={{ flex: 0, padding:30, backgroundColor:'orange'}}>
      {pokemonList.length > 0 ? (
        pokemonList.map((pokemonData, index) => (
          <View key={index} style={{ marginBottom:10, padding: 20, backgroundColor:'yellow', borderRadius:10}}>
            <Text style={styles.infoPokemon1}>Name: {pokemonData.name}</Text>
            <Text style={styles.infoPokemon2}>Height: {pokemonData.height}</Text>
            <Text style={styles.infoPokemon2}>Weight: {pokemonData.weight}</Text>
          </View>
        ))
      ) : (
        <Text>No Pokemon found...</Text>
      )}
    </ScrollView>
  );
}


// MERCEDES SCREEN
function MercedesScreen(){

  const models = getModels("Mercedes-Benz"); 

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView>
        <View style={styles.containerMercedes}>
          <Text style={{ color: '#fff', fontSize: 25, fontWeight: 'bold' }}>MODELS: {'\n'}</Text>

          
        </View>
        
        <View style={styles.ContainerModelMercedes}>
          {/* API mapping and return a Text with the models data*/}
          {models.map((model, index) => (
            <Text key={index} style={styles.models}>{model}</Text>
          ))}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
  
}


// USER SCREEN
function UserScreen({navigation}){
    const { userData } = useUserContext();

  return(

    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>

      <View style={styles.UserContainer}>

        <Image 
          source={require('./FotoPasse.png')} 
          style={{
            width:150, 
            height:150, 
            alignItems:'center', 
            borderRadius:100,
            marginBottom:60,
            marginTop:60,
          }} />

        <Text style={styles.LabelUserScreen}>Username:</Text>
        <Text style={{color:'#fff', fontSize:20, marginBottom:40, }}>{userData.username}</Text>
        <Text style={styles.LabelUserScreen}>Password:</Text>
        <Text style={{color:'#fff', fontSize:20}}>{userData.password}</Text>


        {/* Button Logout */}

        <View style={styles.LogoutView}>
          <TouchableOpacity style={styles.btnLogout} onPress={() => navigation.navigate('Login')}>
            <Text style={{color:'#fff'}}>LOGOUT</Text>
          </TouchableOpacity>

        </View>

      </View>

    </SafeAreaView>

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


  // Pokemon Screen

  infoPokemon1:{
    color:'blue',
    fontSize:25,

  },
  infoPokemon2:{
    color:'blue',
    fontSize:16,

  },


  // Mercedes Screen
  containerMercedes:{
    flex: 1, 
    backgroundColor:'#000', // background color (black)
    marginLeft: 30,
    marginTop: 30,
    paddingLeft:20,
  },

  ContainerModelMercedes:{
    flex: 1, 
    backgroundColor:'#fff', // background color (white)
    marginLeft:40,
    marginRight:40,
    padding:30,
    borderRadius:20,
    justifyContent:'center',
    
  },


  models:{
    color: '#fff', 
    fontSize: 20,
    fontWeight:'bold',
    marginBottom: 10, 
    backgroundColor:'black',
    borderRadius:10,
    padding:20,
  },


  // User Screen 

  UserContainer:{
    flex: 1, 
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#000', // background color (black)
    margin: 40,
    borderWidth:3,
    borderColor: 'white',
    borderRadius:15,
  },

  TitleUserScreen:{
    color:'#fff',
    fontSize:40,
    marginTop:40,
    marginBottom:50,
  },

  LabelUserScreen:{
    color:'#fff',
    fontSize:25,
    marginBottom:20,
  },

  LogoutView:{
    paddingTop:50,
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
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'>
          <Stack.Screen name="Main" component={AppTabs} options={{headerShown:false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown:false}}/>
          <Stack.Screen name="Pokemon" component={PokemonScreen} />
          <Stack.Screen name="Mercedes" component={MercedesScreen} />
          <Stack.Screen name="User" component={UserScreen} />
          <Stack.Screen name="Tabs" component={AppTabs} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
 

// TAB NAVIGATION 

function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Pokemon" component={PokemonScreen} />
      <Tab.Screen name="Mercedes" component={MercedesScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}


export default AppNavigator;
