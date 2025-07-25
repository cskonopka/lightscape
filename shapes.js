function drawFullPlane(pg, r, g, b, a) {
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.rect(0, 0, 400, 400);
}

function drawCircle(pg, r, g, b, a) {
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.ellipse(200, 200, 320, 320);
}

function drawCircleInverse(pg, r, g, b, a) {
  let mask = pg.createGraphics(400, 400);
  mask.fill(255);
  mask.noStroke();
  mask.rect(0, 0, 400, 400);
  mask.erase();
  mask.ellipse(200, 200, 320, 320);
  mask.noErase();
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.image(mask, 0, 0);
}

function drawTriangle(pg, r, g, b, a) {
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.triangle(200, 40, 360, 360, 40, 360);
}

function drawTriangleInverse(pg, r, g, b, a) {
  let mask = pg.createGraphics(400, 400);
  mask.fill(255);
  mask.noStroke();
  mask.rect(0, 0, 400, 400);
  mask.erase();
  mask.triangle(200, 40, 360, 360, 40, 360);
  mask.noErase();
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.image(mask, 0, 0);
}

function drawRectangle(pg, r, g, b, a) {
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.rectMode(pg.CENTER);
  pg.rect(200, 200, 320, 320);
}

function drawRectangleInverse(pg, r, g, b, a) {
  let mask = pg.createGraphics(400, 400);
  mask.fill(255);
  mask.noStroke();
  mask.rect(0, 0, 400, 400);
  mask.erase();
  mask.rectMode(mask.CENTER);
  mask.rect(200, 200, 320, 320);
  mask.noErase();
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.image(mask, 0, 0);
}

function drawStar(pg, r, g, b, a) {
  pg.fill(r, g, b, a);
  pg.noStroke();
  let angle = pg.TWO_PI / 5;
  let halfAngle = angle / 2;
  pg.beginShape();
  for (let a = -pg.PI / 2; a < pg.TWO_PI - pg.PI / 2; a += angle) {
    let sx = 200 + pg.cos(a) * 160;
    let sy = 200 + pg.sin(a) * 160;
    pg.vertex(sx, sy);
    sx = 200 + pg.cos(a + halfAngle) * 80;
    sy = 200 + pg.sin(a + halfAngle) * 80;
    pg.vertex(sx, sy);
  }
  pg.endShape(pg.CLOSE);
}

function drawStarInverse(pg, r, g, b, a) {
  let mask = pg.createGraphics(400, 400);
  mask.fill(255);
  mask.noStroke();
  mask.rect(0, 0, 400, 400);
  mask.erase();
  let angle = mask.TWO_PI / 5;
  let halfAngle = angle / 2;
  mask.beginShape();
  for (let a = -mask.PI / 2; a < mask.TWO_PI - mask.PI / 2; a += angle) {
    let sx = 200 + mask.cos(a) * 160;
    let sy = 200 + mask.sin(a) * 160;
    mask.vertex(sx, sy);
    sx = 200 + mask.cos(a + halfAngle) * 80;
    sy = 200 + mask.sin(a + halfAngle) * 80;
    mask.vertex(sx, sy);
  }
  mask.endShape(mask.CLOSE);
  mask.noErase();
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.image(mask, 0, 0);
}

function drawDiamond(pg, r, g, b, a) {
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.beginShape();
  pg.vertex(200, 40);
  pg.vertex(360, 200);
  pg.vertex(200, 360);
  pg.vertex(40, 200);
  pg.endShape(pg.CLOSE);
}

function drawDiamondInverse(pg, r, g, b, a) {
  let mask = pg.createGraphics(400, 400);
  mask.fill(255);
  mask.noStroke();
  mask.rect(0, 0, 400, 400);
  mask.erase();
  mask.beginShape();
  mask.vertex(200, 40);
  mask.vertex(360, 200);
  mask.vertex(200, 360);
  mask.vertex(40, 200);
  mask.endShape(mask.CLOSE);
  mask.noErase();
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.image(mask, 0, 0);
}

function drawHalfPlane(pg, r, g, b, a) {
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.beginShape();
  pg.vertex(0, 0);
  pg.vertex(200, 0);
  pg.vertex(200, 400);
  pg.vertex(0, 400);
  pg.endShape(pg.CLOSE);
}

function drawHalfPlaneInverse(pg, r, g, b, a) {
  let mask = pg.createGraphics(400, 400);
  mask.fill(255);
  mask.noStroke();
  mask.rect(0, 0, 400, 400);
  mask.erase();
  mask.beginShape();
  mask.vertex(0, 0);
  mask.vertex(200, 0);
  mask.vertex(200, 400);
  mask.vertex(0, 400);
  mask.endShape(mask.CLOSE);
  mask.noErase();
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.image(mask, 0, 0);
}

function drawDiagonalLinear(pg, r, g, b, a) {
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.beginShape();
  pg.vertex(0, 400);
  pg.vertex(0, 0);
  pg.vertex(400, 400);
  pg.endShape(pg.CLOSE);
}

function drawDiagonalLinearInverse(pg, r, g, b, a) {
  let mask = pg.createGraphics(400, 400);
  mask.fill(255);
  mask.noStroke();
  mask.rect(0, 0, 400, 400);
  mask.erase();
  mask.beginShape();
  mask.vertex(0, 400);
  mask.vertex(0, 0);
  mask.vertex(400, 400);
  mask.endShape(mask.CLOSE);
  mask.noErase();
  pg.fill(r, g, b, a);
  pg.noStroke();
  pg.image(mask, 0, 0);
}