import { GridData, Cell, Position, TerrainType } from './types';

// Define as propriedades de cada terreno, incluindo a probabilidade de geração.
// A soma das probabilidades deve ser 1.
const TERRAIN_RULES: {
  type: TerrainType;
  cost: number;
  probability: number;
}[] = [
  { type: 'obstacle', cost: Infinity, probability: 0.2 }, // 20% de chance de ser um obstáculo
  { type: 'water', cost: 10, probability: 0.15 }, // 15% de chance de ser água
  { type: 'mud', cost: 5, probability: 0.25 }, // 25% de chance de ser atoleiro
  { type: 'sand', cost: 1, probability: 0.4 } // 40% de chance de ser areia
];

/**
 * Gera um novo grid aleatório com diferentes tipos de terreno e posiciona
 * o agente e a comida em locais válidos.
 *
 * @param width A largura do grid.
 * @param height A altura do grid.
 * @returns Um objeto contendo o grid gerado e as posições iniciais do agente e da comida.
 */
export function generateInitialGrid(
  width: number,
  height: number
): {
  grid: GridData;
  agentStart: Position;
  foodStart: Position;
} {
  const grid: GridData = [];
  const validPositions: Position[] = [];

  // 1. Gera o grid com terrenos aleatórios
  for (let y = 0; y < height; y++) {
    const row: Cell[] = [];
    for (let x = 0; x < width; x++) {
      let randomValue = Math.random();
      let cumulativeProbability = 0;
      let chosenCell: Cell | null = null;

      // Seleciona o terreno com base na probabilidade
      for (const terrain of TERRAIN_RULES) {
        cumulativeProbability += terrain.probability;
        if (randomValue < cumulativeProbability) {
          chosenCell = { type: terrain.type, cost: terrain.cost };
          break;
        }
      }

      // Garante que uma célula seja sempre escolhida (fallback para a última)
      if (!chosenCell) {
        const lastTerrain = TERRAIN_RULES[TERRAIN_RULES.length - 1];
        chosenCell = { type: lastTerrain.type, cost: lastTerrain.cost };
      }

      row.push(chosenCell);

      // 2. Adiciona a posição à lista de locais válidos se não for um obstáculo
      if (chosenCell.type !== 'obstacle') {
        validPositions.push({ x, y });
      }
    }
    grid.push(row);
  }

  // 3. Verifica se há locais suficientes para o agente e a comida
  if (validPositions.length < 2) {
    // Em um caso raro de um mapa quase todo de obstáculos, geramos um erro claro.
    // Numa aplicação real, poderíamos tentar gerar o mapa novamente.
    throw new Error(
      'Não foi possível encontrar posições válidas suficientes para o agente e a comida. Tente um grid maior ou com menos obstáculos.'
    );
  }

  // 4. Escolhe posições aleatórias e distintas para o agente e a comida

  // Posição do Agente
  const agentIndex = Math.floor(Math.random() * validPositions.length);
  const agentStart = validPositions[agentIndex];

  // Remove a posição do agente da lista para garantir que a comida não apareça no mesmo lugar
  validPositions.splice(agentIndex, 1);

  // Posição da Comida
  const foodIndex = Math.floor(Math.random() * validPositions.length);
  const foodStart = validPositions[foodIndex];

  return { grid, agentStart, foodStart };
}
