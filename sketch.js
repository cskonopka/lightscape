let planes = [];
let exportButton;
let randomizeButton;
const UI_TIMEOUT = 3000;
let lastInteraction = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  noStroke();

  for (let i = 0; i < 3; i++) {
    planes.push(createShapePlane(i));
  }

  exportButton = createButton('Export').parent(select('#controls'));
  exportButton.mousePressed(exportCompositeImage);

  randomizeButton = createButton('Randomize').parent(select('#controls'));
  randomizeButton.mousePressed(() => {
    planes.forEach(plane => {
      plane.shapeSelect.selected(random(shapeOptions));
      plane.sizeSlider.value(random(width * 0.25, width));
      plane.xSlider.value(random(-width / 2, width / 2));
      plane.ySlider.value(random(-height / 2, height / 2));
      plane.rotationSlider.value(random(TWO_PI));
    });
    lastInteraction = millis();
  });
}

function draw() {
  clear();

  planes.forEach(plane => {
    plane.pg.clear();
    drawShapeSystem(
      plane.pg,
      plane.shapeSelect.value(),
      plane.colorPicker.color(),
      plane.opacitySlider.value(),
      plane.sizeSlider.value(),
      plane.invertCheckbox.checked(),
      plane.xSlider.value(),
      plane.ySlider.value(),
      plane.rotationSlider.value()
    );
    image(plane.pg, 0, 0);
  });

  select('#controls').style('opacity', (millis() - lastInteraction > UI_TIMEOUT) ? '0' : '1');
}

function mouseMoved() {
  lastInteraction = millis();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  planes.forEach(p => {
    p.pg = createGraphics(windowWidth, windowHeight);
  });
}

// function exportCompositeImage() {
//   let output = createGraphics(width, height);
//   output.clear();
//   planes.forEach(p => output.image(p.pg, 0, 0));
//   save(output, 'lightspace.png');
// }

function exportCompositeImage() {
  let exportW = 2400;
  let exportH = 3600;
  let output = createGraphics(exportW, exportH);
  output.clear();

  planes.forEach(plane => {
    output.push();
    output.scale(exportW / width, exportH / height);
    output.image(plane.pg, 0, 0);
    output.pop();
  });

  save(output, 'lightspace_export.png');
}

function createShapePlane(index) {
  const container = createDiv().parent('#controls');
  container.child(createP(`Plane ${index + 1}`));

  const shapeSelect = createSelect().parent(container);
  shapeOptions.forEach(opt => shapeSelect.option(opt));
  shapeSelect.selected(random(shapeOptions));

  const colorPicker = createColorPicker(color(190, 190, 190)).parent(container);

  container.child(createSpan('Size'));
  const sizeSlider = createSlider(0, width, width / 2).parent(container);

  container.child(createSpan('Opacity'));
  const opacitySlider = createSlider(0, 255, 255).parent(container);

  const invertCheckbox = createCheckbox('Invert', false).parent(container);

  container.child(createSpan('X Offset'));
  const xSlider = createSlider(-width / 2, width / 2, 0).parent(container);

  container.child(createSpan('Y Offset'));
  const ySlider = createSlider(-height / 2, height / 2, 0).parent(container);

  container.child(createSpan('Rotation'));
  const rotationSlider = createSlider(0, TWO_PI, 0, 0.01).parent(container);

  return {
    shapeSelect,
    colorPicker,
    sizeSlider,
    opacitySlider,
    invertCheckbox,
    xSlider,
    ySlider,
    rotationSlider,
    pg: createGraphics(width, height)
  };
}
