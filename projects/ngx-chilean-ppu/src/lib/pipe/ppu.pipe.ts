import { Pipe, inject, type PipeTransform } from '@angular/core';
import { NgxChileanPpuService } from '../service/ngx-chilean-ppu.service';

@Pipe({
  name: 'ppu',
  standalone: true,
})
export class PpuPipe implements PipeTransform {
  private ppuService = inject(NgxChileanPpuService);

  transform(value: string): unknown {
    return this.ppuService.validatePpu(value);
  }
}
