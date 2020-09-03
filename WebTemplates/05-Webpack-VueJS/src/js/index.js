// ASSETS
import './assets.js';

// MAIN
import Vue from 'vue';
import App from './components/App.vue';

new Vue({
	el: '#app',
	render: h => h(App),
})