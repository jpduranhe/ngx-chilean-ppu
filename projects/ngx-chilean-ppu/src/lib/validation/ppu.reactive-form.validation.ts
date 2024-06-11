import {inject} from "@angular/core";
import {AbstractControl, AbstractControl, ValidatorFn} from "@angular/forms";
import { NgxChileanPpuService } from "../service/ngx-chilean-ppu.service";

export function ppuValid(): ValidatorFn {
  const ppuService = inject(NgxChileanPpuService); ;
  return (control: AbstractControl): { [key: string]: any } | null => {
    return ppuService.validatePpu(control.value) ? null : { ppuInvalid: true };
  };
}
