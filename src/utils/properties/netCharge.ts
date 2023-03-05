export function netCharge(acid, base, pH) {
  let charge = 0;
  for (const key in acid) {
    if (acid[key].count > 0) {
      charge += -acid[key].count / (1 + 10 ** (acid[key].pk - pH));
    }
  }

  for (const key in base) {
    if (base[key].count > 0) {
      charge += base[key].count / (1 + 10 ** (pH - base[key].pk));
    }
  }
  charge = charge.toFixed(3);
  return charge;
}
