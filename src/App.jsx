import { useState } from "react";
import Form from "./components/Form";
import ProteinTable from "./components/ProteinTable";
import { generateWeights } from "./utils/proteinUtils";

/**
 * Composant racine de l'application.
 * Gère l'état global : liste des poids et objectifs sélectionnés.
 */
export default function App() {
  // Poids générés à afficher dans le tableau
  const [weights, setWeights] = useState([]);

  // Objectifs sélectionnés par l'utilisateur
  const [goals, setGoals] = useState([]);

  /**
   * Reçoit les paramètres du formulaire, génère les poids et met à jour l'état.
   * @param {{ selectedGoals: string[], minWeight: number, maxWeight: number, lines: number }} params
   */
  const handleGenerate = ({ selectedGoals, minWeight, maxWeight, lines }) => {
    const generatedWeights = generateWeights(minWeight, maxWeight, lines);
    setWeights(generatedWeights);
    setGoals(selectedGoals);
  };

  return (
    <div className="app-container">
      {/* ===== En-tête ===== */}
      <header className="app-header">
        <h1>🥩 Générateur de besoins en protéines</h1>
        <p>Calculez dynamiquement vos besoins journaliers selon votre poids et votre objectif sportif</p>
      </header>

      {/* ===== Formulaire de paramétrage ===== */}
      <Form onGenerate={handleGenerate} />

      {/* ===== Tableau des résultats (affiché après génération) ===== */}
      <ProteinTable weights={weights} goals={goals} />
    </div>
  );
}
