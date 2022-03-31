import React, { Component } from 'react';
import Coin from './Coin';
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2';


class CoinFlipper extends Component {
    constructor(props) {
        super(props);
        this.state = { coin: "heads", coinCount: { heads: 0, tails: 0 } }
        this.flipCoin = this.flipCoin.bind(this);
        this.countCoin = this.countCoin.bind(this);
        this.flipLoop = this.flipLoop.bind(this);
    }

    flipCoin() {
        // 0 is heads 1 is tails
        let coinState = Math.floor(Math.random() * 2);
        this.countCoin(coinState)
    }

    flipLoop(num) {
        let flipNum = num || 1;
        for (let i = 0; i < flipNum; i++) {
            this.flipCoin()
        }
    }

    countCoin(side) {
        this.setState(st => {
            return{
                coin: side === 0 ? "heads" : "tails",
                coinCount: { 
                    heads: st.coinCount.heads + (side === 0 ? 1 : 0),
                    tails: st.coinCount.tails + (side === 1 ? 1 : 0)
                }
                
            };
        })
        
    }

    render() {
        const labels = [
            'Heads',
            'Tails'
        ];

        const data = {
            labels: labels,
            datasets: [{
                label: 'Coin Flip Breakdown',
                data: [this.state.coinCount.heads, this.state.coinCount.tails],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                barPercentage: 0.5,
            }]
        };

        let headCount = this.state.coinCount.heads;
        let tailsCount = this.state.coinCount.tails;
        let isZero = headCount === 0 && tailsCount === 0;
        let percentage = tailsCount > headCount ? `${(tailsCount / (tailsCount + headCount) * 100).toFixed(3)}% Tails` : `${(headCount / (tailsCount + headCount) * 100).toFixed(3)}% Heads`

        return (

            <div className="CoinFlipper">
                <h1>Coin Flipper</h1>
                <Coin side={this.state.coin} />

                <div className='flip-message'>
                    Out of {headCount + tailsCount} flips {headCount} have been heads and {tailsCount} have been tails.
                </div>
                
                <div className='flip-percentage'>
                    {isZero ? 'Flip a Coin' : percentage}
                </div>

                <button className="btn btn-primary" onClick={() => this.flipLoop(1)}>Flip 1</button>
                <button className="btn btn-primary" onClick={() => this.flipLoop(10)}>Flip 10</button>
                <button className="btn btn-primary" onClick={() => this.flipLoop(20)}>Flip 20</button>
                <button className="btn btn-primary" onClick={() => this.flipLoop(40)}>Flip 40</button>
                <button className="btn btn-primary" onClick={() => this.flipLoop(100)}>Flip 100</button>
                <button className="btn btn-primary" onClick={() => this.flipLoop(1000)}>Flip 1000</button>

                <Bar data={data} />

            </div>
        );
    }
}

export default CoinFlipper;