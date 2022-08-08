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
import { PDFImage } from "./PDFImage";
import { MovieSchema } from "src/validations/movieInput";

Font.register({
  family: "Nasu-Regular",
  src: NasuRegular,
});
Font.register({
  family: "Nasu-Bold",
  src: NasuBold,
});
const BORDER_STYLE = "solid";
const BORDER_COLOR = "#999999";
const styles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    paddingTop: 30,
    paddingBottom: 65,
    paddingHorizontal: 20,
    // backgroundColor: "#E4E4E4",
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
    backgroundColor: "#40A33F",
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
    paddingTop: 2,
    paddingLeft: 4,
    paddingRight: 4,
    marginLeft: 2,
    backgroundColor: "#999999",
    fontSize: 8,
  },
  textBox: {
    fontFamily: "Nasu-Regular",
    border: "1px solid black",
    color: "#CCCCCC",
    paddingTop: 2,
    paddingLeft: 10,
    width: "100%",
    textAlign: "left",
  },
  countText: {
    fontSize: 8,
    fontWeight: 500,
    fontFamily: "Nasu-Bold",
    border: "1px solid black",
    paddingTop: 4,
    width: 20,
    textAlign: "center",
    backgroundColor: "#999999",
  },
});

type Props = {
  formValue: MovieSchema | MovieItem;
};

export const PDFMovieConfiguration: FC<Props> = ({ formValue }) => {
  const {
    title,
    category,
    platform,
    raito,
    scale,
    configuration,
    materials,
    resolution,
  } = formValue;
  const sceneNumber = configuration.length;
  function getMaterial() {
    if (materials === 0) {
      const detailItems = configuration.map((item) => {
        return item.detail;
      });
      const detailNumber = detailItems.length;
      return detailNumber;
    } else {
      return materials;
    }
  }
  const materialNumber = getMaterial();
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
                <Text style={styles.tableCellBodyText}>{materialNumber}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellBodyText}>{raito}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellBodyText}>{resolution}</Text>
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
          {platform.map((item) => {
            if (item) {
              return (
                <Text style={styles.grayBox} key={item}>
                  {item}
                </Text>
              );
            }
          })}
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
            {configuration.map((item, index) => (
              <View key={index} style={styles.tableRow} wrap={false}>
                <View style={styles.tableCellSmall}>
                  <Text style={styles.tableCellBodyText}>{item.scene}</Text>
                </View>
                <View style={styles.tableCellSmall}>
                  <Text style={styles.tableCellBodyText}>{item.time}秒間</Text>
                </View>
                <View style={styles.tableCell}>
                  {item.preview &&
                    (typeof item.preview === "string" ? (
                      <PDFImage src={item.preview} />
                    ) : (
                      <Image
                        style={{ maxWidth: "100%" }}
                        src={window.URL.createObjectURL(
                          new Blob([item.preview])
                        )}
                      />
                    ))}
                </View>
                <View style={styles.tableCell}>
                  {item.detail && (
                    <>
                      <Text style={styles.grayBox}>画像・動画</Text>
                      <View style={{ marginTop: 5, marginBottom: 5 }}>
                        <Text style={styles.tableCellBodyText}>
                          [推奨素材サイズ]{item.detail}
                        </Text>
                        <Text style={styles.tableCellBodyText}>
                          こちらに{item.scene}シーン目の素材が入ります
                        </Text>
                      </View>
                    </>
                  )}
                  {item.textAreas && (
                    <>
                      <Text style={styles.grayBox}>テキスト</Text>
                      {item.textAreas.map((textArea, i) => (
                        <View key={i}>
                          <View
                            style={{
                              flexDirection: "row",
                              marginTop: 5,
                              marginBottom: 5,
                            }}
                          >
                            <Text style={styles.textBox}>{textArea.text}</Text>
                            <Text style={styles.countText}>
                              {textArea.count}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};
