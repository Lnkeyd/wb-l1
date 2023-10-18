// 13.	Задача на классы и наследование: создайте базовый класс Shape (фигура),
// который имеет методы для расчета площади и периметра. Затем создайте подклассы,
//  представляющие различные фигуры, такие как прямоугольник, круг и треугольник.
//  Реализуйте методы расчета площади и периметра для каждой фигуры.

class Shape {
  getArea() {
    return "Периметр фигуры";
  }

  getPerimeter() {
    return "Площадь фигуры";
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return 2 * (this.width + this.height);
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  getArea() {
    return (Math.PI * this.radius * this.radius).toFixed(2);
  }

  getPerimeter() {
    return (2 * Math.PI * this.radius).toFixed(2);
  }
}

class Triangle extends Shape {
  constructor(side1, side2, side3) {
    super();
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
  }

  getArea() {
    if (
      this.side1 + this.side2 <= this.side3 ||
      this.side1 + this.side3 <= this.side2 ||
      this.side3 + this.side2 <= this.side1
    )
      return "Неверные данные: у треугольника сумма любых двух сторон всегда должна быть больше третьей стороны!";
    const s = (this.side1 + this.side2 + this.side3) / 2;
    return Math.sqrt(
      s * (s - this.side1) * (s - this.side2) * (s - this.side3)
    ).toFixed(2);
  }

  getPerimeter() {
    if (
      this.side1 + this.side2 <= this.side3 ||
      this.side1 + this.side3 <= this.side2 ||
      this.side3 + this.side2 <= this.side1
    )
      return "Неверные данные: у треугольника сумма любых двух сторон всегда должна быть больше третьей стороны!";
    return this.side1 + this.side2 + this.side3;
  }
}

// Тест:
const rectangle = new Rectangle(5, 5);
console.log(rectangle.getArea()); // 25
console.log(rectangle.getPerimeter()); // 20

const circle = new Circle(7);
console.log(circle.getArea()); // 153.94
console.log(circle.getPerimeter()); // 43.98

const triangle = new Triangle(5, 4, 2);
console.log(triangle.getArea()); // 3.8
console.log(triangle.getPerimeter()); // 11
