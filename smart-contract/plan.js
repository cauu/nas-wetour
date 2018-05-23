class Plan {
  constructor(title, contact, gender=0, startDate, dest, endDate, avatar='', detail='', author='') {
    this.author = author;
    this.title = title;
    this.contact = contact;
    this.gender = gender;
    this.avatar = avatar;
    this.dest = dest;
    this.detail = detail;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  toString() {
    return JSON.stringify(this);
  }
}

/**
 * @desc
 * 所有的plan都放在PlanDB中,
 * indexBy: 可以将plan根据某个字段建立索引
 * find: 可以模糊匹配所有相关的plan
 * save: 将plan保存到数据库中
 */
class PlanDB {
  constructor() {
    LocalContractStorage.defineMapProperty(this, "db", {
      parse: function (text) {
        return JSON.parse(text);
      },
      stringify: function (o) {
          return JSON.stringify(o);
      }
    });

    LocalContractStorage.defineProperty(this, 'counter', 1);
  }

  init() {
  }

  /**
   * @param {!} title 
   * @param {*} contact 
   * @param {*} gender 性别
   * @param {*} startDate 出发日期
   * @param {*} endDate 结束日期
   * @param {*} dest 目的地
   * @param {*} avatar 头像(可为空)
   * @param {*} detail 详情（可为空）
   */
  save(title, contact, gender=0, startDate, dest, endDate, avatar='', detail='', author='') {
    if(!contact || !dest || !startDate) {
      throw new Error('Empty auther or contact or destinations or startDate.');
    }

    if(title.length > 100 || detail.length > 500 || contact.length > 20 || dest.length > 100) {
      throw new Error('Content exceed length limit');
    }

    const plans = this.db.get('basic') || {};

    author = author || Blockchain.transaction.from;

    const plan = new Plan(title, contact, gender, startDate, dest, endDate, avatar, detail, author);

    plans[this.counter] = plan; 

    this.counter++;

    this.db.put('basic', plans);
  }

  /**
   * @desc
   * 最主要的需求是根据gender, startDate和dest来搜索行程
   */
  find(query) {
    return this.db.get('basic');
  }

  /**
   * @desc
   * 基于b+tree为某个字段建立索引
   * @param {*} key 索引关键字
   * @param {*} order 顺序: 0 降序 1 升序
   */
  indexBy(key, order) {
    let bucket;
    if(!this.db.get(key)) {
      bucket = {};

      const plans = this.db.get('basic');

      /**
       * @desc 创建索引
       */
      Object.keys(plans).forEach((plan, idx) => {
      });
    }
  }
}

module.exports = PlanDB;