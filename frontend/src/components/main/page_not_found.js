import React from "react";
// import {connect} from "react-redux";
import { withRouter, Link } from "react-router-dom";

class PageNotFound extends React.Component{

  componentDidMount(){   
    // automatically redirect them (causes a edge case bug if the user tries to play too fast)
    // setTimeout(() => {
    //   this.props.history.push("/");
    // }, 4000);
  }

  render(){
    return (
      <div className="homepage-container">
        <h1 className="intro-title">You've reached a universe that does not exist!</h1>
        <Link className="lobby-container" to="/">
          {/* <h2>Redirecting back to our universe (or click here!)...</h2> */}
          <h2>Return to our universe (click here!)</h2>
        </Link>
      </div>
    );
  }
}

export default withRouter(PageNotFound);

