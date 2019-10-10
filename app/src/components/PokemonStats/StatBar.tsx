import * as React from 'react';
import styled from '@emotion/styled';
import { COLORS } from '../../styles/colors';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const MAX_STAT = 160;
const BAR_WIDTH = '36px';

const StyledStat = styled.div`
  height: 150px;
  position: relative;
`;

interface StyledStatDisplayProps {
  stat: number;
}

const StyledContainer = styled.div`
  width: ${BAR_WIDTH};
  &:hover {
    cursor: pointer;
  }
`;

const StyledStatDisplay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${(props: StyledStatDisplayProps) => (props.stat / MAX_STAT) * 100}%;
  background: ${COLORS.MAIN_SECONDARY};
  color: #fff;
`;

const StyledStatText = styled(Typography)`
  position: absolute;
  bottom: 0;
  color: #000;
  left: 0;
  right: 0;
  text-align: center;
`;

const StyledLegend = styled(Typography)`
  text-align: center;
`;

interface StatBarProps {
  name: string;
  shortName: string;
  data: number;
}

const StatBar: React.FC<StatBarProps> = ({ name, shortName, data }) => {
  return (
    <Tooltip title={name} placement="bottom">
      <StyledContainer>
        <StyledStat>
          <StyledStatDisplay stat={data} />
          <StyledStatText component="legend">{data}</StyledStatText>
        </StyledStat>
        <StyledLegend component="legend">{shortName}</StyledLegend>
      </StyledContainer>
    </Tooltip>
  );
};

export default StatBar;
