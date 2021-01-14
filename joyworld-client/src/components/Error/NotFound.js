// import React from 'react';
// import './NotFound2.css';

// const NotFound2 = () => {
//     return (
//         <div>
//             <div class="mainbox">
//                 <div class="err">4</div>
//                 <i class="far fa-question-circle fa-spin"></i>
//                 <div class="err2">4</div>
//                 <div class="msg">Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go <a href="/">home</a> and try from there.</p></div>
//             </div>
//         </div>
//     )
// }

// export default NotFound2

import React from 'react'
import { Link } from 'react-router-dom'
import { Wrapper, Wrapper404, Number, QuestionCircle, Message } from './NotFound.styles'

const NotFound2 = () => {
    const message = 'Belki bu sayfa taşınmıştır. Yoksa silindi mi? Karantinada mı? Belki de baştan beri hiç var olmadı.'
    return (
        <Wrapper>
            <Wrapper404>
                <Number>4</Number>
                <QuestionCircle className='fa-spin'></QuestionCircle>
                <Number>4</Number>
            </Wrapper404>
            <Message>
                {message} <Link to="/"><br/>Ana Sayfa</Link>'ya gidip oradan deneyelim.
            </Message>
        </Wrapper>
    )
}

export default NotFound2

