import { FormConfiguration } from "@components/Form/AddMovieFormContent";
import {
  Page,
  Text,
  View,
  StyleSheet,
  Document,
  Font,
  Image,
} from "@react-pdf/renderer";
import { FC } from "react";
import NasuRegular from "../../public/font/Nasu-Regular.ttf";
import NasuBold from "../../public/font/Nasu-Bold.ttf";

Font.register({
  family: "Nasu-Regular",
  src: NasuRegular,
});
Font.register({
  family: "Nasu-Bold",
  src: NasuBold,
});
const BORDER_STYLE = "solid";
const BORDER_COLOR = "#000";
const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 65,
    paddingHorizontal: 20,
    backgroundColor: "#E4E4E4",
    fontFamily: "Nasu-Regular",
  },
  table: {
    width: "100%",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableRow: {
    // margin: "auto",
    flexDirection: "row",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  tableCellHeader: {
    backgroundColor: "green",
  },
  tableCellHeaderText: {
    fontSize: 8,
    fontWeight: 500,
    fontFamily: "Nasu-Bold",
    color: "white",
  },
  tableCellBody: {
    // margin: 5,
    fontSize: 8,
    fontWeight: 500,
    fontFamily: "Nasu-Bold",
  },
  tableCellBodyText: {
    fontSize: 7,
    fontWeight: 500,
    fontFamily: "Nasu-Bold",
  },
  tableCell: {
    width: "100%",
    padding: 5,
    fontSize: 10,
    fontFamily: "Nasu-Regular",
    textAlign: "center",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderLeftWidth: 1,
  },
  tableCellSmall: {
    width: 100,
    padding: 5,
    fontSize: 10,
    fontFamily: "Nasu-Regular",
    textAlign: "center",
    borderStyle: BORDER_STYLE,
    borderColor: BORDER_COLOR,
    borderLeftWidth: 1,
  },
  grayBox: {
    padding: 1,
    marginLeft: 2,
    backgroundColor: "gray",
    fontSize: 8,
  },
  countText: {
    fontSize: 8,
    fontWeight: 500,
    fontFamily: "Nasu-Bold",
    border: "1px solid black",
    padding: 1,
    width: 15,
    textAlign: "center",
  },
});

type Props = {
  formValue: {
    title: string;
    category: string[];
    platform: string[];
    raito: string;
    scale: string;
    thumbnail: File | null | string;
    movie: File | null | string;
    configuration: FormConfiguration[];
  };
};

export const PDFMovieConfiguration: FC<Props> = ({ formValue }) => {
  const {
    title,
    category,
    platform,
    raito,
    scale,
    thumbnail,
    configuration,
  } = formValue;
  const sceneNumber = configuration.length;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.tableCellHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>フォーマット名</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>再生時間</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>シーン数</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>素材数</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>比率</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>解像度</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableCellBody}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellBodyText}>{title}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellBodyText}>{scale}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellBodyText}>{sceneNumber}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellBodyText}>素材数</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellBodyText}>{raito}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellBodyText}>解像度</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            fontSize: 10,
            flexDirection: "row",
          }}
        >
          <Text>推奨配信先：</Text>
          {platform.map((item) => (
            <Text style={styles.grayBox} key={item}>{item}</Text>
          ))}
        </View>
        <View style={styles.table}>
          <View style={styles.tableCellHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCellSmall}>
                <Text style={styles.tableCellHeaderText}>シーンNo</Text>
              </View>
              <View style={styles.tableCellSmall}>
                <Text style={styles.tableCellHeaderText}>Time</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>画面プレビュー</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>必要な素材</Text>
              </View>
            </View>
          </View>
          <View style={styles.tableCellBody}>
            {configuration.map((item,index) => (
              <View key={index} style={styles.tableRow} wrap={false}>
                <View style={styles.tableCellSmall}>
                  <Text style={styles.tableCellBodyText}>{item.scene}</Text>
                </View>
                <View style={styles.tableCellSmall}>
                  <Text style={styles.tableCellBodyText}>{item.time}秒間</Text>
                </View>
                <View style={styles.tableCell}>
                  {item.preview && (
                    <Image
                      style={{ maxWidth: "100%" }}
                      src={window.URL.createObjectURL(new Blob([item.preview]))}
                    />
                  )}
                </View>
                <View style={styles.tableCell}>
                  <Text style={styles.grayBox}>画像・動画</Text>
                  <View style={{ marginTop: 5, marginBottom: 5 }}>
                    <Text style={styles.tableCellBodyText}>
                      [推奨素材サイズ]1920×1080
                    </Text>
                    <Text style={styles.tableCellBodyText}>
                      こちらに{item.scene}シーン目の素材が入ります
                    </Text>
                  </View>
                  <Text style={styles.grayBox}>テキスト</Text>
                  {item.textAreas.map((textArea,i) => (
                    <View key={i}>
                      <Text style={styles.tableCellBodyText}>
                        {textArea.name}
                      </Text>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 5,
                          marginBottom: 5,
                        }}
                      >
                        <View
                          style={{
                            border: "1px solid black",
                            backgroundColor: "white",
                            width: "100%",
                          }}
                        />
                        <Text style={styles.countText}>{textArea.count}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};
