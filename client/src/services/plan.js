import { nebGet, nebPost } from './common';

/**
 * @
 */
function createPlan(args) {
  return nebPost('savePlan', '', 0.00001);
}

export {
  createPlan
};