class ProgressRing extends HTMLElement {
  constructor() {
    super();
    const stroke = this.getAttribute('stroke');
    const radius = this.getAttribute('radius');
    const normalizedRadius = radius - stroke * 2;
    this._circumference = normalizedRadius * 2 * Math.PI;
    this._days = 0;

    this._root = this.attachShadow({mode: 'open'});
    this._root.innerHTML = `
      <svg
        width="${radius * 2}"
        height="${radius * 2}"
      >
        <circle
          stroke="lightgrey"
          stroke-width="${stroke}"
          fill="transparent"
          r="${normalizedRadius}"
          cx="${radius}"
          cy="${radius}"
        />

        <circle 
          id="progress-circle"
          stroke="grey"
          stroke-dasharray="${this._circumference} ${this._circumference}"
          stroke-linecap="round"
          style="stroke-dashoffset:${this._circumference}"
          stroke-width="${stroke}"
          fill="transparent"
          r="${normalizedRadius}"
          cx="${radius}"
          cy="${radius}"
        /> 
    
      <text 
        x="${radius}" 
        y="${radius}" 
        font-size="${Math.ceil(radius / 100)}em"
        font-family="Cuisine" 
        text-anchor="middle" 
        fill="black"
      >
        <tspan id="dayText">${this._days}</tspan>
        <tspan x="${radius}" dy="1.2em">days left</tspan>
      </text>
      </svg>

      <style>
        circle {
          transition: stroke-dashoffset 2.5s ease-out;
          transform: rotate(-90deg);
          transform-origin: 50% 50%;
        }
      </style>
    `;
  }
  
  setProgress(percent) {
    const offset = this._circumference - (percent / 100 * this._circumference);
    const circle = this._root.getElementById('progress-circle');
    circle.style.strokeDashoffset = offset; 
  }

  setDays(days) {
    const text = this._root.getElementById('dayText');
    text.innerHTML = days
  }

  static get observedAttributes() {
    return ['progress', 'days'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'progress') {
      this.setProgress(newValue);
    } else if (name === 'days') {
      this.setDays(newValue)
    }
  }
}

window.customElements.define('progress-ring', ProgressRing);
