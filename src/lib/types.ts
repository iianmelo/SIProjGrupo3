// Boa prática definir tipos que serão utilizados em todo o projeto

export type TerrainType = 'sand' | 'mud' | 'water' | 'obstacle';

export interface Cell {
  type: TerrainType;
  cost: number;
}

export type GridData = Cell[][];

export interface Position {
  x: number;
  y: number;
}

// Representa um nó na busca, guardando a posição, custo e heurística
export interface Node {
  position: Position;
  parent: Node | null;
  g: number; // Cost from start to this node
  h: number; // Heuristic cost to goal
  f: number; // Total cost (g + h)
}
