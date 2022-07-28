import { FC } from "react";
import styled from '@emotion/styled'

type Props = {
  src: string;
  alt: string;
};

const StyleImage = styled.img`
  max-width: 100%;
`

export const Image: FC<Props> = ({src,alt}) => {
  return <StyleImage src={src} alt={alt} />;
};
