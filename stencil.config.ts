import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'miitmi-web-component',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: 'dist/loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
