import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  onChange: (e: string) => void;
  value: string;
}

export function Editor({ value, onChange }: Props) {
  return (
    <Form.Control
      as={"textarea"}
      value={value}
      rows={15}
      onChange={(e) => onChange(e.target.value)}
      name="body"
      placeholder={"내용을 입력하세요."}
      required
    />
  );
}
