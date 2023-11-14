import { useState, useEffect } from "react";
import tableStyles from "../../styles/Table.module.css";

function Table() {
  const [selected, setSelected] = useState(null);
  const [actualUser, setActualUser] = useState("Gino");
  const [teamsSorted, setTeamsSorted] = useState([]);
  const [uncoveredCards, setUncoveredCards] = useState([]);
  const [msg, setMsg] = useState(null)

  const user1 = "Jugador 1"
  const [punt1, setPunt1] = useState(0)
  const user2 = "Jugador 2"
  const [punt2, setPunt2] = useState(0)

  const TEAMS = [
    "boca",
    "river",
    "sanlorenzo",
    "estudiantes",
    "racing",
    "independiente",
    "velez",
    "huracan",
  ];

  useEffect(() => {
    const len = TEAMS.length;
    const SIZES = [2, 2, 2, 2, 2, 2, 2, 2];

    const localTeams = [];
    for (let n = 0; n < len * 2; n++) {
      let res;
      do {
        res = Math.round(Math.random() * (len - 1));
      } while (SIZES[res] === 0);
      localTeams.push(TEAMS[res]);
      SIZES[res]--;
    }
    setTeamsSorted(localTeams);

    setActualUser(actualUser === user1 ? user2 : user1);
    return () => { };
  }, []);

  const uncoverCard = (id) => {
    if (msg !== null) return

    uncoveredCards.push(id)
    setUncoveredCards(uncoveredCards)
    if (selected === null) {
      setSelected(id);
      return;
    }

    if (teamsSorted[id] === teamsSorted[selected]) {
      setSelected(null);
      if (actualUser === user1) {
        const res = punt1 + 1
        setPunt1(res)
      } else {
        const res = punt2 + 1
        setPunt2(res)
      }
    } else {
      setMsg("No coincide")
      setTimeout(() => {
        uncoveredCards.pop()
        uncoveredCards.pop()
        setUncoveredCards(uncoveredCards);
        setActualUser(user1 === actualUser ? user2 : user1);
        setSelected(null);
        setMsg(null)
      }, 3000)
    }
  };

  return (
    <div className={tableStyles.main}>
      <div className={tableStyles.turn}>{`Turno de: ${actualUser}`}</div>
      <div className={tableStyles.empty} />
      <div className={tableStyles.grid}>
        {teamsSorted.map((team, i) => {
          const showCard = uncoveredCards.indexOf(i) > -1 || i === selected;
          return (
            <img className={tableStyles.box} key={i} src={!showCard ? "afa/afa.jpg" : `afa/${team}.png`} alt="Card" onClick={() => { uncoverCard(i); }} />
          );
        })}
      </div>
      <div className={tableStyles.points}>
        <div className={tableStyles.user}>
          {user1}
          <div>
            {punt1}
          </div>
        </div>
        <div className={tableStyles.user}>
          {user2}
          <div>
            {punt2}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
