/* eslint-disable prettier/prettier */
import * as React from 'react';
import { BaseTooltip } from '@app/components/common/BaseTooltip/BaseTooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none',
};

function Pin({ title = <></>, onMouseEnter = () => {}, onMouseLeave = () => {} }) {
  return (
    <div
    // onMouseOver={onMouseEnter}
    // onMouseOut={onMouseLeave}
    >
      {/* <svg height={size} viewBox="0 0 24 24" style={pinStyle}> */}
      <BaseTooltip title={title} style={pinStyle}>
        {/* <BasePopover placement="bottom" title={title} content="d" trigger="click"> */}
        <img src="/pin2.png" width="35px" height="auto" />
        <FontAwesomeIcon
          icon={faStore}
          size="xl"
          style={{ color: '#ffffff', position: 'absolute', top: '53%', left: '50%', transform: 'translate(-50%)' }}
        />
        {/* </BasePopover> */}
      </BaseTooltip>
      {/* // </svg> */}
    </div>
  );
}

export default React.memo(Pin);
