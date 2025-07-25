let planes = [
  { opacity: 10, color: '#00FF00', shape: 'circle' },
  { opacity: 50, color: '#FFFFFF', shape: 'diagonal_linear' },
  { opacity: 60, color: '#FF0000', shape: 'rectangle' }
];
let planeGraphics = [];

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('canvas-container');
  
  for (let i = 0; i < 3; i++) {
    planeGraphics[i] = createGraphics(400, 400);
  }
  
  for (let i = 1; i <= 3; i++) {
    document.getElementById(`opacity${i}`).addEventListener('input', (e) => {
      planes[i-1].opacity = e.target.value;
      document.getElementById(`opacity${i}-value`).textContent = e.target.value;
    });
    document.getElementById(`color${i}`).addEventListener('input', (e) => {
      planes[i-1].color = e.target.value;
    });
    document.getElementById(`shape${i}`).addEventListener('change', (e) => {
      planes[i-1].shape = e.target.value;
    });
  }
}

function draw() {
  background(0, 0, 0, 0);
  for (let i = 0; i < planes.length; i++) {
    let plane = planes[i];
    let r = parseInt(plane.color.slice(1, 3), 16);
    let g = parseInt(plane.color.slice(3, 5), 16);
    let b = parseInt(plane.color.slice(5, 7), 16);
    
    let pg = planeGraphics[i];
    pg.clear();
    
    switch (plane.shape) {
      case 'full':
        drawFullPlane(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'circle':
        drawCircle(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'circle_inverse':
        drawCircleInverse(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'triangle':
        drawTriangle(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'triangle_inverse':
        drawTriangleInverse(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'rectangle':
        drawRectangle(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'rectangle_inverse':
        drawRectangleInverse(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'star':
        drawStar(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'star_inverse':
        drawStarInverse(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'diamond':
        drawDiamond(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'diamond_inverse':
        drawDiamondInverse(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'half':
        drawHalfPlane(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'half_inverse':
        drawHalfPlaneInverse(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'diagonal_linear':
        drawDiagonalLinear(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
      case 'diagonal_linear_inverse':
        drawDiagonalLinearInverse(pg, r, g, b, (plane.opacity / 100) * 255);
        break;
    }
    
    image(pg, 0, 0);
  }
}