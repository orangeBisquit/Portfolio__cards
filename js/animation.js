const localStorage = window.localStorage;
localStorage.setItem('pageMode', 'anim-true');

const pJSDom = window.pJSDom;

const disableParticles = () => {
  if (pJSDom) {
    pJSDom[0].pJS.particles.move.enable = false;
  }
};

const enableParticles = () => {
  if (pJSDom) {
    pJSDom[0].pJS.particles.move.enable = true;
    pJSDom[0].pJS.fn.particlesRefresh();
  }
};

const disableAnimations = (portfolio) => {
  localStorage.setItem('pageMode', 'anim-false');
  disableParticles();
  if (portfolio) {
    portfolio.disableAnimations();
  }
};

const enableAnimations = (portfolio) => {
  localStorage.setItem('pageMode', 'anim-true');
  enableParticles();
  if (portfolio) {
    portfolio.enableAnimations();
  }
};

const checkAnimations = (portfolio) => {
  if (localStorage.getItem(('pageMode')) === 'anim-false') {
    disableAnimations(portfolio);
  } else if (localStorage.getItem(('pageMode')) === 'anim-true') {
    enableAnimations(portfolio);
  }
};

// localStorage.setItem('pageMode', 'anim-false');

export { checkAnimations };


