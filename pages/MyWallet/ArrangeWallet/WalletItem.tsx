import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { animTimingConfig, MARGIN, SIZE } from "./configs";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedReaction,
} from "react-native-reanimated";
import { getPosFromInd, getIndFromPos } from "./utils";
import { Positions } from "./WalletList";

export type WalletType = {
  id: string;
  name: string;
  money: number;
};

type WalletItemPropsType = WalletType & {
  positions: SharedValue<Positions>;
};

const WalletItem = (props: WalletItemPropsType) => {
  const position = getPosFromInd(props.positions.value[props.id!]);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);
  const prevTranslationX = useSharedValue(position.x);
  const prevTranslationY = useSharedValue(position.y);
  const isDrag = useSharedValue(false);

  const itemStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
      zIndex: isDrag.value ? 100 : 0,
    };
  });

  const tap = Gesture.Pan()
    .onStart(() => {
      isDrag.value = true;
    })
    .onUpdate((event) => {
      translateX.value = prevTranslationX.value + event.translationX;
      translateY.value = prevTranslationY.value + event.translationY;
      const newInd = getIndFromPos(
        translateX.value,
        translateY.value,
        Object.keys(props.positions.value).length
      );
      const swapWith = Object.keys(props.positions.value).find(
        (key) => props.positions.value[key] === newInd
      );
      const newPos = { ...props.positions.value };
      newPos[props.id] = newInd;
      if (swapWith) {
        const oldInd = props.positions.value[props.id];
        newPos[swapWith] = oldInd;
      }
      props.positions.value = newPos;
    })
    .onEnd(() => {
      isDrag.value = false;
      const { x, y } = getPosFromInd(props.positions.value[props.id!]);
      translateX.value = withTiming(x, animTimingConfig);
      translateY.value = withTiming(y, animTimingConfig);
      prevTranslationX.value = x;
      prevTranslationY.value = y;
    })
    .runOnJS(true);

  useAnimatedReaction(
    () => props.positions.value[props.id]!,
    (newIndex) => {
      if (!isDrag.value) {
        const pos = getPosFromInd(newIndex);
        translateX.value = withTiming(pos.x, animTimingConfig);
        prevTranslationX.value = withTiming(pos.x, animTimingConfig);
        translateY.value = withTiming(pos.y, animTimingConfig);
        prevTranslationY.value = withTiming(pos.y, animTimingConfig);
      }
    }
  );

  return (
    <Animated.View style={itemStyle}>
      <GestureDetector gesture={tap}>
        <View style={styles.container}>
          <View style={styles.itemContainer}>
            <Text>{props.name}</Text>
            <Text>{props.money}</Text>
          </View>
        </View>
      </GestureDetector>
    </Animated.View>
  );
};

export default WalletItem;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
  },
  itemContainer: {
    flex: 1,
    margin: MARGIN * 2,
    borderRadius: MARGIN,
    backgroundColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});
