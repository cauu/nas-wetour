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
  imgs="",
  onStartHook
) {
  return nebPost('savePlan',
    `["${title}", "${name}", "${contact}", "${gender}", "${startAt}", "${endAt}", "${desc}", "${dests}", "${tags}", "${imgs}"]`,
    0,
    onStartHook)
  ;
}

function listPlans(tag='', dest='') {
  return nebGet(
    'listPlans', 
    `["${tag}", "${dest}"]`
  );
}

function getPlanByDest(dest='') {
  return nebGet(
    'findPlans',
    `["${dest}", ""]`
  )
}

function getPlanByTag(tag='') {
  return nebGet(
    'findPlans',
    `["", "${tag}"]`
  );
}

function getPlanById(id='') {
  return nebGet(
    'getPlanById',
    `["${id}"]`
  );
}

export {
  createPlan,
  listPlans,
  getPlanByDest,
  getPlanByTag,
  getPlanById
};