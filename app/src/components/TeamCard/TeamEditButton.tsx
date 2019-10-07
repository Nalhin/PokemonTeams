import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface TeamsEditButtonProps extends RouteComponentProps {
  id: string;
}

const TeamEditButton: React.FC<TeamsEditButtonProps> = ({ id, history }) => {
  const onClick = () => {
    history.push(`/teams/edit/${id}`);
  };

  return (
    <div>
      <button onClick={onClick}>Edit</button>
    </div>
  );
};

export default withRouter(TeamEditButton);
