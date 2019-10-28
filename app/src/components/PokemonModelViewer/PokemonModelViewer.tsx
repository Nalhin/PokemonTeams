import * as React from 'react';
import styled from '@emotion/styled';
import { PADDING } from '../../styles/padding';
import ModelViewer from './ModelViewer';
import Loading from '../Loading/Loading';

const StyledModelContainer = styled.div`
  margin: ${PADDING.BASE} auto;
  width: 100%;
  height: 100%;
`;

interface PokemonModelViewerProps {
  id: string;
  isLoadingDisabled: boolean;
}

const PokemonModelViewer: React.FC<PokemonModelViewerProps> = ({
  id,
  isLoadingDisabled,
}) => {
  const modelContainer = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleSetIsLoading = () => {
    setIsLoading(false);
  };

  React.useEffect(() => {
    const modelViewer = new ModelViewer();
    modelViewer.configureViewer(modelContainer);
    modelViewer.loadModel(`/assets/models/${id}.glb`, handleSetIsLoading);

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

  return (
    <Loading isLoading={!isLoadingDisabled && isLoading} isRelative>
      <StyledModelContainer ref={modelContainer} />
    </Loading>
  );
};

export default PokemonModelViewer;
