import React from "react";
import { Button, View } from "react-native-ui-lib";

export default function Pagination({
  handlePrevPage,
  handleNextPage,
  currentPageNumber,
  totalPages,
}) {
  return (
    <View
      flex-0
      spread
      row
      marginT-20
      marginB-20
      width={"70%"}
      style={{ alignSelf: "center" }}
    >
      <Button
        borderRadius={12}
        disabled={currentPageNumber <= 1 ? true : false}
        label="<-"
        onPress={handlePrevPage}
        backgroundColor="darkmagenta"
        labelStyle={{ fontWeight: "800" }}
      ></Button>
      <Button
        backgroundColor="darkmagenta"
        labelStyle={{ fontWeight: "800" }}
        disabled={currentPageNumber >= totalPages ? true : false}
        borderRadius={12}
        label="->"
        onPress={handleNextPage}
      ></Button>
    </View>
  );
}
