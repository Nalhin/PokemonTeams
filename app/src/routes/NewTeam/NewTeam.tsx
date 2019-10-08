import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TeamType } from '../../interfaces/team';
import Input from '../../components/Input/Input';
import { NewTeamContainerProps } from './NewTeam.container';
import { NewTeam } from '../../interfaces/newTeam';

interface NewTeamProps extends NewTeamContainerProps, RouteComponentProps {}

const NewTeam: React.FC<NewTeamProps> = ({
  saveTeam,
  savedTeam,
  history,
  setDraft,
}) => {
  const [teamState, setTeamState] = React.useState<NewTeam>({
    description: '',
    name: '',
    type: null,
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

  return (
    <div data-testid="teams">
      <input
        type="radio"
        name="Valor"
        value={TeamType.Valor}
        onChange={setType}
      />
      Valor
      <input
        type="radio"
        name="Instinct"
        value={TeamType.Instinct}
        onChange={setType}
      />
      Instinct
      <input
        type="radio"
        name="Mystic"
        value={TeamType.Mystic}
        onChange={setType}
      />
      Mystic
      <Input
        onChange={handleTeamChange}
        value={teamState.name}
        name="name"
        placeholder="Team name"
      />
      <Input
        onChange={handleTeamChange}
        value={teamState.description}
        name="description"
        placeholder="Team description"
      />
      <button onClick={handleSaveTeam}>Finish Draft</button>
      {savedTeam._id && (
        <button onClick={handleDraftTeam}>Add Pokemon To Team</button>
      )}
    </div>
  );
};

export default withRouter(NewTeam);
