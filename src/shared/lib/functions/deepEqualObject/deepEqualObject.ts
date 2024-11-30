export function deepEqualObject(obj1: any, obj2: any) {
	if (obj1 === null || obj2 === null) {
		return 1
	}

    if (obj1 === undefined || obj2 === undefined) {
        return false
    }

    let keysObj1 = Object.keys(obj1)
    let keysObj2 = Object.keys(obj2)

    if (typeof obj1 !== typeof obj2) {
        return false
    }

    if (keysObj1.length !== keysObj2.length) {
		return false
	} 

    for (let i = 0; i < keysObj1.length; i++) {
        if (typeof obj1[keysObj1[i]] === 'object' && typeof obj2[keysObj2[i]] === 'object') {
            if(deepEqualObject(obj1[keysObj1[i]], obj2[keysObj2[i]])) continue
            else {return false}
        }
        if (obj1[keysObj1[i]] !== obj2[keysObj2[i]]) return false
    }
	
    return true
}