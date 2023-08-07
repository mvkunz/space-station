import { useState, useEffect } from 'react';
import { fetchCoordinates } from './services';
import Coordinates from './components/Coordinates';
import ISSLocation from './components/ISSLocation';

import './App.css';


type Location = {
  latitude: number;
  longitude: number;
};

function App() {
  const [issLocation, setIssLocation] = useState<Location>({
    longitude: 0,
    latitude: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function setLocation() {
      const location = await fetchCoordinates();
      setIssLocation(location);
      setLoading(false);
    }

    if(loading) {
      setLocation();
    }

    const intervalId = setInterval(() => { // executa 1x e a cada 3segundos fará o fetch novamente. Mas, para informar quando a aplicação deve parar de executar essa função, deve ser feito o cleanup!
      setLocation();
    }, 3000);

    return() => { // essa é a função cleanup.
      clearInterval(intervalId);
    }
  }, []);

  if (loading) return <h1>🔄 Loading...</h1>;

  // No código acima, está sendo criada a função assíncrona fetchData dentro do useEffect. Essa função vai aguardar o retorno de fetchCoordinates e armazená-lo no estado do componente. Na sequência, execute fetchData.
  // Como o segundo parâmetro do hook é uma lista vazia ([]), a callback será executada apenas uma vez após a primeira renderização do componente App.

  return (
    <div className="App">
      <h1>International Space Station Location Tracker</h1>
      <Coordinates
        latitude={issLocation.latitude}
        longitude={issLocation.longitude}
      />
      <ISSLocation
        latitude={issLocation.latitude}
        longitude={issLocation.longitude}
      />
    </div>
  );
}

export default App;

// Primeiramente, crie o estado do componente, que deverá armazenar um objeto que contém as chaves latitude e longitude. Assim, crie o tipo Coordinates para indicar ao TypeScript o que se espera como valor do estado:

// ** NÃO PODE REALIZAR REQUISIÇÕES DIRETAMENTE NO CORPO DA APLICAÇÃO, PARA ISSO, DEVE UTILIZAR O USEEFFECT. Não se pode transformar a callback do useEffect em função assíncrona!