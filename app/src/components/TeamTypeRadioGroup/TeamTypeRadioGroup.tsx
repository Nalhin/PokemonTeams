import * as React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TeamType } from '../../interfaces/team';
import styled from '@emotion/styled';
import { PADDING } from '../../styles/padding';
import { TEAM_COLORS } from '../../styles/colors';

const StyledFormControl = styled(FormControl)`
  margin: ${PADDING.BASE} 0;
`;

type StyledFormControlLabelProps = {
  value: TeamType;
};

const StyledFormControlLabel = styled(FormControlLabel)`
  color: ${(props: StyledFormControlLabelProps) => TEAM_COLORS[props.value]};
`;

interface TeamTypeRadioGroupProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TeamTypeRadioGroup: React.FC<TeamTypeRadioGroupProps> = ({
  value,
  onChange,
}) => {
  return (
    <StyledFormControl>
      <FormLabel component="legend">Team Type</FormLabel>
      <RadioGroup name="type" value={value} onChange={onChange}>
        <StyledFormControlLabel
          value={TeamType.Valor}
          control={<Radio data-testid={'xd'} />}
          label="Valor"
        />
        <StyledFormControlLabel
          value={TeamType.Instinct}
          control={<Radio />}
          label="Instinct"
        />
        <StyledFormControlLabel
          value={TeamType.Mystic}
          control={<Radio />}
          label="Mystic"
        />
      </RadioGroup>
    </StyledFormControl>
  );
};

export default TeamTypeRadioGroup;
