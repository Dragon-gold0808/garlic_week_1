/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from 'react';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { CalendarOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { HeaderActionWrapper } from '../Header.styles';

export const CalendarViewButton: React.FC = () => {
  return (
    <HeaderActionWrapper>
      <BaseTooltip title="Calendar View">
        <BaseButton type="text" icon={<CalendarOutlined />} />
      </BaseTooltip>
    </HeaderActionWrapper>
  );
};
