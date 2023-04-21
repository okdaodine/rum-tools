export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent,
) || window.innerWidth < 760;

export const isProduction = process.env.REACT_APP_ENV === 'production';