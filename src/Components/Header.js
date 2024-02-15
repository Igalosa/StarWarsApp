import React from "react";
import { StyleSheet } from "react-native";
import {
  Assets,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";

export default function Header({ male, feMale, noGender, handleReset }) {
  return (
    <View
      flex={0}
      row
      margin-s4
      padding-s2
      style={{ justifyContent: "space-between" }}
    >
      <View row center style={styles.tableView}>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>Male: </Text>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>{male}</Text>
      </View>
      <View row center style={styles.tableView}>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>Female:</Text>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>{feMale}</Text>
      </View>
      <View row center style={styles.tableView}>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>Others:</Text>
        <Text style={{ fontSize: 14, fontWeight: "500" }}>{noGender}</Text>
      </View>
      <View center>
        <TouchableOpacity center onPress={handleReset} style={styles.resetBtn}>
          <Image
            assetName="delete"
            resizeMode="contain"
            style={styles.resetImg}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resetBtn: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    aspectRatio: 1,
    elevation: 4,
    height: 40,

    // Додаткова властивість для Android
  },
  tableView: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    fontWeight: "bold",
    width: "25%",
    height: 40,
  },
  resetImg: {
    height: "75%",
    width:"100%"
  },
});
Assets.loadAssetsGroup("icons", {
  delete: require("../../assets/delete.png"),
});
