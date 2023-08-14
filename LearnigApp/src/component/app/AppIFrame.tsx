import React from 'react';
import { WebView, WebViewProps } from 'react-native-webview';
import { View, ActivityIndicator, StyleSheet } from "react-native"
import { HEIGHT, WIDTH } from '../../locales/common';

interface MyWebViewProps extends WebViewProps {
  url: string;
}

const ActivityIndicatorElement = () => {
  return (
    <ActivityIndicator
      color="#009688"
      size="large"
      style={styles.activityIndicatorStyle}
    />
  );
};

const AppIFrame: React.FC<MyWebViewProps> = ({ url, ...restProps }) => {
  // const iFrameURL = `http://43.241.63.135:8000/api/v1/course-code-service/media/courses/4888587896094720/5057119698026496/index.html?user_id=17&role=Teacher`
  const iframeHtml = `
    <html>
      <body>
        <iframe src="${url}" width="${WIDTH}" height="${HEIGHT}"></iframe>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        // source={{ html: iframeHtml }}
        source={{ uri: url }}
        {...restProps}
        //Enable Javascript support
        javaScriptEnabled={true}
        //For the Cache
        domStorageEnabled={true}
        //View to show while loading the webpage
        renderLoading={ActivityIndicatorElement}
        //Want to show the view or not
        startInLoadingState={true}
      />
    </View>
  );
};

export default AppIFrame;

const styles = StyleSheet.create({
  container: { 
    width: WIDTH,
    height: HEIGHT - 200,
    marginTop: 20
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});
