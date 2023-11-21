import { useState, useEffect } from "react";
import tableStyles from "../../styles/Table.module.css";
import UsersNamesModal from "./usersNamesModal";

function Table() {
  const [selected, setSelected] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("Player 1");
  const [teamsSorted, setTeamsSorted] = useState([]);
  const [uncoveredCards, setUncoveredCards] = useState([]);
  const [msg, setMsg] = useState(null)

  const [user1, setUser1] = useState("Player 1")
  const [scorePlayer1, setScorePlayer1] = useState(0)
  const [user2, setUser2] = useState("Player 2")
  const [scorePlayer2, setScorePlayer2] = useState(0)

  useEffect(() => {
    const initTable = async () => {
      const res = await fetch("https://apiv2.allsportsapi.com/football/?met=Teams&leagueId=44&APIkey=c1a97f182f07e0427a17922928eef65853c4f83d5a463c10573c6f59815d9dd1")
      const teamsResult = await res.json()
      var TEAMS = teamsResult.result
      TEAMS.forEach(team => {
        console.log(team.team_name)
      });
      const len = TEAMS.length;
      const SIZES = [];
      for (let i = 0; i < len/2; i++) {
        SIZES.push(2)
      }

      const sortedTeams = [];
      for (let n = 0; n < len * 2; n++) {
        let res;
        do {
          res = Math.round(Math.random() * (len - 1));
        } while (SIZES[res] === 0);
        sortedTeams.push(TEAMS[res]);
        SIZES[res]--;
      }
      setTeamsSorted(sortedTeams);

      setCurrentPlayer(currentPlayer === user1 ? user2 : user1);
    }
    initTable()
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
      if (currentPlayer === user1) {
        const res = scorePlayer1 + 1
        setScorePlayer1(res)
      } else {
        const res = scorePlayer2 + 1
        setScorePlayer2(res)
      }
    } else {
      setMsg("No coincide")
      setTimeout(() => {
        uncoveredCards.pop()
        uncoveredCards.pop()
        setUncoveredCards(uncoveredCards);
        setCurrentPlayer(user1 === currentPlayer ? user2 : user1);
        setSelected(null);
        setMsg(null)
      }, 3000)
    }
  };

  return (
    <div className={tableStyles.main}>

      <div className={tableStyles.turn}>
        {`Turno de: ${currentPlayer == user1 ? user1 : user2}`} <br />
        <UsersNamesModal setUser1={setUser1} user1={user1} setUser2={setUser2} user2={user2} />
      </div>
      <div className={tableStyles.points}>
        <div className={tableStyles.user}>
          {user1}
          <div>
            {scorePlayer1}
          </div>
        </div>
        <div className={tableStyles.user}>
          {user2}
          <div>
            {scorePlayer2}
          </div>
        </div>
      </div>
      <div className={tableStyles.grid}>
        {teamsSorted.map((team, i) => {
          const showCard = uncoveredCards.indexOf(i) > -1 || i === selected;
          return (
            <img className={tableStyles.box} key={i} src={!showCard ? "afa/afa.jpg" : team.team_logo} alt="Card" onClick={() => { uncoverCard(i); }} />
          );
        })}
      </div>
      <div className={tableStyles.empty} />
    </div>
  );
}

export default Table;
