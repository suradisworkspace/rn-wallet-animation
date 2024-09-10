import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SIZE, MARGIN } from "@/pages/MyWallet/ArrangeWallet/configs";
export type WalletBoxType = {
  id: string;
  name: string;
  money: number;
};
const WalletBox = (props: WalletBoxType) => {
  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text>{props.name}</Text>
        <Text>{props.money}</Text>
      </View>
    </View>
  );
};

export default WalletBox;

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
