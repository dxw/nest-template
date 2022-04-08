import { createMock } from '@golevelup/ts-jest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { I18nService } from 'nestjs-i18n';

import { I18nHelper } from './i18n.helper';

describe('I18nHelper', () => {
  let service: I18nService;
  let app: NestExpressApplication;
  let helper: I18nHelper;

  beforeEach(async () => {
    service = createMock<I18nService>();
    app = createMock<NestExpressApplication>({
      get: () => service,
    });
    helper = new I18nHelper(app);
  });

  it('returns a translated string', async () => {
    await helper.translate('hello world');

    expect(service.translate).toHaveBeenCalledWith('hello world', { args: {} });
  });

  it('accepts optional personalisation options', async () => {
    await helper.translate('hello world', { foo: 'bar' });
    expect(service.translate).toHaveBeenCalledWith('hello world', {
      args: { foo: 'bar' },
    });
  });
});
