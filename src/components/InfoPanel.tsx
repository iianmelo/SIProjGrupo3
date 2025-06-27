// components/InfoPanel.tsx
// Componente exibindo informações que recebe
'use client';

interface InfoPanelProps {
  algorithm: string;
  foodCollected: number;
  pathCost: number;
}

export default function InfoPanel({
  algorithm,
  foodCollected,
  pathCost
}: InfoPanelProps) {
  return (
    <div className="info-panel">
      <h2>Painel de Controle</h2>
      <p>
        <strong>Algoritmo:</strong> {algorithm}
      </p>
      <p>
        <strong>Comidas Coletadas:</strong> {foodCollected}
      </p>
      <p>
        <strong>Custo do Caminho:</strong> {pathCost > 0 ? pathCost : 'N/A'}
      </p>
    </div>
  );
}
