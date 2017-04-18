/*global describe, it, before */

import chai from 'chai';
import Wu from '../lib/Wu.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my Wu',  () => {
  before(() => {
    lib = new Wu();
  });
  describe('when I need the name', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('Wu');
    });
  });
});

