import * as React from 'react';

const NewTeam: React.FC = props => {
  return (
    <div data-testid="teams">
      <input type="radio" name="Valor" />
      Valor
      <input type="radio" name="Instinct" />
      Instinct
      <input type="radio" name="Mystic" />
      Mystic
    </div>
  );
};

export default NewTeam;
