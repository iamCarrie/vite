const screenSize = {
  pc: 1366,
  tab: 768,
  m: 350
};

const screens = {
  m: [{
    raw: `(max-width: 999px) and (max-height: 428px) and (orientation: landscape), (max-width: ${screenSize.tab - 1}px)`
  }],
  tm: [{
    raw: '(max-width: 1001px), (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5)'
  }],
  t: [{
    raw: `(min-width: ${screenSize.tab}px) and (max-width: 1001px) and (min-height: 428px),
    (min-width: 1024px) and (max-height: 1366px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5)`
  }],
  pt: [{
    raw: `(min-width: ${screenSize.tab}px)`
  }],
  pMin: [{
    min: '1001px',
    max: `${screenSize.pc}px`
  }],
  p: [{
    raw: '(min-width: 1001px)'
  }],
  pMax: [{
    min: `${screenSize.pc + 1}px`
  }]
};

module.exports = {
  screens,
  screenSize
};
