import { introLesson } from './intro';
import { routingLesson } from './routing';
import { advancedRoutingLesson } from './advanced-routing';
import { middlewareLesson } from './middleware';
import { bodyStaticLesson } from './body-static';
import { bodyWebhooksLesson } from './body-webhooks';
import { requestResponseLesson } from './request-response';
import { responseToolsLesson } from './response-tools';
import { routerLesson } from './router';
import { errorsLesson } from './errors';
import { fallbackRoutesLesson } from './fallback-routes';
import { validationLesson } from './validation';
import { cookiesSessionsLesson } from './cookies-sessions';
import { corsProxyLesson } from './cors-proxy';
import { templatesLesson } from './templates';
import { databaseLesson } from './database';
import { securityLesson } from './security';
import { staticCacheLesson } from './static-cache';
import { testingLesson } from './testing';
import { productionLesson } from './production';

export type { Example, Lesson } from './types';

export const lessons = [
  introLesson,
  routingLesson,
  advancedRoutingLesson,
  middlewareLesson,
  bodyStaticLesson,
  bodyWebhooksLesson,
  requestResponseLesson,
  responseToolsLesson,
  routerLesson,
  errorsLesson,
  fallbackRoutesLesson,
  validationLesson,
  cookiesSessionsLesson,
  corsProxyLesson,
  templatesLesson,
  databaseLesson,
  securityLesson,
  staticCacheLesson,
  testingLesson,
  productionLesson,
];
