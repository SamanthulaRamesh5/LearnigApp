import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native"
import COLORS from '../../assests/color';

const AppContactUs: React.FC = () => {
    return (
        <>
            <View style={styles.itemContainer}>
                <Text style={styles.title}>Head office:</Text>
                <Text style={styles.subTitle}>Office #C 1101,Tower C,
                    The OPUS Tower by Omniyat,
                    Bussiness Day, Dubai,
                    UAE.</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.title}>UK office:</Text>
                <Text style={styles.subTitle}>71-75, Shelton Street,
                    London, United Kingdom,
                    WC2H 9JQ.</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.title}>US office:</Text>
                <Text style={styles.subTitle}>242 W 30th Street Suite 1100,
                    New York, NY 10001.</Text>
            </View>
            <View style={styles.itemContainer}>
                <Text style={styles.title}>General enquiries:</Text>
                <TouchableOpacity onPress={() => Linking.openURL(`mailto:askme@alphapublishing.com`)}>
                    <Text style={styles.subTitle}>askme@alphapublishing.com</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(`tel:+97143918658`)}>
                    <Text style={styles.subTitle}>+971 4 3918658</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default AppContactUs;

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        borderBottomColor: COLORS.border_color,
        borderBottomWidth: 0.5,
        margin: 10,
    },
    title: {
        fontWeight: "bold",
        fontSize: 16
    },
    subTitle: {
        color: COLORS.labelColor,
        marginTop: 5
    }
})
