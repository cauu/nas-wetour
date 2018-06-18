import _ from 'lodash';

import dests from '../constant/dest.json';
import mmseg from './mmseg';

function isPC () {
	const userAgentInfo = navigator.userAgent;
	const Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
	let flag = true;
	for (let v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
	}
	return flag;
}

function extractDests(text) {
	return mmseg(text, _.flatten(Object.keys(dests)
		.map((py) => {
			return [dests[py].name].concat(dests[py].children.map(({name}) => name));
		})))
	;
}

export {
	isPC,
	extractDests
};
