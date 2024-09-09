import { StyleSheet, Text, View } from "react-native";
import React from "react";
import WalletList from "./WalletList";
import WalletItem from "./WalletItem";
const list = [
  {
    id: "1",
    name: "free",
    money: 100,
  },
  {
    id: "2",
    name: "personal",
    money: 500,
  },
  {
    id: "3",
    name: "saving",
    money: 250,
  },
  {
    id: "4",
    name: "credit payment",
    money: 5000,
  },
  {
    id: "5",
    name: "travel",
    money: 125,
  },
];
const ArrangeWallet = () => {
  return (
    <View>
      <WalletList list={list} />
    </View>
  );
};

export default ArrangeWallet;

const styles = StyleSheet.create({});
