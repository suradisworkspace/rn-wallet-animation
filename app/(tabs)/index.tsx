import { StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ArrangeWallet from "@/pages/MyWallet/ArrangeWallet";

const MyWallet = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ArrangeWallet />
    </SafeAreaView>
  );
};

export default MyWallet;

const styles = StyleSheet.create({ container: { flex: 1 } });
