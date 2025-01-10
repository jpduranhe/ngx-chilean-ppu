import {inject} from "@angular/core";
import {AbstractControl, ValidatorFn} from "@angular/forms";
import { NgxChileanPpuService } from "../service/ngx-chilean-ppu.service";


export class PpuValidation {
  private ppuService: NgxChileanPpuService;
  constructor() {
    this.ppuService = new NgxChileanPpuService();
  }

  public ppuValid = (): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return (this.ppuService.validatePpu(control.value)==null)
        ? { ppuInvalid: true }
        : null;
    };
  };
}


