import React from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import NavBarContainer from '../navbar/navbar_container';

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.socket = io();
    }

    componentDidMount() {
        this.props.fetchInventory();
    }

    serverRow(server) {
        return (
            <li>
                <Link to={{
                    pathname: "/room",
                    room: 1,
                    numPlayers: 1,
                    socket: this.socket,
                    user: this.props.user,
                    gameoptions: this.props.gameoptions
                }}><div className="server-list">
                    <div className="server-column"># {server.room}</div>
                    <div className="server-column">{server.numPlayers} Players</div>
                </div>
                </Link>
            </li>
        )
    }

    render() {
        const servers = [
            {room: 1,
            numPlayers: 2},
            {room: 2,
            numPlayers: 2}
        ]
        return (
            <div className="mainpage-container">
                <NavBarContainer />
                    <div className="lobby-content game-lobby">
                        <div className="box">
                            <div>Room List</div>
                            <div className="server-list">
                                <div>Room</div>
                                <div>Players</div>
                            </div>
                            <div>
                                <ul>
                                    {servers.map(server => (
                                        this.serverRow(server)))}
                                </ul>
                            </div>
                        <Link to={{
                            pathname: "/room",
                            room: 1,
                            numPlayers: 1,
                            socket: this.socket,
                            user: this.props.user,
                            gameoptions: this.props.gameoptions
                        }}><div>Create Room</div></Link>
                        </div>

                        <div className="box">
                            <div className="title">How To Play:</div>
                            <div className="instructions">Push the ball towards the oppenent's goal. <br />
                                Score by getting the ball into the goal. <br />
                                Move your ship with WASD. <br />
                                First to 10 points wins. <br />
                            </div>
                        </div>


                        <div className="buy-button" onClick={this.handleClick}>Go Back</div>
                        <Link to={{
                            pathname: "/room",
                            room: 1,
                            numPlayers: 1,
                            socket: this.socket,
                            user: this.props.user,
                            gameoptions: this.props.gameoptions
                        }}><div className="buy-button">Room 1</div></Link>
                        <Link to={{
                            pathname: "/room",
                            room: 1,
                            numPlayers: 1,
                            socket: this.socket,
                            user: this.props.user,
                            gameoptions: this.props.gameoptions
                        }}><div className="buy-button">Room 1.5</div></Link>
                    </div>
            </div>
        );

    }

};

export default Play;