import * as React from 'react';
import styled from '@emotion/styled';
import { PADDING } from '../../styles/padding';
import ModelViewer from './ModelViewer';

const StyledModelContainer = styled.div`
  margin: ${PADDING.BASE} auto;
  width: 100%;
  height: 100%;
`;

interface PokemonModelViewerProps {
  id: string;
}

const PokemonModelViewer: React.FC<PokemonModelViewerProps> = ({ id }) => {
  const modelContainer = React.useRef(null);

  React.useEffect(() => {
    const modelViewer = new ModelViewer();
    modelViewer.configureViewer(modelContainer);
    modelViewer.loadModel(`/assets/models/${id}.glb`);

    let animationFrameId: number;
    const animateModel = () => {
      animationFrameId = requestAnimationFrame(animateModel);
      modelViewer.animate();
    };
    requestAnimationFrame(animateModel);

    modelViewer.appendToContainer(modelContainer);

    const handleResize = () => {
      modelViewer.handleResize(modelContainer);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
      modelViewer.removeFromContainer(modelContainer);
    };
  }, []);

  return <StyledModelContainer ref={modelContainer} />;
};

export default PokemonModelViewer;
