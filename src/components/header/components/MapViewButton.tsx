/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { GlobalOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { HeaderActionWrapper } from '../Header.styles';

export const MapViewButton: React.FC = () => {
  const location = useLocation();
  return (
    <Link to="/mapview">
      <HeaderActionWrapper>
        <BaseTooltip title="Map View">
          <BaseButton type={location.pathname === '/mapview' ? 'ghost' : 'text'} icon={<GlobalOutlined />} />
        </BaseTooltip>
      </HeaderActionWrapper>
    </Link>
  );
};
