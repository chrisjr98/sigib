import { Controller, Get, Res, Req } from '@nestjs/common';

@Controller()
export class PrincipalController {
  @Get('front-app.*')
  all(@Req() request, @Res() response) {
    console.log('EN FRONT APP');
    if (request.originalUrl.includes('front-app')) {
      response.render('user', {
        user: request.session.passport.user,
      });
    } else {
      response.render('404');
    }
  }

  @Get('front-dev.*')
  allDev(@Req() request, @Res() response) {
    console.log('EN FRONT DEV');
    if (request.originalUrl.includes('front-dev')) {
      response.render('user-dev', {
        user: request.session.passport.user,
      });
    } else {
      response.render('404');
    }
  }

  @Get('*.js')
  enviarGzipedJs(@Req() request, @Res() response) {
    request.url = request.request + '.gz';
    request.set('Content-Encoding', 'gzip');
    request.set('Content-Type', 'text/javascript');
    request.send();
  }

  @Get('*.css')
  enviarGzipedCss(@Req() request, @Res() response) {
    request.url = request.request + '.gz';
    request.set('Content-Encoding', 'gzip');
    request.set('Content-Type', 'text/css');
    request.send();
  }

  @Get('*.woff2')
  enviarGzipedPng(@Req() request, @Res() response) {
    request.url = request.request + '.gz';
    request.set('Content-Encoding', 'gzip');
    request.set('Content-Type', 'application/font-woff2');
    request.send();
  }
}
