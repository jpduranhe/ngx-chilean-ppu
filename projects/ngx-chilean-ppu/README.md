# NgxChileanPPU

Esta librería permite validar en ReactiveForm y formatear Placas Patente chilenos en Angular.



##Instalacion

```typescript
    npm i ngx-chilean-ppu
```

## Uso
Agregar en app.config.ts
```typescript
  export const appConfig: ApplicationConfig = {
  providers: [
    ..
    providePpu()
  ]
};
```
```typescript
import { Component } from '@angular/core';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import 'zone.js';

import { Rut, RutDirective, RutPipe } from 'ngx-chilean-rut';

  @Component({
    selector: 'app-root',
    imports: [
      FormsModule,
      ReactiveFormsModule
    ],
      template: `
      <div class="container">
        <div class="row">
        <h1>PPU Tester</h1>
          <div class="col-md-12">
            <form [formGroup]="formulario" class="form-horizontal">
              <input class="form-control" formControlName="ppu" name="ppu" type="text" placeholder="" />
            </form>

            @if(formulario.get('ppu')!.invalid){
                @if(formulario.get('ppu')!.errors?.['required']){
                  <p style="color: #ff0000;">
                  <span>El campo es requerido</span>
                  </p>
                }
                @if(formulario.get('ppu')!.errors?.['ppuInvalid']){
                  <p style="color: #ff0000;">
                  <span >El placa patente no es válida</span>
                  </p>
                }
            }

            </div>
            <div class="col-md-12">
              @if(formulario.get('ppu')!.valid){
                <p> PPU: {{ formulario.get('ppu')!.value }}</p>
                <p> DV ppu: {{ ppuService.calculateDv(formulario.get('ppu')!.value ) }}</p>
              }

            </div>
        </div>

      </div>
      `
    })
    export class AppComponent {
      public formulario: FormGroup;
      public ppu = 'XL1187';
      public ppuService = inject(NgxChileanPpuService);
      public ppuValidation = inject(PpuValidation);
      constructor(private formBuilder: FormBuilder) {
        this.formulario = this.formBuilder.group({
          ppu: ['', [Validators.required, this.ppuValidation.ppuValid()]],
        });
      }
    }
```


Ejemplo de uso [Link](https://stackblitz.com/~/github.com/jpduranhe/example-ngx-chilean-ppu)
