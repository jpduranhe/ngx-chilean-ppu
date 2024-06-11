import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgxChileanPpuService } from '../service/ngx-chilean-ppu.service';

@Directive({
  selector: '[ppu]',
  standalone: true,
})
export class PpuDirective {
  private elem = inject(ElementRef);
  private ppuService = inject(NgxChileanPpuService);

  @HostListener('focus')
  public onFocus() {
    this.elem.nativeElement.value = this.ppuService.validatePpu(
      this.elem.nativeElement.value
    );
  }
  @HostListener('blur')
  public onBlur() {
    this.elem.nativeElement.value =
      this.ppuService.validatePpu(this.elem.nativeElement.value);
  }
}
