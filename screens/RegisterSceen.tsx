import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { supabase } from '../supabase/config'


export default function RegisterSceen() {

  const [user, setuser] = useState("")
  const [name, setname] = useState("")
  const [age, setage] = useState(0)
  const [password, setpassword] = useState("")
  const [confirmpass, setconfirmpass] = useState("")


  function validarCampos(){

    if(
      name.trim() === "" || 
      user.trim() === "" || 
      password.trim() === "" || 
      confirmpass.trim() === "")
      {
        Alert.alert("Error", "Todos los campos son obligatorios")
        return false
      }

    if(age < 5 || isNaN(age))
      {
        Alert.alert("Error", "Edad minima 5 años")
        return false
      }

    if(password !== confirmpass)
      {
        Alert.alert("Error", "Las contraseñas no coinciden")
        return false
      }

    if(password.length < 6)
      {
        Alert.alert("Error", "La contraseña debe tener al menos 6 caracteres")
        return false

      } return true
  }



  async function guardarRegister(){

    if(!validarCampos()){
      return
    }

    const { error } = await supabase
  .from('register')
  .insert(
    { 
      user: user, 
      name: name,
      age: age,
      password: password,
      confirmpass: confirmpass
    }
  )
  //console.log(error);
  if(error){
    console.log(error);
    Alert.alert("Error", "No se pudo registrar el usuario")
  }else{
    Alert.alert("Éxito", "Usuario registrado correctamente")
  }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}> ¡Registrar Usuario! </Text>
      <Text> </Text>

        <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre</Text>
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

      <TouchableOpacity  style={styles.button} onPress={()=>guardarRegister()}>
        <Text style={{ color:'white'}}> REGISTRAR </Text>
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
    textShadowColor: '#7399e9',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
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