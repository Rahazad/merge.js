import util from 'util'

/**
 * Created on 1399/9/19 (2020/12/9).
 * @author {@link https://mirismaili.github.io S. Mahdi Mir-Ismaili}
 */

export const merge = (dstObjArr, ...srcObjectsOrArrays) => {
	const oType = Object.prototype.toString.call(dstObjArr)
	
	if (!['[object Object]', '[object Array]'].includes(oType))
		throw Error('`dstObjArr` should be an Object or an Array!\n' + util.inspect({dstObjArr}))
	
	let equality = true
	
	for (const [i, srcObjArr] of srcObjectsOrArrays.entries()) // First, check type-validation ...
		if (!Object.prototype.toString.call(srcObjArr))
			throw Error(
				`All \`srcObjectsOrArrays\` should have similar oType to \`dstObjArr\` (${oType})!\n` +
				util.inspect({i, 'srcObjArr oType': Object.prototype.toString.call(srcObjArr), srcObjArr}),
			)
	
	for (const srcObjArr of srcObjectsOrArrays) // ... then start the work:
		mergeR(dstObjArr, srcObjArr)
	
	return {result: dstObjArr, equality}
	
	function mergeR(dstObjArr, srcObjArr) {
		for (const [k, subSrcObj] of Object.entries(srcObjArr)) {
			if (isObject(subSrcObj)) {
				if (!isObject(dstObjArr[k])) {
					equality = false
					dstObjArr[k] = {}
				}
			} else if (subSrcObj instanceof Array) {
				if (!(dstObjArr[k] instanceof Array)) {
					equality = false
					dstObjArr[k] = []
				}
			} else {
				if (!Object.is(dstObjArr[k], subSrcObj)) {
					equality = false
					dstObjArr[k] = subSrcObj
				}
				continue
			}
			
			mergeR(dstObjArr[k], subSrcObj)
		}
	}
}

export function deepClone(objArr) {
	if (!['[object Object]', '[object Array]'].includes(Object.prototype.toString.call(objArr)))
		throw Error('`objArr` should be an Object or an Array!\n' + util.inspect({objArr}))
	
	return merge(objArr instanceof Array ? [] : {}, objArr).result
}

export default merge

//*****************************************************************************************/
const isObject = (variable) => Object.prototype.toString.call(variable) === '[object Object]'
