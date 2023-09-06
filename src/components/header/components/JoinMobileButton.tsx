/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { FileAddOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { HeaderActionWrapper } from '../Header.styles';

export const JoinMobileButton: React.FC = () => {
  const location = useLocation();
  return (
    <Link to="https://docs.google.com/forms/d/e/1FAIpQLSfrE7RZ_Ir_Yny0aNbxrltXM_bheE7Yw1OFPJ0U1KeOtFhNZA/viewform?usp=sf_link">
      <HeaderActionWrapper>
        <BaseTooltip title="Join Activity">
          <BaseButton
            // type={location.pathname === '/' ? 'ghost' : 'text'}
            type="text"
            icon={<FileAddOutlined />}
          />
        </BaseTooltip>
      </HeaderActionWrapper>
    </Link>
  );
};
