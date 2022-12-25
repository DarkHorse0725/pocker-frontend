const useLocalhostApis = false;

export const ApiUrlsByAppEnv = {
  localhost: useLocalhostApis
    ? 'http://localhost:5000'
    : 'https://api.decentral.games',
  testing: 'https://api.testing.decentral.games',
  development: 'https://api.dev.decentral.games',
  staging: 'https://api.staging.decentral.games',
  production: 'https://api.decentral.games',
};
