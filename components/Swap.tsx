import React, { useState, useEffect } from 'react';
import { Input , Popover, Radio, Modal, message } from 'antd';
import { ArrowDownOutlined, DownOutlined, SettingOutlined} from '@ant-design/icons';
import tokenList from './tokenList.json';
import { useAddress } from '@thirdweb-dev/react';

const Swap: React.FC<InputProps> = ({ value, onChange }) => {
    const address = useAddress()
    const [slippage, setSlippage] = useState(2.5);
    const [isOpen, setIsOpen]= useState(false);
    const [tokenOneAmount, setTokenOneAmount] = useState(null);
    const [tokenTwoAmount, setTokenTwoAmount] = useState(null);
    const [tokenOne, setTokenOne] = useState(tokenList[0]);
    const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
    const [changeToken, setChangeToken] = useState(1);
    const [prices, setPrices] = useState(null);
    const [txDetails, setTxDetails] = useState({
        to:null,
        data: null,
        value: null,
    })


    function handleSlippageChange(e:any) {
        setSlippage(e.target.value);
    }

    function changeAmount(e:any){
        setTokenOneAmount(e.target.value);
        if(e.target.value && prices){
            setTokenTwoAmount((e.target.value * prices.ratio).toFixed(2))
        }else{
            setTokenTwoAmount(null);
        }
    }

    function switchTokens() {
        setPrices(null);
        setTokenOneAmount(null);
        setTokenTwoAmount(null);
        const one = tokenOne;
        const two = tokenTwo;
        setTokenOne(two);
        setTokenTwo(one);
        fetchPrices(two.address, one.address);
    }

    function openModal(asset:any) {
        setChangeToken(asset);
        setIsOpen(true);
    }

    function modifyToken(i:any){
        setPrices(null);
        setTokenOneAmount(null);
        setTokenTwoAmount(null);
        if (changeToken ===1 ) {
            setTokenOne(tokenList[i]);
            fetchPrices(tokenList[i])
        }
    }


    const settings = (
        <>
         <div> Slippage Tolerance</div>
             <div>
                <Radio.Group value={slippage} onChange = {handleSlippageChange}>
                    <Radio.Button value={0.5}>0.5%</Radio.Button>
                    <Radio.Button value={2.5}>2.5%</Radio.Button>
                    <Radio.Button value={5}>5.0%</Radio.Button>
                </Radio.Group>
            </div> 
        </>
    );

    return(
        <>
          <Modal
          open= {isOpen}
          footer={null}
          onCancel={() => setIsOpen(false)}
          title='Select a token'
          >
            <div className='modalContent'>
                {tokenList?.map((e, i) =>{
                    return(
                    <div
                        className='tokenChoice'
                        key={i}
                        onClick={() => modifyToken(i)}
                        >
                        <img src={e.img} alt={e.ticker} className='tokenLogo'/>
                        <div className='tokenChoiceNames'>
                            <div className='tokenName'>{e.name}</div>
                            <div className='tokenTicker'>{e.ticker}</div> 
                        </div>  
                     </div>
                    );
                })}
            </div>
          </Modal>
          <div className='tradeBox'>
            <div className='tradeBoxHeader'>
                <h4>Swap</h4>
                <Popover
                 content={settings}
                 title='Settings'
                 trigger='click'
                 placement='bottomRight'
                >
                    <SettingOutlined className='cog' />
                </Popover>
            </div>
            <div className='inputs'>
                <Input
                 placeholder ='0'
                 type='number'
                 value={tokenOneAmount}
                 onChange= {changeAmount}
                 disabled= {!prices}
                 />
                 <Input placeholder='0' value={tokenTwoAmount} disabled={true} />
                 <div className='switchButton' onClick={switchTokens}>
                    <ArrowDownOutlined className='swithArrow'/>
                 </div>
                 <div className='assetOne' onClick={() => openModal(1)}>
                    <img src={tokenOneAmount.img} alt='assetOneLogo' className='assetLogo'/>
                    {tokenOne.ticker}
                  <DownOutlined/>
                 </div>
                 <div className='assetTwo' onClick={() => openModal(2)}>
                    <img src={tokenTwoAmount.img} alt='assetOneLogo' className='assetLogo'/>
                    {tokenTwo.ticker}
                    <DownOutlined />
                 </div>
                 <div className='swapButton' disabled={!tokenOneAmount } onClick={fetchDexSwap}>Swap</div>
            </div>
          </div>     
        </>
    );
};