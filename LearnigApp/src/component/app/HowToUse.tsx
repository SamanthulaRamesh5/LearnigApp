import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native"
import COLORS from '../../assests/color';

interface props {
    title: string;
    listData: any;
}

const HowToUse: React.FC<props> = ({ title, listData }) => {
    return (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{title}</Text>
            {listData.map((item: any, index: Number) =>
                <View key={index.toString()} style={styles.subTitleContainer}>
                    <Text style={styles.subTitle}>{`\u25AA`}</Text>
                    <Text style={styles.subTitle}>{item}</Text>
                </View>)}
        </View>
    )
}

export default HowToUse;

const styles = StyleSheet.create({
    itemContainer: {
        padding: 10,
        borderBottomColor: COLORS.border_color,
        borderBottomWidth: 0.5,
        margin: 10,
    },
    subTitleContainer: {
        flexDirection: "row",
        width: "90%",
    },
    title: {
        fontWeight: "bold",
        fontSize: 18
    },
    subTitle: {
        color: COLORS.labelColor,
        marginTop: 10,
        marginHorizontal: 5
    }
})
