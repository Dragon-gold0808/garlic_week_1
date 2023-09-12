import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import React, { PropsWithChildren } from 'react';
import * as S from './NFTCardHeader.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { Button } from 'antd';

interface NFTCardHeaderProps {
  title: string;
}

export const NFTCardHeader: React.FC<PropsWithChildren<NFTCardHeaderProps>> = ({ title, children }) => {
  return (
    <S.WrapperRow justify="space-between">
      <BaseRow>
        <S.Title level={5}>{title}</S.Title>
      </BaseRow>

      {children && <BaseCol>{children}</BaseCol>}

    </S.WrapperRow>
  );
};
