import React, {useState, useEffect} from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';

const CamAppRouter = (props) => {
    const { styles } = props

    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted')
        }) ()
    }, [])

    if(hasPermission === null){
        return <View />
    }

    if (hasPermission === false) {
        return <Text>No camera access</Text>
    }

    return (
        null
    )
}

export default CamAppRouter;