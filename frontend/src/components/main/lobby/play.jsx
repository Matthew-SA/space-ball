import React from "react";
import { Link } from "react-router-dom";
import io from 'socket.io-client';
import NavBarContainer from '../navbar/navbar_container';
import ServerIndexItem from './server_index_item';

class Play extends React.Component {
    constructor(props) {
        super(props);
        this.socket = io();
        this.state = {servers: []}
    }

    componentDidMount() {
        this.props.fetchInventory();
        this.socket.on('send-gamelist', data => {
            this.setState({servers: data})
        })
        this.socket.emit('request-gamelist')
    }

    componentWillUnmount() {
        this.socket.emit('leave-lobby')
    }

    // serverRow(server) {
    //     return (
    //         <li>
    //             <Link to={{
    //                 pathname: "/room",
    //                 room: server,
    //                 numPlayers: 1,
    //                 socket: this.socket,
    //                 user: this.props.user,
    //                 gameoptions: this.props.gameoptions
    //             }}><div className="server-list">
    //                 <div className="server-column"># { server }</div>
    //                 <div className="server-column"> ??? Players</div>
    //             </div>
    //             </Link>
    //         </li>
    //     )
    // }

    render() {
        const servers = this.state.servers

        return (
          <div className="mainpage-container">
            <NavBarContainer />
            <div className="lobby-content game-lobby">
              <div className="box">
                <div className="server-list-header">Room List</div>

                <div className="server-list">
                  <div className="server-columns">
                    <div>Room</div>
                    <div>Players</div>
                  </div>
                  {servers.length > 0 ? (
                    servers.map((server, i) => (
                      <div className="server">
                        <ServerIndexItem
                          key={i}
                          pathname="/room"
                          room={server}
                          numPlayers={1}
                          socket={this.socket}
                          user={this.props.user}
                          gameoptions={this.props.gameoptions}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="empty-server">There are no active rooms - create your own!</div>
                  )}
                </div>

                <Link
                  to={{
                    pathname: "/room",
                    room:
                      this.state.servers.length <= 0
                        ? 1
                        : parseInt(
                            this.state.servers[this.state.servers.length - 1]
                          ) + 1,
                    numPlayers: 1,
                    socket: this.socket,
                    user: this.props.user,
                    gameoptions: this.props.gameoptions
                  }}
                >
                  <div className="create-button">Create Room</div>
                </Link>
              </div>
              {/* 
                        <div className="box">
                            <div className="title">How To Play:</div>
                            <div className="instructions">Push the ball towards the oppenent's goal. <br />
                                Score by getting the ball into the goal. <br />
                                Move your ship with WASD. <br />
                                First to 10 points wins. <br />
                            </div>
                        </div>
                        <div className="buy-button" onClick={this.handleClick}>Go Back</div>
                    </div>
                {/* <button onClick={() => this.socket.emit('test', 'hello')}></button> */}
                        </div> */}

              <div className="buy-button" onClick={this.handleClick}>
                Go Back
              </div>
            </div>
        );

    }

};

export default Play;