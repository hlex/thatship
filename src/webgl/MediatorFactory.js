import OceanMediator from "./view/mediator/OceanMediator";
import BoatMediator from "./view/mediator/BoatMediator";

/**
 * Helper class to generate mediators(views).
 */
export default class MediatorFactory {
  static getMediator(model) {
    switch (model.className) {
      case "Ocean":
        return new OceanMediator(model, this);
      case "Boat":
        return new BoatMediator(model, this);
    }
  }
}
