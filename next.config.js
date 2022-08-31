module.exports = {
  images: {
    domains: ['raw.githubusercontent.com'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: 'default-src \'self\'; script-src \'none\'; sandbox;'
  }
};
