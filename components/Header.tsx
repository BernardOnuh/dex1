import React from 'react';
import Link from 'next/link';
import { ConnectWallet } from '@thirdweb-dev/react'

const Header = () => {
        return(
            <header>
                <div>
                <div className='leftH'>
                </div>
                <div className='rightH'>
                <Link className='link' href='/'>
                    <div className='headerItem'>Swap</div>
                    </Link>

                    <div className='headerItem'>
                        <img src='/eth.svg' alt='eth' className='eth'/>
                        Ethereum
                    </div>
                    <div>
                        <ConnectWallet/>
                    </div>
                </div>
                </div>
            </header>
        );
};

export default Header