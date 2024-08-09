interface Details {
  name: string;
  id: number;
  loading: boolean | string;
  evolution_chain: string;
  details: PokeDetails | [];
}

export interface PokeTypes {
  types: list;
  mainType: string;
  name: string;
}

export interface PokeDetails {
  types: PokeTypes | [];
}

export default Details;
