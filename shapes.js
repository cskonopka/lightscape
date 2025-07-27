let shapeOptions = [
  'Circle', 'Square', 'Triangle',
  'Vertical Panel', 'Horizontal Panel',
  'Diagonal Panel', 'Diagonal Panel (Flipped)',
  'Polygon', 'Pentagon', 'Hexagon', 'Heptagon', 'Octagon', 'Nonagon', 'Rhombus'
];

function drawShapeSystem(pg, shapeType, col, alpha, size, invert, offsetX, offsetY, rotation) {
  pg.push();
  pg.translate(pg.width / 2 + offsetX, pg.height / 2 + offsetY);
  pg.rotate(rotation);
  pg.fill(red(col), green(col), blue(col), alpha);
  pg.noStroke();

  if (invert) {
    pg.erase();
    drawShape(pg, shapeType, 0, 0, size);
    pg.noErase();
    pg.fill(red(col), green(col), blue(col), alpha);
    pg.rectMode(CENTER);
    pg.rect(0, 0, pg.width * 2, pg.height * 2);
  } else {
    drawShape(pg, shapeType, 0, 0, size);
  }

  pg.pop();
}

function drawShape(pg, shapeType, x, y, size) {
  switch (shapeType) {
    case 'Circle':
      pg.ellipse(x, y, size);
      break;
    case 'Square':
      pg.rectMode(CENTER);
      pg.rect(x, y, size, size);
      break;
    case 'Triangle':
      const h = (sqrt(3) / 2) * size;
      pg.triangle(x, y - h / 2, x - size / 2, y + h / 2, x + size / 2, y + h / 2);
      break;
    case 'Vertical Panel':
      pg.rectMode(CENTER);
      pg.rect(x, y, size / 3, size);
      break;
    case 'Horizontal Panel':
      pg.rectMode(CENTER);
      pg.rect(x, y, size, size / 3);
      break;
    case 'Diagonal Panel':
      pg.push();
      pg.rotate(PI / 4);
      pg.rectMode(CENTER);
      pg.rect(x, y, size, size / 4);
      pg.pop();
      break;
    case 'Diagonal Panel (Flipped)':
      pg.push();
      pg.rotate(-PI / 4);
      pg.rectMode(CENTER);
      pg.rect(x, y, size, size / 4);
      pg.pop();
      break;
    case 'Polygon':
      drawRegularPolygon(pg, x, y, size / 2, 6);
      break;
    case 'Pentagon':
      drawRegularPolygon(pg, x, y, size / 2, 5);
      break;
    case 'Hexagon':
      drawRegularPolygon(pg, x, y, size / 2, 6);
      break;
    case 'Heptagon':
      drawRegularPolygon(pg, x, y, size / 2, 7);
      break;
    case 'Octagon':
      drawRegularPolygon(pg, x, y, size / 2, 8);
      break;
    case 'Nonagon':
      drawRegularPolygon(pg, x, y, size / 2, 9);
      break;
    case 'Rhombus':
      pg.quad(
        x, y - size / 2,
        x + size / 3, y,
        x, y + size / 2,
        x - size / 3, y
      );
      break;
  }
}

function drawRegularPolygon(pg, x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  pg.beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    pg.vertex(sx, sy);
  }
  pg.endShape(CLOSE);
}
