"use client";
import React from "react";
import Html from "react-pdf-html";
import { Page, Text, View, Document, StyleSheet, Image, Link, Font } from "@react-pdf/renderer";
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
      <Page size="A4" style={styles.body}>
        {data &&
          data.map((section, index) => (
            <React.Fragment key={index}>
              <div style={styles.sectionDiv}>
                <Text style={styles.header}>Section-{index + 1}:</Text>
                <Text style={styles.title}>{section.title}</Text>
              </div>
              <Html style={styles.text}>
                {ReactDOMServer.renderToString(<EditorOutput content={section.description} />)}
              </Html>
              {section.SubSection &&
                section.SubSection.map((subsection, subIndex) => (
                  <React.Fragment key={subIndex}>
                    <div style={styles.sectionDiv}>
                      <Text style={styles.header}>
                        SubSection-{index + 1}.{subIndex + 1}:
                      </Text>
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
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent className=" h-screen ">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
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

// const html = `<html>
//   <body>
//     <style>
//       .my-heading4 {
//         background: darkgreen;
//         color: white;
//       }
//       pre {
//         background-color: #eee;
//         padding: 10px;
//       }
//     </style>
//     <h1>Heading 1</h1>
//     <h2 style="background-color: pink">Heading 2</h2>
//     <h3>Heading 3</h3>
//     <h4 class="my-heading4">Heading 4</h4>
//     <p>
//       Paragraph with <strong>bold</strong>, <i>italic</i>, <u>underline</u>,
//       <s>strikethrough</s>,
//       <strong><u><s><i>and all of the above</i></s></u></strong>
//     </p>
//     <p>
//       Paragraph with image <img src="" /> and
//       <a href="http://google.com">link</a>
//     </p>
//     <hr />
//     <ul>
//       <li>Unordered item</li>
//       <li>Unordered item</li>
//     </ul>
//     <ol>
//       <li>Ordered item</li>
//       <li>Ordered item</li>
//     </ol>
//     <br /><br /><br /><br /><br />
//     Text outside of any tags
//     <table>
//       <thead>
//         <tr>
//           <th>Column 1</th>
//           <th>Column 2</th>
//           <th>Column 3</th>
//         </tr>
//       </thead>
//       <tbody>
//         <tr>
//           <td>Foo</td>
//           <td>Bar</td>
//           <td>Foobar</td>
//         </tr>
//         <tr>
//           <td colspan="2">Foo</td>
//           <td>Bar</td>
//         </tr>
//         <tr>
//           <td>Some longer thing</td>
//           <td>Even more content than before!</td>
//           <td>Even more content than before!</td>
//         </tr>
//       </tbody>
//     </table>
//     <div style="width: 200px; height: 200px; background: pink"></div>
//     <pre>
// function myCode() {
//   const foo = 'bar';
// }
// </pre>
//   </body>
// </html>
// `;
export default ExportPDF;
