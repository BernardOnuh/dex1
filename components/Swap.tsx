import React, { useState, useEffect } from 'react';
import { Input , Popover, Radio, Modal, message } from 'antd';
import { ArrowDownOutlined, DownOutlined, SettingOutlined} from '@ant-design/icons';
import tokenList from './tokenList.json';
import axios from 'axios'
//import { useAddress } from '@thirdweb-dev/react';
//import { useSendTransaction, useWaitForTransaction, useAccount } from "wagmi";

const Swap = () =>{
    const [slippage, setSlippage] = useState(2.5);
    const [isOpen, setIsOpen]= useState(false);
    //const [messageApi, contextHolder] = message.useMessage();
    const [tokenOneAmount, setTokenOneAmount] = useState('');
    const [tokenTwoAmount, setTokenTwoAmount] = useState('');
    const [tokenOne, setTokenOne] = useState(tokenList[0]);
    const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
    const [changeToken, setChangeToken] = useState(1);
    const [prices, setPrices] = useState(null);
    {/*const [txDetails, setTxDetails] = useState({
        to:null,
        data: null,
        value: null,
    })

    const {data, sendTransaction} = useSendTransaction({
        request: {
          from: address,
          to: String(txDetails.to),
          data: String(txDetails.data),
          value: String(txDetails.value),
        }
      });
    
      const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
      })*/}

    function handleSlippageChange(e:any) {
        setSlippage(e.target.value);
    }

    function changeAmount(e:any){
        setTokenOneAmount(e.target.value);
        if(e.target.value && prices){
            setTokenTwoAmount(Number((e.target.value * prices.ratio)).toFixed(2))
        }else{
            setTokenTwoAmount('');
        }
    }

    function switchTokens() {
        setPrices(null);
        setTokenOneAmount('');
        setTokenTwoAmount('');
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
        setTokenOneAmount('');
        setTokenTwoAmount('');
        if (changeToken ===1 ) {
            setTokenOne(tokenList[i]);
            fetchPrices(tokenList[i].address, tokenTwo.address)
        } else {
            setTokenTwo(tokenList[i]);
            fetchPrices(tokenOne.address, tokenList[i].address)
        }
        setIsOpen(false);
    }

    async function fetchPrices(
        one=tokenOne.address, 
        two=tokenTwo.address
        ){
        const res = await axios.get(`/api/server`, {
            params: {addressOne: one, addressTwo: two}
        })
        
        setPrices(res.data)
    }

    useEffect(()=>{

        fetchPrices(tokenList[0].address, tokenList[1].address)
    }, [])

    {/*async function fetchDexSwap(){

        const allowance = await axios.get(`https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`)
      
        if(allowance.data.allowance === "0"){
    
          const approve = await axios.get(`https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenOne.address}`)
    
          setTxDetails(approve.data);
          console.log("not approved")
          return
    
        }
    
        const tx = await axios.get(
          `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${tokenOne.address}&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(tokenOne.decimals+tokenOneAmount.length, '0')}&fromAddress=${address}&slippage=${slippage}`
        )
    
        let decimals = Number(`1E${tokenTwo.decimals}`)
        setTokenTwoAmount((Number(tx.data.toTokenAmount)/decimals).toFixed(2));
    
        setTxDetails(tx.data.tx);
      
      }

      useEffect(()=>{

        if(txDetails.to && isConnected){
          sendTransaction();
        }
    }, [txDetails])
  
    useEffect(()=>{
  
      messageApi.destroy();
  
      if(isLoading){
        messageApi.open({
          type: 'loading',
          content: 'Transaction is Pending...',
          duration: 0,
        })
      }    
  
    },[isLoading])
  
    useEffect(()=>{
      messageApi.destroy();
      if(isSuccess){
        messageApi.open({
          type: 'success',
          content: 'Transaction Successful',
          duration: 1.5,
        })
      }else if(txDetails.to){
        messageApi.open({
          type: 'error',
          content: 'Transaction Failed',
          duration: 1.50,
        })
      }
  
  
    },[isSuccess])
*/}

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
                 value= {tokenOneAmount}
                 onChange= {changeAmount}
                 disabled= {!prices}
                 />
                 <Input placeholder='0' value={tokenTwoAmount} disabled={true} />
                 <div className='switchButton' onClick={switchTokens}>
                    <ArrowDownOutlined className='swithArrow'/>
                 </div>
                 <div className='assetOne' onClick={() => openModal(1)}>
                    <img src={tokenOne.img} alt='assetOneLogo' className='assetLogo'/>
                    {tokenOne.ticker}
                  <DownOutlined/>
                 </div>
                 <div className='assetTwo' onClick={() => openModal(2)}>
                    <img src={tokenTwo.img} alt='assetOneLogo' className='assetLogo'/>
                    {tokenTwo.ticker}
                    <DownOutlined />
                 </div>
                 <div className='swapButton' 
                        //onClick={fetchDexSwap}
                  >
                    Swap</div>
            </div>
          </div>     
        </>
    );
};

export default Swap;