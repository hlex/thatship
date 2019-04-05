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

    // Notify observer
    this.emit("BoatModelAdded", { boat });
  }
}
