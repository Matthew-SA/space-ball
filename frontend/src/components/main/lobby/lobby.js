import React from 'react' 
import { Link } from 'react-router-dom';
import NavBarContainer from "../navbar/navbar_container";

class Lobby extends React.Component {
    constructor(props) {
        super(props)
        this.socket = this.props.location.socket
        this.room = this.props.location.room
    }
    componentDidMount() {
        this.socket.emit('enter-room', this.room)
    }
    render() {
        return (
            <div className="homepage-container">
                <div className="lobby-container">
                    <div className="lobby-content">
                        <div className="play-container">
                            <div className="instructions">
                                <br />
                                You are in lobby #[xxxx] <br />
                                There are [x] other players <br />
                                <br />
                            </div>
                            <Link to={{
                                pathname: "/game",
                                room: this.room,
                                socket: this.socket
                            }}>
                                <div className="play">Start Game</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Lobby;