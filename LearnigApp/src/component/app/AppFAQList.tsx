import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, FlatList, StyleSheet } from 'react-native';
import gStyles from '../../css';
import COLORS from '../../assests/color';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQListProps {
  data: FAQItem[];
}

const AppFAQList: React.FC<FAQListProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setActiveIndex((prevIndex) => (prevIndex === id ? null : id));
  };

  const renderFAQItem = ({ item }: { item: FAQItem }) => {
    const { id, question, answer } = item;
    const isOpen = activeIndex === id;
    const rotateAnimation = new Animated.Value(isOpen ? 1 : 0);
    const contentHeight = isOpen ? answer.length * 20 : 0;

    const rotateInterpolation = rotateAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const toggleAnimation = () => {
      Animated.timing(rotateAnimation, {
        toValue: isOpen ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start();

      toggleItem(id);
    };

    return (
      <>
        <TouchableOpacity onPress={toggleAnimation}>
          <View style={styles.questionContainer}>
            <Text>{question}</Text>
            <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
              <Text>▼</Text>
            </Animated.View>
          </View>
        </TouchableOpacity>
        {isOpen && (
          <Animated.View style={[styles.answerContainer, { height: contentHeight }]}>
            <Text>{answer}</Text>
          </Animated.View>
        )}
      </>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderFAQItem}
      // contentContainerStyle={gStyles.flatListContainerPadding}
      keyExtractor={(item) => item.id}
      ListEmptyComponent={() => <Text style={styles.emptyText}>Coming Soon...</Text>}
    />
  );
};

export default AppFAQList;

const styles = StyleSheet.create({
  questionContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border_color
  },
  answerContainer: {
    overflow: "hidden",
    backgroundColor: "#EEE",
    padding: 10,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.greenColor,
    textAlign: "center",
    marginTop: 50,
    fontWeight: "bold"
  }

})
