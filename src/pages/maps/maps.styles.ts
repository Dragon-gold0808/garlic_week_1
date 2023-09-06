import styled from 'styled-components';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';

export const MapsCard = styled(BaseCard)`
  height: 70vh;
  // width: 80vh;
  overflow-y: auto;

  .control-panel {
    position: absolute;
    top: 0;
    right: 0;
    max-width: 320px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    padding: 12px 24px;
    margin: 20px;
    font-size: 13px;
    line-height: 2;
    color: #6b6b76;
    text-transform: uppercase;
    outline: none;
  }

  .leaflet-container {
    z-index: 0;
  }
`;
