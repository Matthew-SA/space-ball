import React from 'react';
import NavBarContainer from './navbar/navbar_container';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="mainpage-container">
      <div className="stars"></div>
      <div className="twinkling"></div>
      <div className="clouds"></div>
      <div className="moon"></div>
      <NavBarContainer />
      <div className="content">
        <img className="logo" src="images/space_ball.png" width="600" alt="logo" />
        <Link to="/play"><div className="button play-button">PLAY</div></Link>
        {/* <svg viewBox="0 0 880.01 536.23"><defs><radialGradient id="a" cx="380.57" cy="-3141.04" r="433.35" gradientTransform="matrix(.78 -.04 .53 -.55 1797.47 -1428.78)" gradientUnits="userSpaceOnUse"><stop offset=".72" stop-color="#f6eb16" /><stop offset=".77" stop-color="#ec008c" /><stop offset=".78" stop-color="#cf1f8e" /><stop offset=".79" stop-color="#b33092" /><stop offset=".8" stop-color="#993995" /><stop offset=".81" stop-color="#823e98" /><stop offset=".82" stop-color="#6e4199" /><stop offset=".84" stop-color="#5c449b" /><stop offset=".86" stop-color="#4c459c" /><stop offset=".88" stop-color="#40469d" /><stop offset=".91" stop-color="#38479d" /><stop offset="1" stop-color="#36479d" /></radialGradient><radialGradient id="b" cx="328.83" cy="-3143.83" r="433.38" gradientTransform="matrix(.7 -.04 .47 -.48 1696.61 -1227.87)" /><radialGradient id="c" cx="432.53" cy="-3139.46" r="433.36" gradientTransform="matrix(.88 -.05 .59 -.64 1914.31 -1705.68)" /><radialGradient id="d" cx="497.27" cy="-3085.07" r="433.36" gradientTransform="matrix(1 -.05 .67 -.74 2010.38 -1996.78)"/></defs><g data-name="Layer 2"><g data-name="Layer 1"><path d="M628.33 75.14C464 83.56 264.8 172.41 154.67 286.41S83.89 477 248.22 468.6s363.54-97.27 473.66-211.27 70.78-190.62-93.55-182.19zM277.15 438.65c-146.72 7.52-185.45-57.16-92.09-153.8S452.68 112.6 599.4 105.08s185.45 57.17 92.09 153.81-267.62 172.24-414.34 179.76z" fill="url(#a)" /><path d="M607.74 98.65c-147.54 7.56-326.47 85.88-425.45 186.22S118.57 452.54 266.11 445s326.46-85.9 425.44-186.23 63.73-167.68-83.81-160.12zm-315.63 320c-131.73 6.75-166.44-50.09-82.53-135.15S450 131.77 581.73 125s166.45 50.09 82.54 135.16-240.43 151.71-372.16 158.46z" fill="url(#b)" /><path d="M651.72 41.09c-184.46 9.45-407.88 112.56-531.25 245.17s-79 222 105.42 212.54 407.87-112.56 531.24-245.17S836.17 31.64 651.72 41.09zM258.3 464C93.61 472.4 50 396.94 154.58 284.52S454.61 84.37 619.3 75.93 827.61 143 723 255.38 423 455.52 258.3 464z" fill="url(#c)" /><path d="M681.3.76c-209.37 10.73-462.82 131-602.63 285.88s-89.32 259.57 120.05 248.83 462.81-131 602.62-285.87S890.67-10 681.3.76zm-445.85 494C48.51 504.35-1.14 416 117.39 284.65S457.63 51 644.56 41.46s236.59 78.79 118.07 210.12-340.24 233.61-527.18 243.19z" fill="url(#d)" /></g></g></svg> */}
      </div>
    </div>
  )
}

export default MainPage;