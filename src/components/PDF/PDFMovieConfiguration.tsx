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
import { reducer } from "src/utility";

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
    borderBottomWidth: 1,
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
    border: "1px solid #999999",
    color: "#CCCCCC",
    paddingTop: 4,
    fontSize: 8,
    paddingLeft: 5,
    paddingRight: 5,
    width: "100%",
    textAlign: "left",
  },
  countText: {
    fontSize: 8,
    fontWeight: 500,
    fontFamily: "Nasu-Bold",
    border: "1px solid #999999",
    paddingTop: 4,
    width: 18,
    textAlign: "center",
    backgroundColor: "#999999",
  },
  image: {
    width: "100%",
    maxWidth: "100%",
    height: "auto"
  },
});

Font.registerHyphenationCallback((word) =>
  Array.from(word).flatMap((char) => [char, ""])
);

type Props = {
  value: MovieSchema | MovieItem | Movie;
};

export const PDFMovieConfiguration: FC<Props> = ({ value }) => {
  const {
    title,
    category,
    platform,
    raito,
    scale,
    configuration,
    materials,
    resolution,
  } = value;

  const sceneNumber = configuration.length;
  function getMaterial() {
    const detailItems = configuration.map((item) => {
      return item.imgVolume;
    });
    const detailNumber = detailItems.reduce(reducer);
    return detailNumber;
  }
  const materialNumber = getMaterial();
  return (
    <Document title={title}>
      <Page size="A4" style={styles.page}>
        <View style={styles.table}>
          <View style={styles.tableCellHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>?????????????????????</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>????????????</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>????????????</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>?????????</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>??????</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>?????????</Text>
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
          <Text>??????????????????</Text>
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
                <Text style={styles.tableCellHeaderText}>?????????No</Text>
              </View>
              <View style={styles.tableCellSmall}>
                <Text style={styles.tableCellHeaderText}>Time</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>?????????????????????</Text>
              </View>
              <View style={styles.tableCell}>
                <Text style={styles.tableCellHeaderText}>???????????????</Text>
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
                  <Text style={styles.tableCellBodyText}>{item.time}??????</Text>
                </View>
                <View style={styles.tableCell}>
                  {item.preview &&
                    (typeof item.preview === "string" ? (
                      <PDFImage src={item.preview} />
                    ) : (
                      <Image
                        style={styles.image}
                        src={window.URL.createObjectURL(
                          new Blob([item.preview])
                        )}
                      />
                    ))}
                </View>
                <View style={styles.tableCell}>
                  {item.detail &&
                    (item.detail === "????????????" ? (
                      <View>
                        <Text style={styles.grayBox}>???????????????</Text>
                        <View style={{ marginTop: 5, marginBottom: 5 }}>
                          <Text style={styles.tableCellBodyText}>
                            ???????????????????????? (??????png??????)???????????????
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View>
                        <Text style={styles.grayBox}>???????????????</Text>
                        <View style={{ marginTop: 5, marginBottom: 5 }}>
                          <Text style={styles.tableCellBodyText}>
                            [?????????????????????]{item.detail}
                          </Text>
                          {item.imgVolume > 1 ? (
                            Array(item.imgVolume)
                              .fill("")
                              .map((v, i) => {
                                return (
                                  <Text
                                    key={i}
                                    style={styles.tableCellBodyText}
                                  >
                                    ????????????{item.scene}????????????{i + 1}
                                    ??????????????????????????????
                                  </Text>
                                );
                              })
                          ) : (
                            <Text style={styles.tableCellBodyText}>
                              ????????????{item.scene}????????????????????????????????????
                            </Text>
                          )}
                        </View>
                      </View>
                    ))}
                  {item.textAreas[0].text !== "" && (
                    <View>
                      <Text style={styles.grayBox}>????????????</Text>
                      {item.textAreas.map((textArea, i) => (
                        <View key={i}>
                          <View
                            style={{
                              flexDirection: "row",
                              marginTop: 5,
                              marginBottom: 5,
                            }}
                          >
                            <Text wrap={false} style={styles.textBox}>
                              {textArea.text}
                            </Text>
                            <Text style={styles.countText}>
                              {textArea.count}
                            </Text>
                          </View>
                        </View>
                      ))}
                    </View>
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
