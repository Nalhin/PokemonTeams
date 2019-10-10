import * as React from 'react';
import styled from '@emotion/styled';
import { PADDING } from '../../styles/padding';
import { TAGS_COLOR } from '../../styles/tags';

interface TagProps {
  tag: string;
  className?: string;
}

type Tag = {
  tag: string;
};

const StyledTag = styled.div`
  border-radius: 5px;
  padding: ${PADDING.SMALL};
  color: ${(props: Tag) => TAGS_COLOR[props.tag].color};
  background: ${(props: Tag) => TAGS_COLOR[props.tag].background};
`;

const Tag: React.FC<TagProps> = ({ tag, className }) => {
  return (
    <StyledTag className={className} tag={tag}>
      {tag}
    </StyledTag>
  );
};

export default Tag;
