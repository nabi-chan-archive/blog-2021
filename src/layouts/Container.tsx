import styled from "styled-components";
import { CONTENT_MAX_WIDTH, CONTENT_PADDING } from "../constants/layout";

const Container = styled.div`
  max-width: ${CONTENT_MAX_WIDTH};
  padding: ${CONTENT_PADDING};
  margin: 0 auto;
`;

export default Container;
