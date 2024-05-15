"use client";
import Image from "next/image";
import { FC } from "react";
import dynamic from "next/dynamic";
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
    fontSize: "14px"
    // lineHeight: "20px"
  },
  header: {
    h1: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "4px"
    },
    h2: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "4px"
    },
    h3: {
      fontSize: "19.52px",
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
      marginBottom: "16px",
      marginLeft: "24px",
      fontSize: "16px",
      listStyleType: "decimal"
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
