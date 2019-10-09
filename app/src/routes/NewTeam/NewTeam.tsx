import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { NewTeamContainerProps } from './NewTeam.container';
import { NewTeam } from '../../interfaces/newTeam';
import TeamTypeRadioGroup from '../../components/TeamTypeRadioGroup/TeamTypeRadioGroup';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import { StyledLoginContainer } from '../Login/Login';

interface NewTeamProps extends NewTeamContainerProps, RouteComponentProps {}

const NewTeam: React.FC<NewTeamProps> = ({
  saveTeam,
  savedTeam,
  history,
  setDraft,
  isLoading,
}) => {
  const [teamState, setTeamState] = React.useState<NewTeam>({
    description: '',
    name: '',
    type: 0,
  });

  const handleDraftTeam = () => {
    if (savedTeam._id) {
      history.push(`/pokemon`);
      setDraft(savedTeam);
    }
  };

  const handleTeamChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamState({
      ...teamState,
      [event.target.name]: event.target.value,
    });
  };

  const setType = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeamState({ ...teamState, type: Number(event.target.value) });
  };

  const handleSaveTeam = () => {
    saveTeam(teamState);
  };

  const { description, type, name } = teamState;
  return (
    <Loading isLoading={isLoading}>
      <StyledLoginContainer data-testid="teams">
        <TeamTypeRadioGroup value={type} onChange={setType} />
        <Input
          onChange={handleTeamChange}
          value={name}
          name="name"
          label="Team name"
        />
        <Input
          onChange={handleTeamChange}
          value={description}
          name="description"
          label="Team description"
        />
        <Button onClick={handleSaveTeam}>Finish Draft</Button>
        {savedTeam._id && (
          <Button onClick={handleDraftTeam}>Add Pokemon To Team</Button>
        )}
      </StyledLoginContainer>
    </Loading>
  );
};

export default withRouter(NewTeam);
