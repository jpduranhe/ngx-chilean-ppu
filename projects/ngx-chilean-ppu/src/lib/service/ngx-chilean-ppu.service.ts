import { Injectable } from '@angular/core';
import { PpuFormat } from './ppu-format';
import { letterDB } from './letterDB';

@Injectable({
  providedIn: 'root',
})
export class NgxChileanPpuService {
  ppuFormat: PpuFormat;
  constructor() {
    this.ppuFormat = new PpuFormat();
  }

  public transformInPreNumber(ppu: string) {
    // Reconocer Typo de transformación por tipo de ppu
    let type = this.verifyPpuType(ppu)?.type!;
    let number: Array<number> = [];
    // Convertir dependiendo el formato
    if ('LLL.NNN' === type || 'LLLL.NN' === type) {
      let ppuToArray = Array.from(ppu);
      ppuToArray.forEach((letter, key) => {
        if (!Number.isInteger(parseInt(letter))) {
          number[key] = parseInt(letterDB.get(letter.toUpperCase())!);
        } else {
          number[key] = parseInt(letter);
        }
      });
    }
    if ('LL.NNNN' === type) {
      let ppuLetters = ppu.substring(0, 2);
      let ppuNumbersASstring = ppu.substring(2, 6);
      let ppuLettersTransformedToNumbersASstring =
        this.lettersToNumbers(ppuLetters);
      let ppuNumbersAll =
        ppuLettersTransformedToNumbersASstring + ppuNumbersASstring;

      number = Array.from(ppuNumbersAll).map((letter) => parseInt(letter));
    }
    return number;
  }
  private verifyPpuType(ppu: string) {
    localStorage.setItem('ppu length', ppu.length.toString());
    localStorage.setItem('ppu length', this.ppuFormat.MAX_LENGTH.toString());
    if (ppu.length > this.ppuFormat.MAX_LENGTH) {
      console.error('La patente(ppu) ingresada es de largo inválido');
      return null;
    }

    // New Moto Format
    if (this.isMotoNew(ppu)) {
      return this.ppuFormat.motoNewFormat;
    }

    // Old Moto Format
    if (this.isMotoOld(ppu)) {
      return this.ppuFormat.motoOldFormat;
    }

    // New Auto Format
    if (this.isAutoMovilNew(ppu)) {
      return this.ppuFormat.autoNewFormat;
    }
    // Old Auto Format
    if (this.isAutoMovilOld(ppu)) {
      return this.ppuFormat.autoOldFormat;
    }
    // Carro Arrastre Format
    if (this.isCarroArrastre(ppu)) {
      throw new Error('CARRO DE ARRASTRE no es un formato válido.');
    }
    throw new Error('Ppu no corresponde a ningun formato válido');
  }
  public lettersToNumbers(ppuLetters: string) {
    let transformedPpuLetters = letterDB.get(ppuLetters);
    if (typeof transformedPpuLetters === 'string') {
      return transformedPpuLetters;
    } else {
      throw new Error('Letras de Ppu de Auto Antiguo inválidas');
    }
  }

  private isAutoMovilNew(ppu: string): boolean {
    // Validate format XXXX11
    const regexAutomovil = new RegExp(
      /^[b-d,f-h,j-l,p,r-t,v-z]{2}[\-\. ]?[b-d,f-h,j-l,p,r-t,v-z]{2}[\.\- ]?[0-9]{2}$/,
      'i'
    );
    return regexAutomovil.test(ppu);
  }

  private isAutoMovilOld(ppu: string): boolean {
    // Validate format XX1111
    const regexAutomovil = new RegExp(
      /^[a-z]{2}[\.\- ]?[0-9]{2}[\.\- ]?[0-9]{2}$/,
      'i'
    );
    return regexAutomovil.test(ppu);
  }

  private isMotoOld(ppu: string): boolean {
    // Validate format XX0111 / XX111 / XXX011 / XXX11
    const regexMoto = new RegExp(/^[a-z]{2}0[0-9]{3}$|^[a-z]{2}[0-9]{3}$/, 'i');
    return regexMoto.test(ppu);
  }

  private isMotoNew(ppu: string): boolean {
    // Validate format XX0111 / XX111 / XXX011 / XXX11
    const regexMoto = new RegExp(
      /^[b-d,f-h,j-l,p,r-t,v-z]{3}[0-9]{2}$|^[b-d,f-h,j-l,p,r-t,v-z]{3}0[0-9]{2}$/,
      'i'
    );
    return regexMoto.test(ppu);
  }

  private isCarroArrastre(ppu: string): boolean {
    // Validate format XXX111
    const regexCarroArrastre = new RegExp(/^[a-zA-Z]{3}[1-9]{1}[0-9]{2}$/, 'i');
    return regexCarroArrastre.test(ppu);
  }
  public validatePpu(ppu: string) {
    try {
      return (this.verifyPpuType(ppu));

    } catch (error) {
      return false;
    }
  }

  public calculateDv(ppu: string) {
    // Identificar algoritmo por formato de ppu.
    let format = this.verifyPpuType(ppu)?.type!;
    const numbers = this.transformInPreNumber(ppu);
    if (format === 'LL.NNNN') {
      let S =
        numbers[6] * 2 +
        numbers[5] * 3 +
        numbers[4] * 4 +
        numbers[3] * 5 +
        numbers[2] * 6 +
        numbers[1] * 7 +
        numbers[0] * 2;
      let Ri = S % 11;
      let Rf = 11 - Ri;
      if (Rf === 11) return '0';
      if (Rf === 10) return 'K';
      if (Rf < 10) return Rf.toString();
    }
    if (format === 'LLL.NNN' || format === 'LLLL.NN') {
      let SP =
        numbers[5] * 2 +
        numbers[4] * 3 +
        numbers[3] * 4 +
        numbers[2] * 5 +
        numbers[1] * 6 +
        numbers[0] * 7;
      let R = SP % 11;
      if (R === 0) return '0';
      let RV = 11 - R;
      if (RV === 10) return 'K';
      return RV.toString();
    }
    return null;
  }
}
