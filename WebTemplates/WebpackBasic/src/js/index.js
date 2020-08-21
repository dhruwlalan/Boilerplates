import './assets.js';
import $ from "jquery";
import moment from 'moment';

const greet = (name) => {
	return `Welcome, ${name}!`;
}

document.getElementById('greet-btn').addEventListener('click', () => {
	const input = $('#input').val();
	const now = moment().toString();
	console.log(now);
	if (input) {
		const output = greet(input);
		document.getElementById('output').textContent = output;
	} else {
		document.getElementById('output').textContent = '';
	}	
});