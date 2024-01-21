import React, { useEffect, useState } from 'react'
import { mintingAddress, mintingAbi } from "../utils/contract/mintingContract"
import { tokenAddress, tokenAbi } from "../utils/contract/tokenContract"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from "react-toastify";
export const Tabs = ({ displayTabs, connectWallets }) => {
    const [tokenPrice, setTokenPrice] = useState(0)
    const [tokenSupply, setTokenSupply] = useState(0)
    const [skeletonToken, setSkeletonToken] = useState(false)
    const [getBalanceToken, setGetBalanceToken] = useState(0)
    const [loading, setLoading] = useState(false);
    const integrateContract = () => {
        const web3 = window.web3;
        const minting_Contract = new web3.eth.Contract(
            mintingAbi,
            mintingAddress
        );
        return minting_Contract;
    };
    const integrateTokenContract = () => {
        const web3 = window.web3;
        const token_Contract = new web3.eth.Contract(
            tokenAbi,
            tokenAddress
        );
        return token_Contract;
    };
    const getValue = async () => {
        try {
            if (connectWallets == "Connect Wallet") {

            } else if (connectWallets == "Wrong Network") {
            } else {
                const web3 = window.web3;
                setSkeletonToken(true)
                let contract = integrateContract()
                let getBalancesByTokenType = await contract.methods.getBalancesByTokenType(connectWallets).call()
                if (displayTabs == 0) {
                    setGetBalanceToken(Number(getBalancesByTokenType[0]))
                } else if (displayTabs == 1) {
                    setGetBalanceToken(Number(getBalancesByTokenType[1]))
                } else {
                    setGetBalanceToken(Number(getBalancesByTokenType[2]))
                }
                let tokenTypePrice = await contract.methods.tokenTypePrice(displayTabs).call()
                tokenTypePrice = Number(tokenTypePrice)
                const etherBalance = web3.utils.fromWei(tokenTypePrice, 'ether');
                setTokenPrice(etherBalance)
                let tokenTypeSupply = await contract.methods.tokenTypeSupply(displayTabs).call()
                tokenTypeSupply = Number(tokenTypeSupply)
                setTokenSupply(tokenTypeSupply)
                setSkeletonToken(false)
            }
        } catch (e) {
            console.log("e", e);
            setSkeletonToken(false)
        }
    }

    const handleApprove = async () => {
        try {
            if (connectWallets == "Connect Wallet") {
                toast.error("Please Connect wallet first")
            } else if (connectWallets == "Wrong Network") {
                toast.error("Please Connect Goerli network")
            } else {
                setLoading(true)
                let contract = integrateContract()
                let tokenContract = integrateTokenContract()
                let tokenTypePrice = await contract.methods.tokenTypePrice(displayTabs).call();
                let balanceOf = await tokenContract.methods.balanceOf(connectWallets).call()
                balanceOf = Number(balanceOf)
                tokenTypePrice = Number(tokenTypePrice)
                if(tokenTypePrice <=balanceOf){
                    let approve = await tokenContract.methods.approve(mintingAddress, tokenTypePrice)
                    .send({
                        from: connectWallets
                    })
                if (approve) {
                    toast.success("Approved successfully.")
                    setLoading(false)
                }
                } else{
                    toast.success("insufficient user balance")
                    setLoading(false)
                }
               
            }
        } catch (e) {
            console.log("e", e);
            setLoading(false)
        }
    }

    const handleMint = async () => {
        try {
            if (connectWallets == "Connect Wallet") {
                toast.error("Please Connect wallet first")
            } else if (connectWallets == "Wrong Network") {
                toast.error("Please Connect Goerli network")
            } else {
                setLoading(true)
                let contract = integrateContract()
                let tokenContract = integrateTokenContract()
                let tokenTypePrice = await contract.methods.tokenTypePrice(displayTabs).call();
                tokenTypePrice = Number(tokenTypePrice)
                let allowance = await tokenContract.methods.allowance(connectWallets, mintingAddress).call()
                allowance = Number(allowance)
                console.log("allowance", allowance);
                console.log("tokenTypePrice", tokenTypePrice);
                if(allowance >= tokenTypePrice){
                    let mint = await contract.methods.mint(displayTabs)
                    .send({
                        from: connectWallets
                    })
                    console.log("mint", mint);
                    if(mint){
                        toast.success("user Mint successfully.")
                        setLoading(false)
                        getValue()
                    }
                } else{
                    toast.error("user Minting not yet")
                    setLoading(false)
                }
               
            }
        } catch (e) {
            console.log("e", e);
            setLoading(false)
        }
    }


    useEffect(() => {
        getValue()
    }, [displayTabs, connectWallets])

    return (
        <>
            {
                loading ? (<div>
                    <div className="load-wrapp">
                        <div className="load-9">
                            <div className="spinner">
                                <div className="bubble-1"></div>
                                <div className="bubble-2"></div>
                            </div>
                        </div>
                    </div>
                </div>) : (
                    <></>
                )
            }
            <div className='container mt-5'>
                <div className='row d-flex justify-content-between'>
                    <div className='col-md-4 box-width mt-3' >
                        <span className='token-supply'>Token Price</span>
                        <span className='token-supply-value'>{skeletonToken ? <Skeleton count={1} /> : tokenPrice}</span>
                    </div>
                    <div className='col-md-4 box-width mt-3' >
                        <span className='token-supply'>NFT Supply</span>
                        <span className='token-supply-value'>{skeletonToken ? <Skeleton count={1} /> : tokenSupply}</span>
                    </div>
                    <div className='col-md-4 box-width mt-3' >
                        <span className='token-supply'>User NFT Balance</span>
                        <span className='token-supply-value'>{skeletonToken ? <Skeleton count={1} /> : getBalanceToken}</span>
                    </div>
                </div>


                <div className='row'>
                    <div className='col-12 down-boxWIwith'>
                        <div className='row  mt-4'>
                            <div className='bePqrO col-md-8'>
                                <input className='OFFdK' placeholder='Enter Address' readOnly value={tokenAddress} />
                            </div>
                            <div className='bePqrO col-md-8'>
                                <input className='OFFdK' placeholder='Enter Token ID' readOnly value={displayTabs} />
                            </div>
                        </div>

                        <div className='row  d-flex justify-content-center ' >
                            <div className='col-md-8 '>
                                <div className='row d-flex justify-content-around'>
                                    <div className='col-md-5 mb-3'>
                                        <div className="d-grid gap-2">
                                            <button className='btn btn-approve' size="lg" onClick={handleApprove}>
                                                Approve
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col-md-5 mb-3'>
                                        <div className="d-grid gap-2">
                                            <button className='btn btn-approve' size="lg" onClick={handleMint}>
                                                Mint
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
