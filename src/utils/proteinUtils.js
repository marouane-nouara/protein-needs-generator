/**
 * Ratios de protéines recommandés (g/kg/jour) selon l'objectif sportif.
 * Chaque objectif contient un label d'affichage, un ratio minimum et un ratio maximum.
 */
export const PROTEIN_RATIOS = {
  sedentary:   { label: "Sédentaire",                        min: 0.8, max: 1.0 },
  endurance:   { label: "Endurance",                         min: 1.2, max: 1.6 },
  maintenance: { label: "Conservation masse musculaire",     min: 1.6, max: 1.8 },
  bulk:        { label: "Prise de masse musculaire",         min: 1.8, max: 2.2 },
};

/**
 * Génère un tableau de poids répartis uniformément entre minWeight et maxWeight.
 * @param {number} minWeight - Poids minimum (kg)
 * @param {number} maxWeight - Poids maximum (kg)
 * @param {number} lines     - Nombre de lignes souhaitées
 * @returns {number[]} Tableau de poids arrondis à l'entier
 */
export function generateWeights(minWeight, maxWeight, lines) {
  // Si une seule ligne, on retourne uniquement le poids minimum
  if (lines === 1) return [minWeight];

  const step = (maxWeight - minWeight) / (lines - 1);
  return Array.from({ length: lines }, (_, i) =>
    Math.round(minWeight + step * i)
  );
}

/**
 * Calcule la plage de besoins en protéines pour un poids et un objectif donnés.
 * @param {number} weight - Poids en kg
 * @param {{ min: number, max: number }} ratio - Ratios min/max de l'objectif
 * @returns {string} Plage formatée ex: "112 – 140 g/jour"
 */
export function calculateProteinRange(weight, ratio) {
  const min = Math.round(weight * ratio.min);
  const max = Math.round(weight * ratio.max);
  return `${min} – ${max} g/jour`;
}
