import { nebGet, nebPost } from './common';

function createPlan(
  title,
  name,
  contact,
  gender='f',
  startAt,
  endAt,
  desc,
  dests="",
  tags="",
  imgs=""
) {
  return nebPost('savePlan',
    `["${title}", "${name}", "${contact}", "${gender}", "${startAt}", "${endAt}", "${desc}", "${dests}", "${tags}", "${imgs}"]`,
    0)
  ;
}

function listPlans() {
  return nebGet('listPlans', '[]');
}

export {
  createPlan,
  listPlans
};