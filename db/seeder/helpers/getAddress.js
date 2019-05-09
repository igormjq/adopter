import axios from 'axios';

const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/43/municipios`;

export default async () => {
  const { data } = await axios.get(url);
  
  return data.map(city => city.nome);
};