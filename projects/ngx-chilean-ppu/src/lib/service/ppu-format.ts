import { Format } from "../class/format";


export class PpuFormat {
  public readonly MAX_LENGTH: number;
  public readonly VALID_LETTERS: string;
  public readonly motoNewFormat: Format;
  public readonly motoOldFormat: Format;
  public readonly autoNewFormat: Format;
  public readonly autoOldFormat: Format;
  public readonly carroArrastreFormat: Format;
  constructor() {
    this.MAX_LENGTH = 6;
    this.VALID_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.motoNewFormat = new Format('motoNewFormat', 'LLL.NNN');
    this.motoOldFormat = new Format('motoOldFormat', 'LL.NNNN');
    this.autoNewFormat = new Format('autoNewFormat', 'LLLL.NN');
    this.autoOldFormat = new Format('autoOldFormat', 'LL.NNNN');
    this.carroArrastreFormat = new Format('carroArrastreFormat', 'LLL.NNN');
  }
}
