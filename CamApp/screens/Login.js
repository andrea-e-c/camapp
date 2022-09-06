import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet} from 'react-native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from "native-base";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth} from "../firebase/firebase";

const Login = () => {
    const navigation = useNavigation()
    const auth = firebaseAuth;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = (givenEmail, givenPassword) => {
        signInWithEmailAndPassword(auth, givenEmail, givenPassword)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log('signed in!', user)
            navigation.navigate('Home')
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('The following error has occurred: ', errorCode, errorMessage)
          });
    }

    useEffect(() => {
        if(auth.currentUser){
            navigation.navigate('Home')
        } 
    })

    return (
        <View style={styles.container}>
            <View style={styles.Middle}>
                <Text style={styles.LoginText}>Login</Text>
            </View>
            <View>
                <Text style={styles.text2}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                    <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
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
                        onChangeText={(newText) => setEmail(newText)}
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
                    onChangeText={(newText) => setPassword(newText)}
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
                    onPress={() => loginUser(email, password)}
                >
                    LOGIN
                </Button>
            </View>
            {/* Line */}
            <View style={styles.lineStyle}>
                <View style={{flex:1, height:1, backgroundColor:'black'}} />
                <View>
                    <Text style={{width:50, textAlign:'center'}}>Or</Text>
                </View>
                <View style={{flex:1, height:1, backgroundColor:'black'}} />
            </View>
            <View style={styles.boxStyle}>
                <Box
                onPress={() => navigation.navigate('#')}
                style={{height: 80, width: 80, marginLeft: 20}}
                shadow={3}
                _light={{
                    backgroundColor: 'gray.50'
                }}
                _dark={{
                    backgroundColor: 'gray.700'
                }}
                >
                    <AspectRatio ratio={1/1}>
                        <Image 
                        source={{
                            uri:"https://www.transparentpng.com/thumb/apple-logo/RRgURB-apple-logo-clipart-hd.png"
                        }}
                        alt='apple logo'
                        />
                    </AspectRatio>
                </Box>
                <Box
                onPress={() => navigation.navigate('#')}
                style={{height: 80, width: 80, marginLeft: 20}}
                shadow={3}
                _light={{
                    backgroundColor: 'gray.50'
                }}
                _dark={{
                    backgroundColor: 'gray.700'
                }}
                >
                    <AspectRatio ratio={1/1}>
                        <Image 
                        source={{
                            uri:"https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png"
                        }}
                        alt='google logo'
                        />
                    </AspectRatio>
                </Box>
                <Box
                onPress={() => navigation.navigate('#')}
                style={{height: 80, width: 80, marginLeft: 20}}
                shadow={3}
                _light={{
                    backgroundColor: 'gray.50'
                }}
                _dark={{
                    backgroundColor: 'gray.700'
                }}
                >
                    <AspectRatio ratio={1/1}>
                        <Image 
                        source={{
                            uri:"https://www.transparentpng.com/thumb/facebook-logo-png/photo-facebook-logo-png-hd-25.png"
                        }}
                        alt='facebook logo'
                        />
                    </AspectRatio>
                </Box>
            </View>
        </View>
    )
}

export default () => {
    return (
        <NativeBaseProvider>
            <Login />
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