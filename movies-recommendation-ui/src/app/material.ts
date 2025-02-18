import { MatCardModule } from '@angular/material/card';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

export const MaterialModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
];

export const MAT_FORM_FIELD_PROVIDER = {
  provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
  useValue: { appearance: 'outline' },
};
