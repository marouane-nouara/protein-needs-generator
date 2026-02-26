import { PROTEIN_RATIOS, calculateProteinRange } from "../utils/proteinUtils";

/**
 * Composant ProteinTable – Affiche le tableau des besoins en protéines
 * et propose un export CSV.
 *
 * @param {{ weights: number[], goals: string[] }} props
 */
export default function ProteinTable({ weights, goals }) {
  // Ne rien afficher si aucune donnée n'a encore été générée
  if (!weights || weights.length === 0) return null;

  /**
   * Génère et télécharge un fichier CSV à partir des données du tableau.
   */
  const exportCSV = () => {
    // En-tête CSV
    const header = ["Poids (kg)", ...goals.map((g) => PROTEIN_RATIOS[g].label)].join(",");

    // Lignes CSV
    const rows = weights.map((weight) => {
      const cells = goals.map((goal) =>
        // On entoure de guillemets pour gérer le tiret dans la valeur
        `"${calculateProteinRange(weight, PROTEIN_RATIOS[goal])}"`
      );
      return [weight, ...cells].join(",");
    });

    const csvContent = [header, ...rows].join("\n");

    // Création et déclenchement du téléchargement
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href     = url;
    link.download = "besoins_proteines.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card">
      {/* ===== En-tête avec bouton CSV ===== */}
      <div className="table-header">
        <h2>📊 Tableau des besoins</h2>
        <button className="btn-csv" onClick={exportCSV}>
          ⬇️ Exporter en CSV
        </button>
      </div>

      {/* ===== Tableau ===== */}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Poids (kg)</th>
              {goals.map((goal) => (
                <th key={goal}>{PROTEIN_RATIOS[goal].label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weights.map((weight) => (
              <tr key={weight}>
                <td>{weight} kg</td>
                {goals.map((goal) => (
                  <td key={goal}>
                    {calculateProteinRange(weight, PROTEIN_RATIOS[goal])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
