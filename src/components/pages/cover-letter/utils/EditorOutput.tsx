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
    fontSize: "0.875rem",
    lineHeight: "1.25rem"
  },
  header: {
    h1: {
      fontSize: "2em",
      fontWeight: "bold",
      marginttom: "0.5em"
    },

    h2: {
      fontSize: "1.5em",
      fontWeight: "bold",
      marginBottom: "0.5em"
    },

    h3: {
      fontSize: "1.17em",
      fontWeight: "bold",
      marginBottom: "0.5em"
    }
  },
  list: {
    container: {
      margin: 0,
      padding: 0,
      listStyleType: "decimal"
    },
    listItem: {
      marginTop: 0,
      marginBottom: "1em",
      marginLeft: "1.5em",
      fontSize: "1rem",
      listStyleType: "decimal"
    }
  }
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  //@ts-ignore
  return <Output style={style} className="text-sm" renderers={renderers} data={content} />;
};

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative min-h-[15rem] w-full">
      <Image alt="image" className="object-contain" fill src={src} />
    </div>
  );
}

export default EditorOutput;
