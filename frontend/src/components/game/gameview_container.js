import { connect } from "react-redux";

import GameView from "./gameview";

const mapStateToProps = state => ({
    user: state.session.user,
});

export default connect(mapStateToProps, null)(GameView);
