import React, {useState} from 'react';
import { View, Text, Button } from 'react-native'

const CamAppRouter = (props) => {
    const { styles } = props

    const [test, setTest] = useState(true)

    return (
        <View style={styles.container}>
            <Text>Open Camera</Text>
            <Button onPress={()=>{setTest(!test)}} title= { test ? "Click me!" : "YOU DID IT!"} />
        </View>
    )
}

export default CamAppRouter;