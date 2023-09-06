/* eslint-disable prettier/prettier */
import * as React from 'react';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faUtensils, faWheatAlt, faCartShopping, faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  // cursor: 'grab',
  fill: '#d00',
  stroke: 'none',
};

function Pin({ title = <></>, category = '' }) {
  let pic = 'pin2';
  let picon = faStore;
  switch (category) {
    case 'Farm':
      picon = faStore;
      pic = 'pin2';
      break;
    case 'Restaurant':
      picon = faUtensils;
      pic = 'pin3';
      break;
    case "Farmers' Market":
      picon = faWheatAlt;
      pic = 'pin4';
      break;
    case 'Independent Grocer':
      picon = faCartShopping;
      pic = 'pin5';
      break;
    case 'Special Activity':
      picon = faPersonChalkboard;
      pic = 'pin6';
      break;
    default:
      break;
  }
  return (
    <div style={pinStyle}>
      {/* <svg height={size} viewBox="0 0 24 24" style={pinStyle}> */}
      <BaseTooltip title={title} style={pinStyle}>
        <img src={'/' + pic + '.png'} width="45px" height="auto" />
      </BaseTooltip>
    </div>
  );
}

export default React.memo(Pin);
