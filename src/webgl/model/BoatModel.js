import Observer from "../Observer";

export default class Boat extends Observer {
  constructor(data) {
    super();

    this.name = data.name || "Default Boat Name";
    this.id = data.id;
    this.message = data.message || "...";
    this.author = data.author || "Author";
    this.category = data.category;
    this.color = data.color;
    this.className = "Boat";
    this.new = data.new;
  }

  update(data) {
    Object.assign(this, data);

    if (data.category && data.color) {
      this.emit("UpdateCategory", { color: data.color });
    }
  }
}
