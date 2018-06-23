import {observable, computed, reaction, action, runInAction} from 'mobx';
import {
  listPlans,
  getPlanByDest,
  getPlanByTag,
  getPlanById
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
  @observable currPlan = {};
  @observable isLoading = false;
  formatPlan = (plan) => ({
    ...plan,
    tags: plan.tags.split(','),
    dests: plan.dests.split(','),
    imgs: plan.imgs.split(',')
  })

  @action getPlanById = async (id) => {
    this.isLoading = true;

    const plan = await getPlanById(id);

    this.isLoading = false;

    runInAction('update currPlan', () => {
      this.currPlan = this.formatPlan(plan);
    });
  }

  @action getAllPlans = async () => {
    this.isLoading = true;

    const plans = await listPlans();

    this.isLoading = false;

    runInAction('update planList', () => {
      this.planList.replace(plans.map(this.formatPlan));
    });
  }

  @action searchPlanByDest = async (dest) => {
    this.isLoading = true;

    const plans = await getPlanByDest(dest);

    this.isLoading = false;

    runInAction('update searchedPlans', () => {
      this.searchPlans.replace(plans.map(this.formatPlan));
    });
  }

  @action searchPlanByTag = async (tag) => {
    this.isLoading = true;

    const plans = await getPlanByTag(tag);

    this.isLoading = false;

    runInAction('update searchedPlans', () => {
      this.searchPlans.replace(plans.map(this.formatPlan));
    });
  }
} 