import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as S from './ProfileOverlay.styles';

export const ProfileOverlay: React.FC = ({ ...props }) => {
  const { t } = useTranslation();

  return (
    <div {...props}>
      {/* <S.ItemsDivider /> */}
      <S.Text>
        <Link to="/logout">{t('header.logout')}</Link>
      </S.Text>
    </div>
  );
};
