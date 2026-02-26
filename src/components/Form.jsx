import { useState } from "react";
import { PROTEIN_RATIOS } from "../utils/proteinUtils";

/**
 * Composant Form – Permet à l'utilisateur de configurer les paramètres
 * de génération du tableau (objectifs, poids min/max, nombre de lignes).
 *
 * @param {{ onGenerate: Function }} props
 */
export default function Form({ onGenerate }) {
  // Objectifs sélectionnés (tableau de clés)
  const [selectedGoals, setSelectedGoals] = useState([]);

  // Paramètres numériques
  const [minWeight, setMinWeight] = useState(50);
  const [maxWeight, setMaxWeight] = useState(100);
  const [lines, setLines]         = useState(6);

  // Message d'erreur de validation
  const [error, setError] = useState("");

  /**
   * Ajoute ou retire un objectif de la sélection.
   * @param {string} goal - Clé de l'objectif (ex: "sedentary")
   */
  const toggleGoal = (goal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal)
        ? prev.filter((g) => g !== goal)
        : [...prev, goal]
    );
  };

  /**
   * Valide les champs et déclenche la génération si tout est correct.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation : au moins un objectif sélectionné
    if (selectedGoals.length === 0) {
      setError("Veuillez sélectionner au moins un objectif.");
      return;
    }

    // Validation : valeurs strictement positives
    if (minWeight <= 0 || maxWeight <= 0 || lines <= 0) {
      setError("Toutes les valeurs doivent être strictement positives.");
      return;
    }

    // Validation : poids min < poids max
    if (minWeight >= maxWeight) {
      setError("Le poids minimum doit être inférieur au poids maximum.");
      return;
    }

    // Validation : nombre de lignes raisonnable
    if (lines > 100) {
      setError("Le nombre de lignes ne peut pas dépasser 100.");
      return;
    }

    // Tout est valide : on efface l'erreur et on génère
    setError("");
    onGenerate({ selectedGoals, minWeight, maxWeight, lines });
  };

  return (
    <div className="card">
      <h2>⚙️ Paramètres</h2>

      <form onSubmit={handleSubmit}>
        {/* ===== Sélection des objectifs ===== */}
        <div className="checkbox-group">
          <p>Objectifs sportifs :</p>
          <div className="checkboxes">
            {Object.entries(PROTEIN_RATIOS).map(([key, { label }]) => (
              <label key={key} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={selectedGoals.includes(key)}
                  onChange={() => toggleGoal(key)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* ===== Paramètres numériques ===== */}
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="minWeight">Poids minimum (kg)</label>
            <input
              id="minWeight"
              type="number"
              min={1}
              value={minWeight}
              onChange={(e) => setMinWeight(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="maxWeight">Poids maximum (kg)</label>
            <input
              id="maxWeight"
              type="number"
              min={1}
              value={maxWeight}
              onChange={(e) => setMaxWeight(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lines">Nombre de lignes</label>
            <input
              id="lines"
              type="number"
              min={1}
              max={100}
              value={lines}
              onChange={(e) => setLines(Number(e.target.value))}
            />
          </div>
        </div>

        {/* ===== Message d'erreur ===== */}
        {error && <p className="error-msg">⚠️ {error}</p>}

        {/* ===== Bouton de génération ===== */}
        <button type="submit" className="btn-generate">
          Générer le tableau
        </button>
      </form>
    </div>
  );
}
