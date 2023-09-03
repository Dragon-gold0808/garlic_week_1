import React from 'react';
import * as S from './References.styles';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined } from '@ant-design/icons';

export const References: React.FC = () => {
  return (
    <S.ReferencesWrapper>
      <S.Text>
        Imbedded with{' '}
        <a href="https://www.ontariogarlicweek.ca/" target="_blank" rel="noreferrer">
          Ontario Garlic Week{' '}
        </a>
        2023 &copy;. Supported by{' '}
        <a href="https://www.torontogarlicfestival.ca/" target="_blank" rel="noreferrer">
          Toronto Garlic Festival.
        </a>
      </S.Text>
      <S.Icons>
        <a href="https://twitter.com/ONGarlicWeek" target="_blank" rel="noreferrer">
          <TwitterOutlined />
        </a>
        <a href="https://www.facebook.com/ontariogarlicweek" target="_blank" rel="noreferrer">
          <FacebookOutlined />
        </a>
        <a href="https://www.instagram.com/ontariogarlicweek/" target="_blank" rel="noreferrer">
          <InstagramOutlined />
        </a>
      </S.Icons>
    </S.ReferencesWrapper>
  );
};
