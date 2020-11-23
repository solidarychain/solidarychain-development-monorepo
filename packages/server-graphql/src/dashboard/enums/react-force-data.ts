export interface Node {
  id: string;
  label: string;
  nodeVal: number;
  group: string;
}

export interface Link {
  source: string;
  target: string;
  label: number;
  group: string;
}
