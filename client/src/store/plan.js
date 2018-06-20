import {observable, computed, reaction, action, runInAction} from 'mobx';
import {
  listPlans,
  getPlanByDest,
  getPlanByTag
} from '../services/plan';

/**
 * @todo 
 * 1. 搜索所有plan
 * 2. 根据关键字（tag，dest）获取对应行程
 * 3. 获取推荐行程
 * 4. 当前行程detail
 */
export default class PlanStore {
  @observable planList = [];
  @observable searchPlans = [];

  formatPlan = (plan) => ({
    ...plan,
    tags: plan.tags.split(','),
    dests: plan.dests.split(','),
    imgs: plan.imgs.split(',')
  })

  @action getAllPlans = async () => {
    const plans = await listPlans();

    runInAction('update planList', () => {
      this.planList.replace(plans.map(this.formatPlan));
    });
  }

  @action searchPlanByDest = async (dest) => {
    const plans = await getPlanByDest(dest);

    runInAction('update searchedPlans', () => {
      this.searchPlans.replace(plans.map(this.formatPlan));
    });
  }

  @action searchPlanByTag = async (tag) => {
    const plans = await getPlanByTag(tag);

    runInAction('update searchedPlans', () => {
      this.searchPlans.replace(plans.map(this.formatPlan));
    });
  }
}
