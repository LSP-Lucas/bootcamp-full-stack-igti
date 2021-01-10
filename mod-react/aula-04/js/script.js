class Animal {
  constructor(name) {
    this.name =name;
  }

  speak() {
    console.log(`${this.name} falando...`);
  }
}

class Dog extends Animal {
  constructor(name, type) {
    super(name);

    this.type = type;
  }

  speak() {
    console.log(`${this.name} ${this.type} Miando...`);
  }
}

class Cat extends Animal {
  constructor(name, type) {
    super(name);

    this.type = type;
  }

  speak() {
    console.log(`${this.name} ${this.type} Latindo...`);
  }
}

const animal = new Animal('Totó');
const dog = new Dog('Jack', 'Pastor Alemão');
const cat = new Cat('Han Solo', 'Frajola');

animal.speak();
dog.speak();
cat.speak();