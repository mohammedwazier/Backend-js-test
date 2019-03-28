'use strict';

module.exports = {
	hello : () => {
		return 'hello, ini dari service test.js';
	},
	tambah : (val1 = 5, val2 = 5) => {
		return val1 + val2;
	},
	deret : (val) => {
		var result = '';
		var a = 0;
		var b = 0;
		for (var i = 0; i <= val; i++) {
			a = i;
			result += a*a + " ";
		}
		return result;
	},
	kurang : (val1, val2) => {
		return val1 - val2;
	}
};