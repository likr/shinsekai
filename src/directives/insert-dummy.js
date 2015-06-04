const insertDummy = (svg, $window) => {
  // insert dummy animate element for firefox implementation
  const dummy = $window.document.getElementById('ss-dummy-animate');
  if (dummy == null) {
    const animate = $window.document.createElementNS('http://www.w3.org/2000/svg', 'animate');
    animate.setAttribute('id', 'ss-dummy-animate');
    svg.appendChild(animate);
  }
};

export default insertDummy;
