import assert from 'assert'

/**
 * Created on 1399/9/19 (2020/12/9).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */
import merge, {deepClone} from '../src/main.js'

const o1 = {
	a: 1,
	b: {
		c: 2,
	},
}

const o2 = {
	b: {
		c: 3,
	},
}

const o3 = {
	b: {
		d: 4,
	},
}

const result = merge(o1, o2, o3)

const o4 = {
	a: 1,
	b: {
		c: 3,
		d: 4,
	},
}

assert.deepStrictEqual(result.destObject, o4)

assert.strictEqual(result.equality, false)

assert.deepStrictEqual(deepClone(result.destObject), o4)
