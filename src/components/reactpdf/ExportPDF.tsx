"use client";
import React, { useState } from "react";
import Html from "react-pdf-html";
import { Page, Text, Document, StyleSheet, Font } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/Dialog";
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
              <div style={styles.sectionTitle}>
                <Text style={styles.title}>{section.title}</Text>
              </div>
              <Html style={styles.text}>
                {ReactDOMServer.renderToString(<EditorOutput content={section.description} />)}
              </Html>
              {section.SubSection &&
                section.SubSection.map((subsection, subIndex) => (
                  <React.Fragment key={subIndex}>
                    <div style={styles.sectionTitle}>
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
                              <Text style={styles.header}>Exhibit-{exno}</Text>
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
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
          fixed
        />
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
      paddingTop: 50,
      paddingBottom: 50,
      paddingHorizontal: 50
    },
    title: {
      // paddingHorizontal: 50,
      fontSize: "16px",
      textAlign: "left",
      fontWeight: "bold",
      fontFamily: "Times-Roman",
      lineHeight: "1.5px",
      marginBottom: "10px"
    },
    sectionTitle: {
      // paddingHorizontal: 50,
      fontSize: "16px",
      textAlign: "left",
      fontWeight: "extrabold",
      fontFamily: "Times-Roman",
      lineHeight: "1.5px",
      marginBottom: "10px"
    },
    exhibitTitle: {
      fontSize: 14,
      textAlign: "left",
      fontWeight: "bold",
      fontStyle: "italic",
      textWrap: "wrap",
      fontFamily: "Times-Roman",
      lineHeight: "1.5px",
      marginBottom: "10px"
    },
    author: {
      fontSize: 14,
      textAlign: "center",
      marginBottom: 40
    },
    subtitle: {
      fontSize: 20,
      margin: 12,
      fontFamily: "Times-Roman",
      lineHeight: 1.5
    },
    text: {
      // margin: 5,
      display: "flex",
      flexDirection: "column",
      fontSize: 12,
      textAlign: "justify",
      textIndent : "50px",
      fontFamily: "Times-Roman",
      lineHeight: 1.5,
      marginBottom: 2,
      gap: 4
    },
    image: {
      marginVertical: 20,
      marginHorizontal: 150
    },
    header: {
      fontSize: 14,
      marginBottom: 30,
      fontWeight: "bold",
      textAlign: "center",
      color: "black",
      fontFamily: "Times-Roman"
    },
    pageNumber: {
      position: "absolute",
      fontSize: 8,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey"
    },
    sectionDiv: {
      display: "flex",
      flexDirection: "row",
      paddingTop: 15,
      paddingBottom: 15,
      paddingHorizontal: 50,
      alignItems: "center",
      justifyContent: "flex-end"
    },
    subSectionDiv: {
      display: "flex",
      flexDirection: "row"
    },
    exhibitDiv: {
      display: "flex",
      textAlign: "left",
      flexDirection: "column",
      // marginHorizontal: 50,
      alignItems: "flex-start",
      justifyContent: "space-between",
      lineHeight: 1.5
    },
    exhibitSub: {
      display: "flex",
      flexDirection: "column",
      // marginHorizontal: 50,
      alignItems: "flex-start",
      fontStyle: "italic",
      lineHeight: 1.5
    }
  });

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"dark"} className="max-h-[30px]">
          Open as PDF
        </Button>
      </DialogTrigger>
      <DialogContent className=" h-screen ">
        <DialogHeader>
          <DialogTitle>View and Download the pdf here!</DialogTitle>
          <DialogDescription>
            Note: Loading the PDF may take some time. If it doesn&apos;t load  properly on the first attempt,
            please try opening it again.
          </DialogDescription>

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
