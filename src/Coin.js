import React, { Component } from 'react';
import heads from "./heads.png";
import tails from "./tails.png";

class Coin extends Component {
    render() { 
        var side = (this.props.side === "heads" ? heads : tails);
        return (
            <div className="Coin">
                <img src={side} alt={this.props.side} />
            </div>
        );
    }
}
 
export default Coin;