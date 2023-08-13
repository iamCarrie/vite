import 'index.css';
import { createApp } from 'petite-vue';

const requireAll = (requireContext) => requireContext.keys().map(requireContext);
const req = require.context('_svg/', false, /\.svg$/);

requireAll(req);

createApp({
  // exposed to all expressions
  isNav: false,
  subNav: '',
  count: 0,
  total: 480,
  // getters
  get plusOne() {
    return this.count + 1;
  }

}).mount('#app');
