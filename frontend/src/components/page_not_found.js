import React from "react";
import {connect} from "react-redux";
import { Route, Redirect, withRouter, Link } from "react-router-dom";

class PageNotFound extends React.Component{

  componentDidMount(){   
    setTimeout(() => {
      this.props.history.push("/");
    }, 5000);
  }

  render(){
    return (
      <div className="homepage-container">
        <h1 className="">You've reached a universe that does not exist!</h1>
        <Link className="lobby-container" to="/">
          Redirecting back to our universe (or click here!)...
        </Link>
      </div>
    );
  }
}

export default withRouter(PageNotFound);

