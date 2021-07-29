/**
 * Created on 1399/9/19 (2020/12/9).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

export const merge = (destObject, ...srcObjects) => {
	if (!isObject(destObject))
		throw new Error('`destObject` should be an Object!\n' + {destObject})

	let equality = true

	for (const [i, srcObj] of srcObjects.entries()) {
		if (!isObject(srcObj))
			throw new Error('Each of `srcObjects` should be an Object!\n' + {i, srcObj})

		mergeR(destObject, srcObj)
	}

	return {destObject, equality}

	function mergeR(dstObj, srcObj) {
		for (const [k, subSrcObj] of Object.entries(srcObj)) {
			if (isObject(subSrcObj)) {
				if (!isObject(dstObj[k])) {
					equality = false
					dstObj[k] = {}
				}
			} else if (subSrcObj instanceof Array) {
				if (!(dstObj[k] instanceof Array)) {
					equality = false
					dstObj[k] = []
				}
			} else {
				if (!Object.is(dstObj[k], subSrcObj)) {
					equality = false
					dstObj[k] = subSrcObj
				}
				continue
			}

			mergeR(dstObj[k], subSrcObj)
		}
	}
}

export const deepClone = obj => merge({}, obj).destObject

export default merge

//*****************************************************************************************/
const isObject = variable => Object.prototype.toString.call(variable) === '[object Object]'
