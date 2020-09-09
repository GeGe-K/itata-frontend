import React from 'react';
import { ClockLoader } from "react-spinners";
import { css } from '@emotion/core'

const spinstyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: ' -25px 0 0 -25px'
}

const loaderCSS = css`
    margin-top: 150px;
`

class Spin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading : false
        }
    }
    render() {
        let { load } = this.props
        return (
            <div>
                <div style={spinstyle}>
                    <ClockLoader color='#ba54f5' size={80} loading = { load } css={loaderCSS}/>
                </div>
            </div>
        );
    }

}

export default Spin;
