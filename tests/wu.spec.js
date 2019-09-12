import test from 'ava'
import Wu from '../src/index.js'

const wu = new Wu()

test('Given an instance of my Wu', t => {
  t.is(wu.name, 'Wu')
})
