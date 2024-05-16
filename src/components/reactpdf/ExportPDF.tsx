"use client";
import React from "react";
import Html from "react-pdf-html";
import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/Dialog";
import { Button } from "../ui/Button";
import { SectionType } from "@/types/CoverLetter";
import EditorOutput from "../pages/cover-letter/utils/EditorOutput";
import ReactDOMServer from "react-dom/server";

const PDFViewer = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFViewer), {
  ssr: false,
  loading: () => <p>Loading...</p>
});

const ExportPDF = ({ data }: { data: SectionType[] }) => {
  // console.log(data.map((datas) => datas.SubSection));
  let exno = 0;
  const MyDocument = () => (
    <Document>
      <Page size="LETTER" style={styles.body}>
        {data &&
          data.map((section, index) => (
            <React.Fragment key={index}>
              <div style={styles.sectionDiv}>
                <Text style={styles.title}>{section.title}</Text>
              </div>
              <Html style={styles.text}>
                {ReactDOMServer.renderToString(<EditorOutput content={section.description} />)}
              </Html>
              {section.SubSection &&
                section.SubSection.map((subsection, subIndex) => (
                  <React.Fragment key={subIndex}>
                    <div style={styles.sectionDiv}>
                      <Text style={styles.title}>{subsection.title}</Text>
                    </div>
                    <Html style={styles.text}>
                      {ReactDOMServer.renderToString(
                        <EditorOutput content={subsection.description} />
                      )}
                    </Html>
                    {subsection.Exhibits &&
                      subsection.Exhibits.map((exhibit, exhibitIndex) => {
                        exno++;
                        return (
                          <React.Fragment key={index}>
                            <div style={styles.exhibitDiv}>
                              <Text style={styles.header}>Exhibit-{exno}:</Text>
                              <div style={styles.exhibitSub}>
                                <Text style={styles.exhibitTitle}>{exhibit.title}</Text>
                                <Html style={styles.text}>
                                  {ReactDOMServer.renderToString(
                                    <EditorOutput content={exhibit.description} />
                                  )}
                                </Html>
                              </div>
                            </div>
                          </React.Fragment>
                        );
                      })}
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
      </Page>
    </Document>
  );

  Font.register({
    family: "Times-Roman",
    fonts: [
      {
        src: "/public/fonts/Times New Roman/times new roman.ttf"
      },
      {
        src: `/public/fonts/Times New Roman/times new roman bold.ttf`,
        fontWeight: "bold"
      },
      {
        src: `/public/fonts/Times New Roman/times new roman italic.ttf`,
        fontWeight: "normal",
        fontStyle: "italic"
      },
      {
        src: `/public/fonts/Times New Roman/times new roman bold italic.ttf`,
        fontWeight: "bold",
        fontStyle: "italic"
      }
    ]
  });

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35
    },
    title: {
      paddingHorizontal: 35,
      fontSize: 14,
      textAlign: "left",
      fontWeight: "extrabold",
      fontFamily: "Times-Roman"
    },
    exhibitTitle: {
      fontSize: 12,
      textAlign: "left",
      fontWeight: "bold",
      textWrap: "wrap",
      fontFamily: "Times-Roman"
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: "Times-Roman"
    },
    text: {
      margin: 2,
      fontSize: 11,
      textAlign: "justify",
      fontFamily: "Times-Roman"
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      fontWeight: "extrabold",
      textAlign: "center",
      color: "grey",
      fontFamily: "Times-Roman"
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey"
    },
    sectionDiv: {
      display: "flex",
      flexDirection: "row",
      paddingTop: 12,
      textAlign: "left",
      marginRight: "300px",
      paddingBottom: 12,
      paddingHorizontal: 35,
      alignItems: "center",
      justifyContent: "flex-end"
    },
    subSectionDiv: {
      display: "flex",
      flexDirection: "row"
    },
    exhibitDiv: {
      display: "flex",
      flexDirection: "row",
      marginHorizontal: 34,
      alignItems: "flex-start",
      justifyContent: "space-around"
    },
    exhibitSub: {
      display: "flex",
      flexDirection: "column",
      marginHorizontal: 34,
      alignItems: "flex-start",
      justifyContent: "space-around"
    }
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"dark"} className="h-[25px]">
          Open as PDF
        </Button>
      </DialogTrigger>
      <DialogContent className=" h-screen ">
        <DialogHeader>
          <DialogTitle>View and Download the pdf here!</DialogTitle>
          <main className="flex h-full w-[1000px] items-center justify-center">
            <PDFViewer className="h-full w-full">
              <MyDocument />
            </PDFViewer>
          </main>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default ExportPDF;
