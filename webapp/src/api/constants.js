export const baseUrl =
   process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_PRODUCTION_API
      : process.env.REACT_APP_HTTPS === 'true'
      ? process.env.REACT_APP_DEVELOPMENT_API_HTTPS
      : process.env.REACT_APP_DEVELOPMENT_API;


