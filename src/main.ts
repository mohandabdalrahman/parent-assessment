/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { rootConfig } from './root.config';
import {RootComponent} from "./root.component";

bootstrapApplication(RootComponent, rootConfig)
  .catch((err) => console.error(err));
