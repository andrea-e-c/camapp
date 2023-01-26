import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Alert } from 'react-native-web';
import * as FileSystem from 'expo-file-system';
import { getInfoAsync, makeDirectoryAsync } from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import { getDownloadURL, ref, uploadBytesResumable, listAll} from 'firebase/storage';
import { NativeBaseProvider } from "native-base"
import { firebaseApp, firebaseAuth, firebaseStorage } from '../firebase/firebase';
import PrintPhotosPrompt from './PrintPhotosPrompt';
import { useNavigation } from "@react-navigation/native";
import Overlay from "../assets/filmoverlay.png"


function Home() {
  const [hasPermission, setHasPermission] = useState(false)
  const [photo, setPhoto] = useState();
  const [photoCount, setPhotoCount] = useState(1)
  const [cameraType, setCameraType] = useState(CameraType.back)
  const [isPreview, setIsPreview] = useState(false)
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const cameraRef = useRef();
  const navigation = useNavigation()
  const storage = firebaseStorage
  const auth = firebaseAuth
  const user = auth.currentUser

  const photoFolderRef = ref(storage, `users/${user.uid}`)

  useEffect(() => {
    listAll(photoFolderRef)
    .then((res) => {
      setPhotoCount(res.items.length)
    })
  })

  useEffect(() => {
    if(photoCount >= 10){
      setModalVisible(true)
    }
  }, [photoCount])

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

//   const checkDirectoryExists = async (directory) => {
//     const directoryInfo = await getInfoAsync(directory);
//     if(!directoryInfo){
//       await makeDirectoryAsync(directory, { intermediates: true})
//     }
//   }

//   const persistCachedFile = async( cachedFile, permanentFolder, fileId) => {
//     const permanentDirectoryPath = `${ FileSystem.documentDirectory }${ permanentFolder }/`
//     const uniqueFilePath = `${ permanentDirectoryPath }${ fileId }-${ Date.now() }`;

//     await checkDirectoryExists( permanentDirectoryPath );

//     await FileSystem.copyAsync( {
//         from: cachedFile,
//         to: uniqueFilePath
//     } );
//     return uniqueFilePath;
// }

  const sendToFirebase = async (uri, user) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function(){
        resolve(xhr.response)
      };
      xhr.onerror = function(){
        reject(new TypeError('Network request failed'))
      }
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    })

    const storageRef = ref(firebaseStorage, `users/${user.uid}/image-`+ String(photoCount));
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, (error) => {
      console.error(error)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at ', downloadURL)
      })
    })
  }

  const __takePicture = async() => {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    }
    let newPhoto = await cameraRef.current.takePictureAsync(options)
    setPhoto(newPhoto)
    if(photo){
      setIsPreview(true)
      console.log(photo.uri)
      // sendToFirebase(newPhoto.uri, user)
      cancelPreview()
    }
  }

  const checkout = () => {
    navigation.navigate('PrintPhotosPage')
  }
  let savedPhoto = useRef(null)

  if(isPreview){
    return (
        <View style={styles.middlePhoto} ref={savedPhoto}>
          <Image source={Overlay} style={styles.filter}/>
          <Image source={{uri: photo.uri}} style={{flex:1}} />
        </View>
    )
  }


  return (
    <View style={styles.container}>
      {
        hasPermission ? (
          <Camera 
          style={{flex: 1, width: '100%'}}
          ref={cameraRef}
          type={cameraType}
          onCameraReady={onCameraReady}
          >
            <View 
              style={{
                position: 'absolute',
                bottom: 25,
                flexDirection: 'row',
                width: '100%',
                padding: 20,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
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
                onPress={switchCamera}
                >
                  <MaterialIcons name='flip-camera-ios' size={28} color='white' />
                </TouchableOpacity>
                <Text style={{fontSize: 40}}>{10 - photoCount} remaining</Text>
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
          {/* <View>
            <PaymentScreen />
          </View> */}
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
          <TouchableOpacity
              onPress={checkout}
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
              Checkout 
              </Text>
          </TouchableOpacity>
        </View>

        )
      }
        <StatusBar style='auto' />
        <PrintPhotosPrompt modalVisible={modalVisible} setModalVisible={setModalVisible} />
      </View>
  );
}

export default () => {
    return (
        <NativeBaseProvider>
            <Home />
        </NativeBaseProvider>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middlePhoto: {
    flex: 1,
    position: 'relative'
  },
  filter: {
    opacity: 0.8,
    position: "absolute",
    top: 0,
    left: 0,
  }
});
