import React from 'react';
import Link from 'next/link';
import { ConnectWallet } from '@thirdweb-dev/react'

const Header = () => {
        return(
            <header>
                <div className='leftH'>
                    <img src='/Logo' className='logo'/>
                    <Link className='link' href='/'>
                        <div className='headerItem'>Swap</div>
                    </Link>
                    <Link href='/tokens'>
                    <div className='headerItem'></div>
                    </Link>
                </div>
                <div className='rightH'>
                    <div className='headerItem'>
                        <img src='/Eth' alt='eth' className='eth'/>
                        Ethereum
                    </div>
                    <div>
                        <ConnectWallet/>
                    </div>
                </div>
            </header>
        );
};

export default Header