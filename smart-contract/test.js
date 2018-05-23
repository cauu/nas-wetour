class Item {
  constructor(name) {
    this.name = name;
  }

  toString() {
    return JSON.stringify(this);
  }
}

class DB {
  constructor() {
  }

  save(name) {
    const group = {};

    const item = new Item(name);
    group[0] = item;

    this.group = group;
  }

  find() {
    console.log(this.group);
    // console.log(this.group.toString());
    return JSON.parse(JSON.stringify(this.group));
  }

}

// const db = new DB();
// db.save('anan');
// console.log(db.find());
JSON.parse({a: 1})


