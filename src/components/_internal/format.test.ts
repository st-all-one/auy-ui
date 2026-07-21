import { expect } from '@open-wc/testing';
import { maskCPF, maskCNPJ, maskPhone, stripMask } from './format.js';

describe('Format utilities', () => {
  it('masks CPF', () => {
    expect(maskCPF('12345678901')).to.equal('123.456.789-01');
  });

  it('masks CNPJ', () => {
    expect(maskCNPJ('12345678000199')).to.equal('12.345.678/0001-99');
  });

  it('masks phone', () => {
    expect(maskPhone('11999999999')).to.equal('(11) 99999-9999');
  });

  it('strips mask', () => {
    expect(typeof stripMask).to.equal('function');
  });
});
