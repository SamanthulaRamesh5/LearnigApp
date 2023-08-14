import React from 'react';
import {
    SafeAreaView
} from 'react-native';
import { WebView } from 'react-native-webview';
import styles from '../StudentAssessments/styles';

// ...
const StudentWebview = ({ route }: any) => {
    const uri = route.params.uri;
    
  return (
    <SafeAreaView style={[styles.mainView, {backgroundColor:'lightblue'}]}>
        <WebView source={{ uri: uri }} style={{ flex: 1 }} />
    </SafeAreaView>
  )
}

export default StudentWebview;