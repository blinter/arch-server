import React, { Component } from "react";


const App = () => {

  const [hora, setHora] = React.useState<number>()

  return (
    <div>
      <h1> Millesegundos atuais APP </h1>
      <button onClick={() => {
        setHora(new Date().getTime())
      }}>Ver millesegundos</button>
      <h1>{hora || "Não tem hora ainda!"}</h1>
    </div>
  );
}

export default App;