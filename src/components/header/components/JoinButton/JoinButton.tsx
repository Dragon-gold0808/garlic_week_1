import React from 'react';
import { FileAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { BASE_COLORS } from '@app/styles/themes/constants';
import { BaseButton as BaseButton } from '@app/components/common/BaseButton/BaseButton';

export const JoinButton: React.FC = (props) => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <Button
      type="default"
      href="https://docs.google.com/forms/d/e/1FAIpQLSfrE7RZ_Ir_Yny0aNbxrltXM_bheE7Yw1OFPJ0U1KeOtFhNZA/viewform?usp=sf_link"
      icon={<JoinIcon />}
      target="_blank"
      $isDark={theme === 'dark'}
      {...props}
    >
      Join Ontario Garlic Week
    </Button>
  );
};

const Button = styled(BaseButton)<{ $isDark: boolean }>`
  color: ${(props) => BASE_COLORS[props.$isDark ? 'white' : 'bgblack']};
  background: ${(props) => BASE_COLORS[props.$isDark ? 'bgblack' : 'white']};
  border-radius: 50px;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  margin-right: 30px;

  &:hover,
  &:active,
  &:focus {
    color: ${(props) => BASE_COLORS[props.$isDark ? 'bgblack' : 'white']};
    background: ${(props) => BASE_COLORS[props.$isDark ? 'white' : 'black']};
  }
`;

const JoinIcon = styled(FileAddOutlined)`
  font-size: 1.5rem;
  vertical-align: middle;
`;
