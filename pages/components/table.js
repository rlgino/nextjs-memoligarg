import { useState, useEffect } from "react";
import tableStyles from "../../styles/Table.module.css";

function Table() {
  const [selected, setSelected] = useState(null);
  const [actualUser, setActualUser] = useState("Player 1");
  const [teamsSorted, setTeamsSorted] = useState([]);
  const [uncoveredCards, setUncoveredCards] = useState([]);
  const [msg, setMsg] = useState(null)
  const [showedModal, setShowedModal] = useState(false)

  const [user1, setUser1] = useState("Player 1")
  const [punt1, setPunt1] = useState(0)
  const [user2, setUser2] = useState("Player 2")
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

  const showModal = (e) => {
    setShowedModal(true)
  }

  const hideModal = (e) => {
    setShowedModal(false)
  }

  return (
    <div className={tableStyles.main}>

      <div id="myModal" className={`${tableStyles.modal} ${showedModal ? tableStyles.displayBlock : tableStyles.displayNone}`}>
        <div className={tableStyles.modalContent}>
          <span className={tableStyles.close} onClick={(e) => hideModal(e)}>&times;</span>
          <div className={tableStyles.playerForm}>
            <label>Player 1:</label><input type="text" onChange={e => setUser1(e.target.value)} value={user1} /><br />
            <label>Player 2:</label><input type="text" onChange={e => setUser2(e.target.value)} value={user2} /><br />
            <button type="button" onClick={hideModal}>Close</button>
          </div>
        </div>

      </div>

      <div className={tableStyles.turn}>
        {`Turno de: ${actualUser == user1 ? user1 : user2}`} <br />
        <button id="myBtn" onClick={(e) => showModal(e)}>Change players name</button>
      </div>
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
