/*!
 * Matomo - free/libre analytics platform
 *
 * @link https://matomo.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import createAngularJsAdapter from '../createAngularJsAdapter';
import Clock from './Clock.vue';

export default createAngularJsAdapter({
  component: Clock,
  scope: {
    periods: {
      angularJsBind: '<',
    },
  },
  directiveName: 'piwikClock',
});
