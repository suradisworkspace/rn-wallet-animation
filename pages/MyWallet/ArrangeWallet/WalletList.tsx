import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement, ReactNode } from "react";
import Animated, {
  useSharedValue,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { COL, SIZE, animTimingConfig } from "./configs";
import { getPosFromInd, getIndFromPos } from "./utils";
import WalletItem from "./WalletItem";
import { WalletType } from "./WalletItem";
type WalletListPropsType = {
  //   children: ReactElement<{ id: string }>[];
  list: WalletType[];
};

export type Positions = {
  [id: string]: number;
};

const WalletList = (props: WalletListPropsType) => {
  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...props.list.map((wallet, index) => ({
        [wallet.id]: index,
      }))
    )
  );
  return (
    <View
      style={{
        height: Math.ceil(props.list.length / COL) * SIZE,
      }}
    >
      {props.list.map((wallet) => (
        <WalletItem
          key={wallet.id}
          id={wallet.id}
          name={wallet.name}
          money={wallet.money}
          positions={positions}
        />
      ))}
    </View>
  );
};

export default WalletList;

const styles = StyleSheet.create({});
