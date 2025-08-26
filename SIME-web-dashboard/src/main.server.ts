import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { ApplicationRef } from '@angular/core';

/*const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;*/

export default async function (): Promise<ApplicationRef> {
  return bootstrapApplication(AppComponent, config);
} // forma mais robusta, segura e compatível com SSR moderno do Angular com Vite