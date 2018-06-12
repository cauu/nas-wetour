class Plan {
  constructor(title, name, contact, gender=0, startAt, endAt, desc, dests="", tags="", imgs="") {
    this.title = title;
    this.name = name;
    this.contact = contact;
    this.gender = gender;
    this.startAt = startAt;
    this.endAt = endAt;
    this.desc = desc;
    this.dests = dests;
    this.tags = tags;
    this.imgs = imgs;
  }

  toString() {
    return JSON.stringify(this);
  }
}

class Article {
  constructor(title, content, cover, author) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.cover = cover;
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

    LocalContractStorage.defineMapProperty(this, "articles", {
      parse: function (text) {
        return JSON.parse(text);
      },
      stringify: function (o) {
          return JSON.stringify(o);
      }
    });

    LocalContractStorage.defineMapProperty(this, "plans", {
      parse: function (text) {
        return JSON.parse(text);
      },
      stringify: function (o) {
          return JSON.stringify(o);
      }
    });

    LocalContractStorage.defineProperty(this, 'counter', null);
    LocalContractStorage.defineProperty(this, 'articleCounter', null);
  }

  init() {
    this.counter = 0;
    this.articleCounter = 0;
  }

  saveArticle(title, content, cover, author = '') {
    if(!title) {
      throw new Error('Article title must not be empty.');
    }

    if(!content) {
      throw new Error('Article content must not be empty.');
    }

    author = author || Blockchain.transaction.from;

    const article = new Article(title, content, cover, author);

    this.articles.put(this.articleCounter, article);
    
    this.articleCounter = this.articleCounter * 1 + 1;

    return this.articleCounter;
  }

  listArticles() {
    const resp = [];

    for(let i = 0; i <= this.articleCounter * 1; i++) {
      if(this.articles.get(i)) {
        resp.push(this.articles.get(i));
      }
    }

    return resp;
  }

  /**
   * @param {!} title 
   * @param {*} contact 
   * @param {*} gender 性别
   * @param {*} startAt 出发日期
   * @param {*} endAt 结束日期
   * @param {*} desc 介绍
   * @param {*} dests 目的地数组(使用形如"日本,美国"这样的字符串来表示)
   * @param {*} tags 标签，如潜水、拼车等
   * @param {*} imgs 图片url（第一张作为头像和封面）
   */
  savePlan(title, name, contact, gender=0, startAt, endAt, desc, dests, tags, imgs) {
    if(!desc || !startAt || !contact) {
      throw new Error('联系方式、出发日期和行程介绍不能为空');
    }

    if(title.length > 100 || desc.length > 500) {
      throw new Error('Content exceed length limit');
    }

    name = name || Blockchain.transaction.from;

    /**
     * @desc 数组都使用逗号来进行分割
     */
    const plan = new Plan(title, name, contact, gender, startAt, endAt, desc, dests, tags, imgs);

    this.plans.put(this.counter, plan);

    this.counter = this.counter * 1 + 1;

    return this.counter;
  }
  
  listPlans() {
    const resp = [];

    for(let i = 0; i <= this.counter * 1; i++) {
      if(this.plans.get(i)) {
        resp.push(this.plans.get(i));
      }
    }

    return resp;
  }

  /**
   * @desc
   * 最主要的需求是根据gender, startDate和dest来搜索行程
   */
  findPlans(dest, tag) {
    const result = [];

    for(let i = 0; i <= this.counter * 1; i++) {
      const tmp = this.plans.get(i);
      if(tmp && ((dest && tmp.dests.indexOf(dest) !== -1) || (tag && tmp.tags.indexOf(tag) !== -1))) {
        result.push(tmp);
      }
    }

    return result;
  }
}

module.exports = PlanDB;