class Path {
  constructor(x, y) {
    this.d = `M${x},${y}`;
  }

  lineTo(x, y) {
    this.d += `L${x},${y}`;
    return this;
  }

  close() {
    this.d += 'Z';
    return this;
  }

  toString() {
    return this.d;
  }
}

export default Path;
