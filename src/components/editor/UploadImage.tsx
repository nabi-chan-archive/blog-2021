import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { useS3Upload } from "../../lib/hooks/useS3Upload";
import { useUpload } from "../../lib/hooks/useUpload";

interface Props {
  onCompleteUpload: (path: string) => void;
}

const Container = styled.div``;

export function UploadImage({ onCompleteUpload }: Props) {
  const [s3Upload, image] = useS3Upload();
  const [upload, file] = useUpload();

  useEffect(() => {
    if (!file) return;
    s3Upload(file, {
      type: "post",
    });
  }, [file, s3Upload]);

  useEffect(() => {
    if (!image) return;
    onCompleteUpload(image);
  }, [image]);

  return (
    <Container>
      <Button onClick={upload}>이미지 업로드하기</Button>
    </Container>
  );
}
