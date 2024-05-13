"use client";
import React from "react";
import Html from "react-pdf-html";
import { Page, Text, View, Document, StyleSheet, Image, Link } from "@react-pdf/renderer";
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
  console.log(data.map((datas) => datas.SubSection));
  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.body}>
        {data.map((section, index) => (
          <React.Fragment key={index}>
            <Text style={styles.header}>Section-{index + 1}:</Text>
            <Text style={styles.title}>{section.title}</Text>
            <Html style={styles.text}>
              {ReactDOMServer.renderToString(<EditorOutput content={section.description} />)}
            </Html>
            {section.SubSection &&
              section.SubSection.map((subsection, subIndex) => (
                <React.Fragment key={subIndex}>
                  <Text style={styles.header}>SubSection-{subIndex + 1}:</Text>
                  <Text style={styles.title}>{subsection.title}</Text>
                  <Html style={styles.text}>
                    {ReactDOMServer.renderToString(
                      <EditorOutput content={subsection.description} />
                    )}
                  </Html>
                </React.Fragment>
              ))}
          </React.Fragment>
        ))}
      </Page>
    </Document>
  );

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35
    },
    title: {
      fontSize: 20,
      textAlign: "left",
      fontWeight: "bold"
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: "Oswald"
    },
    text: {
      margin: 2,
      fontSize: 14,
      textAlign: "left",
      fontFamily: "Times-Roman"
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
      fontStyle: "nowrap"
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey"
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
