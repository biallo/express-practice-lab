import { introLesson } from './intro';
import { routingLesson } from './routing';
import { middlewareLesson } from './middleware';
import { bodyStaticLesson } from './body-static';
import { requestResponseLesson } from './request-response';
import { routerLesson } from './router';
import { errorsLesson } from './errors';
import { validationLesson } from './validation';
import { cookiesSessionsLesson } from './cookies-sessions';
import { corsProxyLesson } from './cors-proxy';
import { templatesLesson } from './templates';
import { databaseLesson } from './database';
import { securityLesson } from './security';
import { productionLesson } from './production';

export type { Example, Lesson } from './types';

export const lessons = [
  introLesson,
  routingLesson,
  middlewareLesson,
  bodyStaticLesson,
  requestResponseLesson,
  routerLesson,
  errorsLesson,
  validationLesson,
  cookiesSessionsLesson,
  corsProxyLesson,
  templatesLesson,
  databaseLesson,
  securityLesson,
  productionLesson,
];
