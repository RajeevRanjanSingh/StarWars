
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export default  MyActivityIndicator = (props) => (
    <View style={{alignItems: 'center', justifyContent: 'center', position: 'absolute', backgroundColor: 'rgba(0,0,0, 0.4)',
        zIndex: 10, top: 0, bottom: 0, left: 0, right: 0}}>
            <ActivityIndicator size="large" color="red"/>
    </View>
);
