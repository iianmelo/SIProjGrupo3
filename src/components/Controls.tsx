// components/Controls.tsx
// Permite ao usuário selecionar o algoritmo e iniciar a busca
'use client';

interface ControlsProps {
  algorithms: string[];
  selectedAlgorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
  onStart: () => void;
  isInteractive: boolean; // True se o usuário pode interagir
}

export default function Controls({
  algorithms,
  selectedAlgorithm,
  onAlgorithmChange,
  onStart,
  isInteractive,
}: ControlsProps) {
  return (
    <div className="controls">
      <label htmlFor="algorithm-select">Escolha o Algoritmo:</label>
      <select
        id="algorithm-select"
        value={selectedAlgorithm}
        onChange={(e) => onAlgorithmChange(e.target.value)}
        disabled={!isInteractive}
      >
        {algorithms.map((alg) => (
          <option key={alg} value={alg}>
            {alg}
          </option>
        ))}
      </select>
      <button onClick={onStart} disabled={!isInteractive}>
        {isInteractive ? 'Iniciar Busca' : 'Buscando...'}
      </button>
    </div>
  );
}