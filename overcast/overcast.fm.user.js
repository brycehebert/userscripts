// ==UserScript==
// @name        Volume Control for Overcast
// @description Adds a volume control on Overcast.fm podcast episode pages.
// @namespace   https://www.github.com/brycehebert/userscripts
// @version     1.0.2
// @grant       GM_addStyle
// @match       https://overcast.fm/+*
// @run-at      document-idle
// @updateURL   https://raw.githubusercontent.com/brycehebert/userscripts/master/overcast/overcast.fm.user.js
// ==/UserScript==

const player = document.getElementById("audioplayer");
const playerControls = document.getElementById("playcontrols_container");

if (player && playerControls) {
  let slider = document.createElement("input");
  const sliderAttributes = {
    id: "GMvolumeSlider",
    type: "range",
    min: "0",
    max: "1",
    step: ".01"
  };
  const sliderStyles = `
  #GMvolumeSlider {
    -webkit-appearance: none;
    margin-right: 15px;
    width: 200px;
    height: 7px;
    background: rgba(252, 126, 15, 0.15);
    border-radius: 5px;
    background-image: linear-gradient(#fdbe87, #fdbe87);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  #GMvolumeSlider::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: none;
    background: #fc7e0f;
  }
  
  #GMvolumeSlider::-moz-range-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    border: none;
    background: #fc7e0f;
  }
  #GMvolumeSlider::-webkit-slider-runnable-track  {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
  
  #GMvolumeSlider::-moz-range-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
  `;
  for (key in sliderAttributes) {
    slider.setAttribute(key, sliderAttributes[key]);
  }
  slider.oninput = (e) => {
    const min = e.target.min;
    const max = e.target.max;
    const val = e.target.value;
    e.target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";

    player.volume = e.target.value;
  };

  const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgElement.setAttribute("viewBox", "0 0 576 512");
  svgElement.innerHTML = `<path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path>`;

  let svgStyle = {
    height: "16px",
    color: "#fc7e0f",
    display: "inline-block",
    margin: "5px 5px -5px 0"
  };
  for (key in svgStyle) {
    svgElement.style[key] = svgStyle[key];
  }

  playerControls.insertAdjacentElement("beforebegin", slider);
  slider.insertAdjacentElement("beforebegin", svgElement);

  if (GM.info.scriptHandler === "Greasemonkey") {
    const style = document.createElement("style");
    style.innerHTML = sliderStyles;
    document.head.appendChild(style);
  } else {
    GM_addStyle(sliderStyles);
  }
}
