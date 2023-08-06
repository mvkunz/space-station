import { useState, useEffect } from 'react';
import { fetchCoordinates } from './services';

type Coordinates = {
  latitude: number;
  longitude: number;
};

function App() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchCoordinates();
      setCoordinates({ latitude: data.latitude, longitude: data.longitude });
    }
    fetchData();
  }, []);
  // No código acima, está sendo criada a função assíncrona fetchData dentro do useEffect. Essa função vai aguardar o retorno de fetchCoordinates e armazená-lo no estado do componente. Na sequência, execute fetchData.
  // Como o segundo parâmetro do hook é uma lista vazia ([]), a callback será executada apenas uma vez após a primeira renderização do componente App.

  return (
    <>
      <h1>International Space Station Location Tracker</h1>
      {coordinates && (
        <>
          <h2>{`Latitude: ${coordinates.latitude}`}</h2>
          <h2>{`Longitude: ${coordinates.longitude}`}</h2>
        </>
      )}
    </>
  );
}

export default App;

// Primeiramente, crie o estado do componente, que deverá armazenar um objeto que contém as chaves latitude e longitude. Assim, crie o tipo Coordinates para indicar ao TypeScript o que se espera como valor do estado:

// ** NÃO PODE REALIZAR REQUISIÇÕES DIRETAMENTE NO CORPO DA APLICAÇÃO, PARA ISSO, DEVE UTILIZAR O USEEFFECT. Não se pode transformar a callback do useEffect em função assíncrona!