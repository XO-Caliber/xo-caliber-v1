"use client";
import Image from "next/image";
import { FC } from "react";
import dynamic from "next/dynamic";
import { table } from "console";
//@ts-ignore
const Output = dynamic(async () => (await import("editorjs-react-renderer")).default, {
  ssr: false
});

interface EditorOutputProps {
  content: any;
}

const renderers = {
  image: CustomImageRenderer
};

const style = {
  paragraph: {
    fontSize: "12px",
    margin: "0px", // Remove margin
    padding: "0px" // Remove padding
    // lineHeight: "20px"
  },
  header: {
    h1: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: "4px"
    },
    h2: {
      fontSize: "16px",
      fontWeight: "bold",
      marginBottom: "4px"
    },
    h3: {
      fontSize: "14px",
      fontWeight: "bold",
      marginBottom: "4px"
    }
  },
  list: {
    container: {
      margin: "0px",
      padding: "0px",
      listStyleType: "decimal"
    },
    listItem: {
      marginTop: "0px",
      marginBottom: "0px",
      marginLeft: "4px",
      fontSize: "12px",
      listStyleType: "decimal"
    }
  },
  table: {
    /* Table */
    table: {
      borderCollapse: "collapse",
      border: "0.5px solid grey"
    },

    /* Table Row */
    tr: {
      backgroundColor: "white"
    },

    /* Table Header */
    th: {
      padding: "8px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
      backgroundColor: "#f2f2f2"
    },

    /* Table Data */
    td: {
      padding: "8px",
      textAlign: "left",
      borderBottom: "1px solid #ddd"
    }
  }
};

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative min-h-[15rem] w-full">
      <Image alt="image" className="object-contain" fill src={src} />
    </div>
  );
}

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  //@ts-ignore
  return <Output style={style} className="text-sm" renderers={renderers} data={content} />;
};

export default EditorOutput;
