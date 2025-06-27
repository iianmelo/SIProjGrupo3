// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Grid from 'components/Grid';
import Controls from 'components/Controls';
import InfoPanel from 'components/InfoPanel';
import { GridData, Position, Node } from 'lib/types';

// Funções placeholder - A lógica real virá destes arquivos
import { generateInitialGrid } from 'lib/gridUtils';
import { aStarSearch } from 'lib/algorithms/astar';

const ALGORITHMS = [
  'A*',
  'Gulosa',
  'Custo Uniforme',
  'Largura',
  'Profundidade'
];
const GRID_SIZE = { width: 25, height: 15 };

export default function HomePage() {
  // Estado do Jogo
  const [gridData, setGridData] = useState<GridData>([]);
  const [agentPos, setAgentPos] = useState<Position | null>(null);
  const [foodPos, setFoodPos] = useState<Position | null>(null);
  const [foodCollected, setFoodCollected] = useState(0);

  // Estado da UI e da Busca
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('A*');
  const [isSearching, setIsSearching] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  // Estado da Visualização
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [frontier, setFrontier] = useState<Node[]>([]);
  const [path, setPath] = useState<Position[]>([]);
  const [pathCost, setPathCost] = useState(0);

  // Efeito para inicializar o grid na primeira renderização
  useEffect(() => {
    // A função generateInitialGrid precisa ser implementada em lib/gridUtils.ts
    // Ela deve retornar o grid e as posições iniciais válidas.
    const { grid, agentStart, foodStart } = generateInitialGrid(
      GRID_SIZE.width,
      GRID_SIZE.height
    );
    setGridData(grid);
    setAgentPos(agentStart);
    setFoodPos(foodStart);
  }, []);

  const resetSearchVisualization = () => {
    setVisited(new Set());
    setFrontier([]);
    setPath([]);
    setPathCost(0);
  };

  const handleStartSearch = () => {
    if (!agentPos || !foodPos || isSearching || isMoving) return;

    resetSearchVisualization();
    setIsSearching(true);

    // --- LÓGICA DE BUSCA (A SER IMPLEMENTADA) ---
    // Aqui você chamará a função do algoritmo selecionado.
    // A função deve retornar o histórico da busca para animação e o caminho.
    console.log(
      `Iniciando busca com ${selectedAlgorithm} de ${JSON.stringify(agentPos)} para ${JSON.stringify(foodPos)}`
    );

    // Exemplo com A* (as outras seguiriam um padrão similar)
    // A função aStarSearch retornaria { finalPath, history, cost }
    // const { finalPath, history, cost } = aStarSearch(gridData, agentPos, foodPos);

    // Por enquanto, vamos simular um resultado para ver a UI funcionando
    // TODO: Substituir esta simulação pela lógica de animação real
    setTimeout(() => {
      console.log('Busca (simulada) concluída!');
      setIsSearching(false);
      // setPath(finalPath);
      // setPathCost(cost);
      // setIsMoving(true); // Inicia a animação de movimento
    }, 2000);
  };

  const isInteractive = !isSearching && !isMoving;

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Visualizador de Algoritmos de Busca</h1>
      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div>
          <Controls
            algorithms={ALGORITHMS}
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={setSelectedAlgorithm}
            onStart={handleStartSearch}
            isInteractive={isInteractive}
          />
          <InfoPanel
            algorithm={selectedAlgorithm}
            foodCollected={foodCollected}
            pathCost={pathCost}
          />
        </div>
        <div style={{ '--grid-cols': GRID_SIZE.width } as React.CSSProperties}>
          <Grid
            grid={gridData}
            agentPos={agentPos}
            foodPos={foodPos}
            visited={visited}
            frontier={frontier}
            path={path}
          />
        </div>
      </div>
    </main>
  );
}
