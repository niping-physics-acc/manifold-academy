// Pure numerical models shared by the lesson views and their regression tests.
export function integralModel({ n = 12, k = 0, reverse = false, object = 'form' } = {}) {
  const coordinate = t => {
    const s = reverse ? 1 - t : t;
    return { x: 1 + 3 * ((1 - k) * s + k * s * s),
      derivative: (reverse ? -1 : 1) * 3 * (1 - k + 2 * k * s) };
  };
  const samples = Array.from({ length: n }, (_, i) => {
    const t = (i + 0.5) / n;
    const { x, derivative } = coordinate(t);
    const coefficient = x * (object === 'scalar' ? 1 : object === 'mass' ? Math.abs(derivative) : derivative);
    return { t, x, derivative, coefficient, left: coordinate(i / n).x, right: coordinate((i + 1) / n).x };
  });
  const sum = samples.reduce((s, p) => s + p.coefficient / n, 0);
  const exact = object === 'scalar' ? 2.5 - k / 2 : object === 'mass' ? 7.5 : (reverse ? -7.5 : 7.5);
  return { samples, sum, exact, error: Math.abs(sum - exact) };
}

export function areaModel(shear, height, swap = false) {
  const a = [2, 0], b = [shear, height];
  const u = swap ? b : a, v = swap ? a : b;
  return { u, v, determinant: u[0] * v[1] - u[1] * v[0] };
}

export function covectorModel(a, b, vx, vy) { return a * vx + b * vy; }

export function curveModel(t, reverse = false) {
  const x = reverse ? 1 - t : t, direction = reverse ? -1 : 1;
  return { x, y: x * x, vx: direction, vy: direction * 2 * x,
    coefficient: direction * 5 * x * x, cumulative: 5 / 3 * (x ** 3 - (reverse ? 1 : 0)) };
}

export function partitionModel(blend) {
  return { first: 2 / 3 + 2 * blend / 3, second: 4 / 3 - 2 * blend / 3,
    weight: x => (1 - blend) * (1 - x / 2) + blend * x / 2 };
}
