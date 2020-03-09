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
    this.user = this.props.user === 'Guest' ? 'Guest' : this.props.user.username
  }

  componentDidMount() {
    this.props.fetchInventory();
    this.socket.emit('enter-room', 'lobby')
    this.socket.on('update-gamelist', data => {
      this.setState({servers: data})
    })
    this.socket.emit('request-gamelist')
  }

  componentWillUnmount() {
    this.socket.emit('leave-room', 'lobby')
  }

  render() {
    const servers = this.state.servers

    return (
      <div className="mainpage-container">
        <NavBarContainer />
        <div className="lobby-content game-lobby">
          <div className="box">
            <div className="server-list-header">
              Room List
            </div>

            <div className="server-list">
              <div className="server-columns">
              <div>Room</div>
              <div>Players</div>
              </div>
              {servers.length > 0 ? (servers.map((server, i) => (
                <ServerIndexItem
                className="server"
                key={server}
                pathname="/room"
                room={server}
                socket={this.socket}
                user={this.props.user}
                gameoptions={this.props.gameoptions}
                />
                ))
              ) : (
                <div className="empty-server">
                  There are no active rooms - create your own!
                </div>
              )}
            </div>

            <Link to={{
              pathname: "/room",
              room: this.state.servers.length <= 0 ? 1 : parseInt(
                      this.state.servers[this.state.servers.length - 1]) + 1,
              socket: this.socket,
              user: this.props.user,
              gameoptions: this.props.gameoptions}}>
              <div className="create-button">
                Create Room
              </div>
            </Link>

          </div>
        </div>
      </div>
    );
  }
};

export default Play;