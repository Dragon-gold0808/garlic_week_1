/* eslint-disable prettier/prettier */

import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { activityStatuses } from '@app/constants/config/activityStatuses';
import { Dates } from '@app/constants/Dates';
import { GarlicEvents } from '@app/api/events.api';
import * as S from './ListViewItem.styles';
import { categoriesList } from '@app/constants/categoriesList';

interface ListViewItemProps {
  key: number;
  activity: GarlicEvents;
  onClick: (e: any) => void;
}

export const ListViewItem: React.FC<ListViewItemProps> = ({ activity, onClick }) => {
  const { t } = useTranslation();

  const currentActivity = useMemo(
    () => categoriesList.find((dbStatus) => dbStatus.name === activity.category),
    [activity.category],
  );
  const garlickyFeatureText = activity.garlickyFeature ? (
    <>
      <span style={{ fontWeight: 'bold' }}>Garlicky Feature: </span>
      {activity.garlickyFeature}
    </>
  ) : null;

  return (
    <S.ActivityCard onClick={onClick} style={{ cursor: 'pointer' }}>
      <S.Wrapper>
        {/* <S.ImgWrapper>
          <img src={image} alt={title} width={84} height={84} />
        </S.ImgWrapper> */}

        <S.InfoWrapper>
          <S.InfoHeaderWrapper>
            <S.TitleWrapper>
              <S.Title level={5}>{activity.businessName}</S.Title>

              {/* <S.IconWrapper>{currentActivity?.icon}</S.IconWrapper> */}
            </S.TitleWrapper>

            <S.Text>{currentActivity?.title}</S.Text>
            <S.Text>{garlickyFeatureText}</S.Text>
          </S.InfoHeaderWrapper>

          <S.InfoBottomWrapper>
            <S.DateText>
              {/* {Dates.getDate(date).format('lll')} */}
              {activity.date}
            </S.DateText>
          </S.InfoBottomWrapper>
        </S.InfoWrapper>
      </S.Wrapper>
    </S.ActivityCard>
  );
};
