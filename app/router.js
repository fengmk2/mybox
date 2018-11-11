'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get(/^\/home(?:\/(.+))?/, controller.home.list);
  router.get(/^\/preview(?:\/(.+))/, controller.home.preview);
};
