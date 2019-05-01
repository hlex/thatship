import Observer from "../Observer";

/**
 * The model doesn’t know anything about views and controllers.
 * When a model changes, typically it will notify its observers that a change has occurred.
 */
export default class Ocean extends Observer {
  constructor() {
    super();

    this.name = "Ocean Model";
    this.className = "Ocean";
    this.boats = [];
  }

  addBoat(boat) {
    this.boats.push(boat);
    this.emit('SingleBoatAdded', { boat });
  }

  addBoats(boats) {
    if (boats.length) {
      this.boats = boats;
      this.emit('BoatsAdded', { boats });
    }
  }

  removeBoat(model) {
    this.boats = this.boats.filter(a => a.id !== model.id);
    this.emit('Filter', { model, isVisible: false })
  }

  updateBoat(model) {
    if (model.category && model.color) {
      // OceanMediator
      this.emit('UpdateBoatCategory', { model });
    }
  }

  filterBoatsByCategoryValue(categoryName) {
    this.boats = this.boats.map((model) => {
      this.emit('Filter', {
        model,
        isVisible: categoryName ? (model.category === categoryName) : true
      })
      return model;
    });
  }

  filterBoatsByAuthor(author) {
    this.boats = this.boats.map((model) => {
      this.emit('Filter', {
        model,
        isVisible: author ? (model.author === author) : true
      })
      return model;
    });
  }

  filterBoatsByKeyword(keyword) {
    const regex = new RegExp(keyword, 'ig')
    this.boats = this.boats.map((model) => {
      this.emit('Filter', {
        model,
        isVisible: keyword ? (regex.test(`${model.message}${model.author}${model.category}`)) : true
      })
      return model;
    });
  }
}
