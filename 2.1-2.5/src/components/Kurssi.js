import React from 'react'

const Kurssi = ({ kurssi }) => {
  const osat = kurssi.osat.map( (osa, i) => {
    return <Osa key={i} osa={osa} />;
  });

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      {osat}
      <Yhteensa kurssi={kurssi} />
    </div>
  )
}

const Otsikko = (props) => {
  return (
    <h1>{props.kurssi.nimi}</h1>
  );
}

const Osa = (props) => {
  return (
    <p>{props.osa.nimi} {props.osa.tehtavia}</p>
  );
}

const Yhteensa = (props) => {

  const yhteensa = props.kurssi.osat.reduce( (yht, osa) => {
    return yht + osa.tehtavia;
  }, 0);

  return (
    <p>yhteensä {yhteensa} tehtävää</p>
  );
}

export default Kurssi