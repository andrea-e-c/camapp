import React, {useState} from "react";
import { View, Text, StyleSheet} from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
    const navigation = useNavigation();
    const auth = getAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signupUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log('successfully signed up', user)
        navigation.navigate('Home')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('there was an error', errorCode, errorMessage)
        // ..
      });
    }

return (
    <View style={styles.container}>
        <View style={styles.Middle}>
            <Text style={styles.LoginText}>Signup</Text>
        </View>

        {/* Username or email input */}
        <View style={styles.buttonStyle}>
            <View style={styles.emailInput}>
                <Input 
                    InputLeftElement={
                        <Icon 
                        as={<FontAwesome5 name='user-secret' />}
                        size='sm'
                        m={2}
                        />
                    }
                    variant='outline'
                    placeholder = 'Username or email'
                    onChangeText={newText => setEmail(newText)}
                    _light={{
                        placeholderTextColor: 'blueGray.400'
                    }}
                    _dark={{
                        placeholderTextColor: 'blueGray.50'
                    }}
                />
            </View>
        </View>
        {/* password input */}
        <View style={styles.buttonStyleX}>
            <View style={styles.emailInput}>
                <Input 
                InputLeftElement={
                    <Icon
                    as={<FontAwesome5 name="key" />}
                    size='sm'
                    m={2}
                    _light={{
                        color: 'black'
                    }}
                    _dark={{
                        color: 'gray.300'
                    }}
                    />
                }
                variant="outline"
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={newText => setPassword(newText)}
                _light={{
                    placeholderTextColor: 'blueGray.400'
                }}
                _dark={{
                    placeholderTextColor: 'blueGray.50'
                }}
                />
            </View>
        </View>
        <View style={styles.buttonStyle}>
            <Button 
                style={styles.buttonDeisgn}
                onPress={signupUser(email, password)}
            >
                LOGIN
            </Button>
        </View>
        {/* Line */}
    </View>
)
}

export default () => {
return (
    <NativeBaseProvider>
        <Signup />
    </NativeBaseProvider>
)
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
},
LoginText:{
    marginTop: 100,
    fontSize: 30,
    fontWeight: 'bold',
},
Middle: {
    alignItems: 'center',
    justifyContent: 'center',
},
text2: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
},
signupText: {
    fontWeight: 'bold'
},
emailInput: {
    marginTop: 10,
    marginRight: 5,
},
buttonStyle: {
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
},
buttonStyleX: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
},
buttonDeisgn: {
    backgroundColor: '#026efd',
},
lineStyle: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    alignItems: 'center',
},
boxStyle: {
    flexDirection: 'row',
    marginTop: 30,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: 'space-around',
}
})