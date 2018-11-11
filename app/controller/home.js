'use strict';

const mime = require('mime-types');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.redirect('/home');
  }

  async list() {
    const { ctx } = this;
    let prefix = ctx.params[0] || '';
    if (prefix && !prefix.endsWith('/')) {
      prefix = prefix + '/';
    }
    const result = await ctx.oss.list({
      prefix,
      delimiter: '/',
      'max-keys': 1000,
      marker: ctx.query.marker,
    });
    if (!result.objects) return ctx.redirect('/home');

    const items = result.objects.map(item => {
      item.category = mime.lookup(item.name) || 'unknow';
      return item;
    });

    await ctx.render('index.html', {
      currentDirectory: {
        name: `/${prefix}`,
      },
      items,
      prefixes: result.prefixes,
      nextMarker: result.nextMarker,
    });
  }

  async preview() {
    const { ctx } = this;
    let objectName = ctx.params[0];
    if (objectName) objectName = objectName.replace(/^\/+/, '');
    if (!objectName) return ctx.redirect('/home');

    const signatureUrl = ctx.oss.signatureUrl(objectName);
    ctx.redirect(signatureUrl);
  }
}

module.exports = HomeController;
