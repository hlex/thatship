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
    this.boats = boats;
    this.emit('BoatsAdded', { boats });
  }

  removeBoat(boat) {
    console.log(`remove boat: ${boat.id}`);
    this.boats = this.boats.filter(a => a.id !== boat.id);
    this.emit('BoatRemoved', { id: boat.id });
  }

  updateBoat(model) {
    if (model.category && model.color) {
      // OceanMediator
      this.emit('UpdateBoatCategory', { model });
    }
  }
}
