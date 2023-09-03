/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { UnorderedListOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { HeaderActionWrapper } from '../Header.styles';

export const ListViewButton: React.FC = () => {
  return (
    <HeaderActionWrapper>
      <BaseTooltip title="List View">
        <BaseButton type="text" icon={<UnorderedListOutlined />} />
      </BaseTooltip>
    </HeaderActionWrapper>
  );
};
