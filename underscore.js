window._ = (function () {

    let _helper = {};

    /****************************************
     ***** UNDERSCORE FUNCTIONS
     ***************************************/
    let _ = function (obj) {
        if (_helper.isNumber(obj)) {
            let result = { value: obj };
            result.times = function (iteratee, context) { _.times(obj, iteratee, context) };

            return result;
        }
        else if (_helper.isArray(obj)) {
            return obj;
        }
    }

    _.each = function (list, func, context) {
        if (_helper.isJson(list)) {
            const keys = Object.keys(list);
            const values = Object.values(list);

            for (let i = 0; i < keys.length; i++) {
                let item = values[i];
                let key = keys[i];
                func.call(context, item, key, list);
            }

        } else if (_helper.isArray(list)) {

            for (let i = 0; i < list.length; i++) {
                let item = list[i];

                func.call(context, item, i, list);
            }

        }

        return list;
    };

    _.forEach = _.each;

    _.times = function (n, iteratee, context) {
        let result = [];
        for (let i = 0; i < n; i++) {
            iteratee.call(context, i);
            result.push(i);
        }
        return result;
    };

    _.include = function (list, value, fromIndex) {
        if (fromIndex === undefined)
            fromIndex = 0;
        else if (!_helper.isNumber(fromIndex))
            throw new Error(`fromIndex should be a number instead of ${typeof fromIndex}`);
        else if (fromIndex < list.length)
            throw new Error(`fromIndex is ${fromIndex}, but should be less than ${list.length}`);

        for (let i = fromIndex; i < list.length; i++) {
            if (list[i] == value)
                return true;
        }
        return false;
    };

    /****************************************
     ***** HELPERS
     ***************************************/
    _helper.isArray = function (obj) {
        if (_helper.isEmpty(obj))
            return false;

        const arrayConstructor = [].constructor;
        return arrayConstructor === obj.constructor;
    };

    _helper.isJson = function (obj) {
        if (_helper.isEmpty(obj))
            return false;

        const jsonTemp = {};
        const jsonConstructor = jsonTemp.constructor;
        return jsonConstructor === obj.constructor;
    };

    _helper.isNumber = function (obj) {
        return typeof obj === 'number';
    };

    _helper.isEmpty = function (obj) {
        return obj === null || obj === undefined;
    };

    return _;
})(); 