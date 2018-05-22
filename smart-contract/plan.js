class PlanItem {
  toString() {
  }
}

class Plan {
  constructor() {
  }

  init() {
  }

  save(title, author, contact, gender=0, avatar, dest, detail) {
    if(!author || !contact || !dest) {
      throw new Error('Empty auther or contact or destinations.');
    }

    if(title.length > 100 || detail.length > 500 || contact.length > 20 || dest.length > 100) {
      throw new Error('Content exceed length limit');
    }

    const from = BlockChain.transaction.from;

  }
}

module.exports = Plan;