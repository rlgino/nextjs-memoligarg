import { useState } from "react";
import modalStyles from "../../styles/Table.module.css";

function UsersNamesModal({ user1, setUser1, user2, setUser2 }) {

    const [showedModal, setShowedModal] = useState(false)

    return (<>
        <button id="myBtn" onClick={(e) => setShowedModal(true)}>Change players name</button>

        <div id="myModal" className={`${modalStyles.modal} ${showedModal ? modalStyles.displayBlock : modalStyles.displayNone}`}>
            <div className={modalStyles.modalContent}>
                <span className={modalStyles.close} onClick={(e) => setShowedModal(false)}>&times;</span>
                <div className={modalStyles.playerForm}>
                    <label>Player 1:</label><input type="text" onChange={e => setUser1(e.target.value)} value={user1} /><br />
                    <label>Player 2:</label><input type="text" onChange={e => setUser2(e.target.value)} value={user2} /><br />
                    <button type="button" onClick={(e) => setShowedModal(false)}>Close</button>
                </div>
            </div>

        </div>
    </>);
}

export default UsersNamesModal;