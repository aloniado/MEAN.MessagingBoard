import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//starts angular app in the browser, and calling the bootstrap module with our app as input
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
