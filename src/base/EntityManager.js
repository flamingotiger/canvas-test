export default class EntityManager {
  entities = [];
  update() {
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].update();
    }
  }
  render(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (let i = 0; i < this.entities.length; i++) {
      this.entities[i].render(ctx);
    }
  }

  addEntity(entity) {
    this.entities.push(entity);
  }

  removeEntity(entity) {
    const entityIndex = this.entities.indexOf(entity);
    if (entityIndex > -1) {
      this.entities.splice(entityIndex, 1);
    }
  }
}
