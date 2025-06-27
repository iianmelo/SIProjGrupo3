// components/Grid.tsx
// Este é o componente visual mais importante. Ele renderiza o mapa e todos os seus estados.
'use client';

import { GridData, Position, Node } from 'lib/types';
import styles from 'styles/Grid.module.css';

interface GridProps {
  grid: GridData;
  agentPos: Position | null;
  foodPos: Position | null;
  visited: Set<string>; // "x,y"
  frontier: Node[];
  path: Position[];
}

// Função auxiliar para criar uma chave única a partir da posição
const posToKey = (pos: Position) => `${pos.x},${pos.y}`;

export default function Grid({
  grid,
  agentPos,
  foodPos,
  visited,
  frontier,
  path
}: GridProps) {
  if (!grid.length) {
    return <div>Carregando grid...</div>;
  }

  // Crie conjuntos de chaves para busca rápida de O(1)
  const frontierKeys = new Set(frontier.map((node) => posToKey(node.position)));
  const pathKeys = new Set(path.map(posToKey));

  return (
    <div className={styles.gridContainer}>
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {row.map((cell, colIndex) => {
            const currentPosKey = `${colIndex},${rowIndex}`;
            const isAgent =
              agentPos && agentPos.x === colIndex && agentPos.y === rowIndex;
            const isFood =
              foodPos && foodPos.x === colIndex && foodPos.y === rowIndex;

            // Determina a classe CSS com base no estado da célula
            const cellClasses = [
              styles.cell,
              styles[`cell-${cell.type}`], // Estilo do terreno
              isAgent ? styles.agent : '',
              isFood ? styles.food : '',
              pathKeys.has(currentPosKey) ? styles.path : '',
              visited.has(currentPosKey) ? styles.visited : '',
              frontierKeys.has(currentPosKey) ? styles.frontier : ''
            ].join(' ');

            return <div key={colIndex} className={cellClasses}></div>;
          })}
        </div>
      ))}
    </div>
  );
}
