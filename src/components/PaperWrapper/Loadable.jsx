/**
 *
 * Asynchronously loads the component for PaperWrapper
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
