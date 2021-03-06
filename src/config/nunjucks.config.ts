import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';

import { AssetsHelper } from '../helpers/assets.helper';
import { I18nHelper } from '../helpers/i18n.helper';

export const nunjucksConfig = async (
  app: NestExpressApplication,
  views: any,
): Promise<nunjucks.ConfigureOptions> => {
  const express = app.getHttpAdapter().getInstance();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const entrypoints = require('../../public/entrypoints.json');
  const assetsHelper = new AssetsHelper(entrypoints);
  const i18nHelper = new I18nHelper(app);

  const env = nunjucks.configure(views, {
    noCache: process.env.NODE_ENV === 'development' ? true : false,
    express: express,
  });

  env.addGlobal('encore_entry_link_tags', await assetsHelper.entryLinksTags());

  env.addGlobal(
    'encore_entry_script_tags',
    await assetsHelper.entryScriptTags(),
  );

  env.addFilter(
    't',
    async (...args) => {
      const callback = args.pop();
      const text = args[0];
      const personalisation = args.length < 2 ? {} : args[1];
      try {
        const result = await i18nHelper.translate(text, personalisation);
        callback(null, result);
      } catch (error) {
        callback(error);
      }
    },
    true,
  );

  return env;
};
