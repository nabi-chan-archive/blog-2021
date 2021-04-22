import { useState, useCallback } from "react";
import axios from "axios";

export const useS3Upload = () => {
  const [error, setError] = useState<Error | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const s3Upload = useCallback(
    async (
      file: File,
      info: {
        type: string;
        refId?: string;
      },
    ) => {
      if (file.size > 1024 * 1024 * 30) {
        const error = new Error("File is big");
        error.name = "fileIsBig";
        throw error;
      }

      if (!file.type.includes("image/")) {
        const error = new Error("File is not image");
        error.name = "notImage";
        throw error;
      }

      try {
        const response = await axios.post("/api/files/create-url", {
          ...info,
          filename: file.name,
        });

        const { imagePath, signedUrl } = response.data;

        await axios.put(signedUrl, file, {
          headers: {
            "Content-Type": file.type,
          },
        });

        setImage(imagePath);
        return imagePath;
      } catch (e) {
        setError(e);
      }
    },
    [],
  );

  return [s3Upload, image, error] as [
    typeof s3Upload,
    typeof image,
    typeof error,
  ];
};
