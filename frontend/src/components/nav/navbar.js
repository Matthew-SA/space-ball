// import React from "react";
// import { Link } from "react-router-dom";
// import SignUpFormContainer from "../session/signup_form_container";
// import LoginFormContainer from "../session/login_form_container";

// class NavBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.logoutUser = this.logoutUser.bind(this);
//     this.getLinks = this.getLinks.bind(this);
//   }

//   logoutUser(e) {
//     e.preventDefault();
//     this.props.logout();
//   }

//   // Selectively render links dependent on whether the user is logged in
//   getLinks() {
//     if (this.props.loggedIn) {
//       return (
//         <div className="logout-button">
//           <button onClick={this.logoutUser}>Logout</button>
//         </div>
//       );
//     } else {
//       return (
//         <div className="session-buttons">
//           <div><LoginFormContainer/></div>
//           <div><SignUpFormContainer/></div>
//           {/* <Link to={"/signup"}>Signup</Link>
//           <Link to={"/login"}>Login</Link> */}
//         </div>
//       );
//     }
//   }

//   render() {
//     return (
//       <div>
//         {this.getLinks()}
//       </div>
//     );
//   }
// }

// export default NavBar;
