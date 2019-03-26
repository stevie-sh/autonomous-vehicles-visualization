 /**
  * Simple debounce like lodash and underscore
  * @param fn
  * @param ms
  * @param immediate
  * @returns {undefined}
  */
function debounce(fn, ms, immediate) {
	let timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) fn.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, ms);
		if (callNow) fn.apply(context, args);
	};
};

export default debounce;

