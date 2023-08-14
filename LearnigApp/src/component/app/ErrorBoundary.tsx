
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import RNRestart from 'react-native-restart';
import COLORS from "../../assests/color";
import Images from "../../assests/images";
import CONSTANT from "../../locales/constants";
import CustomButton from "../customButton";
// import crashlytics from '@react-native-firebase/crashlytics';

export default class ErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        // crashlytics().recordError(error);
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
        // crashlytics().recordError(error, errorInfo);
        this.setState({ hasError: true })
    }

    handlePressRefresh = () => {
        RNRestart.restart();
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <>
                    <View style={styles.companyStyle}>
                        <Images.LogoImg style={styles.logo} />
                        <Images.SymbolImg style={styles.CompanyLogo} />
                    </View>

                    <View style={styles.borderLine} />

                    <View style={styles.container}>
                        <Text style={styles.msgText}>{CONSTANT.ERRMSG}</Text>
                        <View style={styles.button}>
                            <CustomButton
                                title={CONSTANT.REFRESH}
                                onPressButton={() => this.handlePressRefresh()}
                            />
                        </View>
                    </View>
                </>
            );
        }

        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    msgText: {
        alignSelf: "center",
        fontSize: 20
    },
    companyStyle: {
        marginTop: "10%",
        flexDirection: "row",
        justifyContent: "center",
    },
    logo: {
        width: 118,
        height: 42,
        marginRight: 7,
    },
    CompanyLogo: {
        width: 152,
        height: 48,
        marginLeft: 7,
    },
    borderLine: {
        backgroundColor: COLORS.borderLine,
        borderWidth: 0.1,
        marginTop: "3%",
    },
    button: {
        marginTop: "15%",
    },
})
