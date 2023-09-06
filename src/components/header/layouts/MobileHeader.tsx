import React from 'react';
import { NotificationsDropdown } from '../components/notificationsDropdown/NotificationsDropdown';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import { HeaderSearch } from '../components/HeaderSearch/HeaderSearch';
import { SettingsDropdown } from '../components/settingsDropdown/SettingsDropdown';
import * as S from '../Header.styles';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { MapViewButton } from '../components/MapViewButton';
import { ListViewButton } from '../components/ListViewButton';
import { CalendarViewButton } from '../components/CalendarViewButton';
import { JoinMobileButton } from '../components/JoinMobileButton';

interface MobileHeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ toggleSider, isSiderOpened }) => {
  return (
    <BaseRow justify="space-between" align="middle">
      <BaseCol>
        <JoinMobileButton />
      </BaseCol>

      <BaseCol>
        <BaseRow align="middle">
          <BaseCol>
            <ListViewButton />
          </BaseCol>
          <BaseCol>
            <MapViewButton />
          </BaseCol>
          <BaseCol>
            <CalendarViewButton />
          </BaseCol>
        </BaseRow>
      </BaseCol>
      <S.BurgerCol>
        <BaseCol>
          <SettingsDropdown />
        </BaseCol>
      </S.BurgerCol>
    </BaseRow>
  );
};
