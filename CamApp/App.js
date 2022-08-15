import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Alert } from 'react-native-web';
import * as FileSystem from 'expo-file-system';
import { getInfoAsync, makeDirectoryAsync } from 'expo-file-system';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
// import CamAppRouter from './CamAppRouter';

// let camera;

export default function App() {
  const [hasPermission, setHasPermission] = useState(false)
  const [photo, setPhoto] = useState();
  const [cameraType, setCameraType] = useState(CameraType.back)
  const [isPreview, setIsPreview] = useState(false)
  const [isCameraReady, setIsCameraReady] = useState(false)

  const cameraRef = useRef();

  useEffect(() => {
    onHandlePermission()
  }, [])

  const onHandlePermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  }

  const onCameraReady = () => {
    setIsCameraReady(true)
  }

  const switchCamera = () => {
    if(isPreview)return;
    setCameraType(cameraType === CameraType.back ? CameraType.front : CameraType.back)
  }

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false)
  }

  const __startCamera = async() => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if(status === 'granted') {
      setHasPermission(true)
    } else {
      Alert.alert('access denied')
    }
  }

  const checkDirectoryExists = async (directory) => {
    const directoryInfo = await getInfoAsync(directory);
    if(!directoryInfo){
      await makeDirectoryAsync(directory, { intermediates: true})
    }
  }

  const persistCachedFile = async( cachedFile, permanentFolder, fileId) => {
    const permanentDirectoryPath = `${ FileSystem.documentDirectory }${ permanentFolder }/`
    const uniqueFilePath = `${ permanentDirectoryPath }${ fileId }-${ Date.now() }`;

    await checkDirectoryExists( permanentDirectoryPath );

    await FileSystem.copyAsync( {
        from: cachedFile,
        to: uniqueFilePath
    } );

    return uniqueFilePath;
}
  const __takePicture = async() => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    }
    let newPhoto = await cameraRef.current.takePictureAsync(options)
    setPhoto(newPhoto)
    // const photo = await camera.takePictureAsync()
    console.log('i am photo state', newPhoto.uri) // newPhoto.base64 is the actual image file
    const source = newPhoto.base64
    if(source){
      await cameraRef.current.pausePreview();
      setIsPreview(true)

      let base64Img = `data:image/jpg;base64,${source}`;
      let data = {
        file: base64Img,
        uploadPreset: 'preset',
      }
      persistCachedFile(newPhoto.uri, 'CamApp', 'image')
    }
    // This is done with persistCachedFile
    // FileSystem.copyAsync({
    //   from: newPhoto.uri,
    //   to: FileSystem.documentDirectory
    // })
  }


  return (
    <View style={styles.container}>
      {
        hasPermission ? (
          <Camera 
          style={{flex: 1, width: '100%'}}
          // ref = {(r) => {
          //   camera = r
          // }}
          ref={cameraRef}
          type={cameraType}
          onCameraReady={onCameraReady}
          >
            <View 
              style={{
                position: 'absolute',
                bottom: 25,
                flexDirection: 'row',
                // flex: 1,
                width: '100%',
                padding: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* <View
                style={{
                  alignSelf: 'center',
                  flex: 1,
                  alignItems: 'center',
                }}
              > */}
                <TouchableOpacity 
                  onPress={()=> {setHasPermission(!hasPermission)}}
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
                <TouchableOpacity
                // disabled={!isCameraReady}
                onPress={switchCamera}
                >
                  <MaterialIcons name='flip-camera-ios' size={28} color='white' />
                </TouchableOpacity>
              </View>
            {/* </View> */}
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
