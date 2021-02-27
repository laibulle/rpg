/*import React, { useContext, useRef, useState } from "react";
import { View, ViewProps } from "react-native";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import { Button } from "../";
import { join } from "path";
import { ThemeContext } from "../theme";
import { useMutation } from "@apollo/client";

import {
  UploadFile,
  UploadFile_uploadFile,
} from "graphl/__generated__/UploadFile";
import { UPLOAD_FILE } from "graphl/mutations";

type Props = {
  title: string;
  prefix: string;
  url: string;
  onComplete: (file?: string) => void;
} & ViewProps;

const Card: React.FC<Props> = ({
  title,
  style,
  prefix,
  url,
  onComplete,
  children,
}) => {
  const [theme] = useContext(ThemeContext);

  const [file, setFile] = useState<File | undefined>();

  const onCompleted = async (data: UploadFile) => {
    const formData = new FormData();
    formData.append("file", file!, file!.name);

    await axios.request({
      method: "PUT",
      url: data.uploadFile.url,
      data: file,
      headers: {
        //'Content-Type': 'multipart/form-data' ,
        //'Content-Type': 'application/octet-stream',
      },
      onUploadProgress: (p) => {
        const pr = p.loaded / p.total;
        setProgress(pr);
        if (pr == 1) onComplete(filePath(file!));
      },
    });

    onComplete();
  };

  const filePath = (file: File) => join("/", prefix, file!.name);

  const [uploadFile, { loading }] = useMutation<UploadFile>(UPLOAD_FILE, {
    onCompleted,
  });

  const [progress, setProgress] = useState(0);

  const upload = useRef<null | HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setFile(file);
    uploadFile({ variables: { input: { filePath: filePath(file!) } } });
  };

  return (
    <View>
      <Button
        style={[theme.styles.mb3, { width: 200 }] as any}
        title={title}
        onPress={() => upload.current!.click()}
      />
      <input
        ref={upload}
        style={{ display: "none" }}
        type="file"
        name="file"
        onChange={(e) => {
          if (e.target.files) handleFile(e.target.files[0]);
        }}
      />

      {progress > 0 && progress < 1 ? (
        <View style={[theme.styles.mb3]}>
          <ProgressBar value={progress} />
        </View>
      ) : null}
    </View>
  );
};

export default Card;*/
