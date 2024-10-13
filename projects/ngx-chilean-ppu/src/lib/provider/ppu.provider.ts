import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { NgxChileanPpuService } from "../service/ngx-chilean-ppu.service";
import { PpuValidation } from "../validation/ppu.reactive-form.validation";




export function ngxChileanPpuServiceFactory(): NgxChileanPpuService {
  return new NgxChileanPpuService();
}
export function PpuValidationFactory(): PpuValidation {
  return new PpuValidation();
}

export  const providePpu= (): EnvironmentProviders => {

    return makeEnvironmentProviders([
      {
        provide: NgxChileanPpuService,
        useFactory: ngxChileanPpuServiceFactory,
      },
      {
        provide: PpuValidation,
        useFactory: PpuValidationFactory,
      },
    ]);
}
