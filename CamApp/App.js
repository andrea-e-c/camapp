import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import React, {useState} from 'react';
import { Camera } from 'expo-camera';
import { Alert } from 'react-native-web';
// import CamAppRouter from './CamAppRouter';

let camera;

export default function App() {
  const [startCamera, setStartCamera] = useState(false)

  const __startCamera = async() => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if(status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('access denied')
    }
  }

  const __takePicture = async() => {
    const photo = await camera.takePictureAsync()
    console.log(photo)
  }

  return (
    <View style={styles.container}>
      {
        startCamera ? (
          <Camera 
          style={{flex: 1, width: '100%'}}
          ref = {(r) => {
            camera = r
          }}
          >
            <View 
              style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                flex: 1,
                width: '100%',
                padding: 20,
                justifyContent: 'space-between',
              }}
            >
              <View
                style={{
                  alignSelf: 'center',
                  flex: 1,
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity 
                  onPress={()=> {setStartCamera(!startCamera)}}
                  style={{
                    width: 100,
                    height: 20,
                    bottom: 15,
                    backgroundColor: 'red'
                  }}
                >
                  <Text>Back to Home</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={__takePicture}
                  style={{
                    width: 70,
                    height: 70,
                    bottom: 0,
                    borderRadius: 50,
                    backgroundColor: '#fff'
                  }}
                />
              </View>
            </View>
          </Camera>
        ) : (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
              onPress={__startCamera}
              style={{
                  width: 130,
                  borderRadius: 4,
                  backgroundColor: '#14274e',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 40
              }}
              >
              <Text style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center',
              }}> 
              Take Picture 
              </Text>
          </TouchableOpacity>
        </View>

        )
      }
        <StatusBar style='auto' />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
