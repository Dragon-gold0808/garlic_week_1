/* eslint-disable prettier/prettier */
import React from 'react';

// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import { useTranslation } from 'react-i18next';
import Mapbox from './MapboxCard/Mapbox';

import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import * as S from '@app/pages/maps/maps.styles';

const GarlicWeekPage: React.FC = () => {
  // const { t } = useTranslation();

  // const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: '' });

  // if (loadError) {
  //   return <>{loadError.message}</>;
  // }

  return (
    <>
      <PageTitle>Map View</PageTitle>
      <S.MapsCard padding="0">
        <Mapbox />
      </S.MapsCard>
    </>
  );
};

export default GarlicWeekPage;
