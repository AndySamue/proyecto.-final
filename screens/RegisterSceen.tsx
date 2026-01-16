import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'


export default function RegisterSceen() {

  const [name, setname] = useState("")
  const [age, setage] = useState(0)
  const [user, setuser] = useState("")
  const [password, setpassword] = useState("")
  const [confirmpass, setconfirmpass] = useState("")


  return (
    <View style={styles.container}>
      <Text style={styles.title}> ¡ÚNETE A LA AVENTURA! </Text>
      <Text style={styles.subtitle}>Crea tu personaje</Text>

        <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre del Héroe</Text>
        <TextInput
        placeholder='Nombre'
        placeholderTextColor={'#1d3557d8'}
        style={styles.input}
        onChangeText={(texto)=>setname(texto)}
      />
      

      <Text style={styles.label}>Edad</Text>
      <TextInput
        placeholder='Edad'
        placeholderTextColor={'#1d3557d8'}
        style={styles.input}
        onChangeText={(texto)=>setage(+texto)}
        keyboardType='numeric'
      />

      <Text style={styles.label}>Usuario</Text>
      <TextInput
        placeholder='Usuario'
        placeholderTextColor={'#1d3557d8'}
        style={styles.input}
        onChangeText={(texto)=>setuser(texto)}
      />

      <Text style={styles.label}>Contraseña</Text>
      <TextInput
        placeholder='Contraseña Secreta'
        placeholderTextColor={'#1d3557d8'}
        style={styles.input}
        onChangeText={(texto)=>setpassword(texto)}
        secureTextEntry={true}
      />

      <Text style={styles.label}>Confirmar Contraseña</Text>
      <TextInput
        placeholder='Confirma tu Contraseña'
        placeholderTextColor={'#1d3557d8'}
        style={styles.input}
        onChangeText={(texto)=>setconfirmpass(texto)}
        secureTextEntry={true}
      />
      </View>

      <TouchableOpacity  style={styles.button} onPress={()=>{}}>
        <Text style={{ color:'white'}}>🎮 REGISTRAR 🎮</Text>
      </TouchableOpacity>
      

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    alignItems:'center',
    justifyContent:'center',
  },
  input:{
    fontSize: 13,
    margin:5,
    borderRadius:15,
    padding:13,
    textAlign:'center',
    color:'#1d3557',
    borderWidth:3,
    borderColor:'#a8dadc',
  },
  title:{
    fontSize:28,
    marginBottom:10,
    textAlign:'center',
    fontWeight:'bold',
    color:'#1d3557',
    textShadowColor: '#FE7F2D',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  subtitle:{
    fontSize:16,
    marginBottom:25,
    textAlign:'center',
    color:'#1d3557',
  },
  formContainer:{
    backgroundColor:'#ffffff',
    borderRadius:20,
    padding:15,
    width:'95%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  label:{
    fontSize:16,
    fontWeight:'600',
    color:'#1d3557',
    marginLeft:10,
  },
  button:{
    backgroundColor:'#1d3557',
    paddingVertical:15,
    paddingHorizontal:40,
    borderRadius:25,
    marginTop:25,
    width:'90%',
    alignItems:'center',
    borderWidth:3,
  }
})