import { StyleSheet, View } from "react-native";
import React from "react";
import { useSharedValue } from "react-native-reanimated";
import { COL, SIZE } from "./configs";
import WalletItem from "./WalletItem";
import { WalletType } from "./WalletItem";
type WalletListPropsType = {
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
