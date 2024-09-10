import { StyleSheet } from "react-native";
import React from "react";
import { animTimingConfig } from "./configs";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  SharedValue,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedReaction,
} from "react-native-reanimated";

import WalletBox from "@/components/WalletBox";

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
      // get former index, new index, and dup the positions
      const formerIndex = props.positions.value[props.id];
      const newIndex = getIndFromPos(
        translateX.value,
        translateY.value,
        Object.keys(props.positions.value).length
      );
      const newPositions = { ...props.positions.value };

      // this method for reordering
      //
      newPositions[props.id] = newIndex;
      if (newIndex !== formerIndex) {
        Object.keys(newPositions).forEach((key) => {
          if (key !== props.id) {
            const posVal = newPositions[key];
            if (posVal > formerIndex && posVal <= newIndex) {
              newPositions[key]--;
            } else if (posVal < formerIndex && posVal >= newIndex) {
              newPositions[key]++;
            }
          }
        });
      }
      // this method for swapping
      //
      // const swapWith = Object.keys(props.positions.value).find(
      //   (key) => props.positions.value[key] === newInd
      // );
      // if (swapWith) {
      //   const formerIndex = props.positions.value[props.id];
      //   newPositions[swapWith] = formerIndex;
      // }
      props.positions.value = newPositions;
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
        <WalletBox id={props.id} name={props.name} money={props.money} />
      </GestureDetector>
    </Animated.View>
  );
};

export default WalletItem;
