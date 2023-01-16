import React, { useCallback, useState } from 'react'
import styles from './App.module.css'
import KeprlController from '../controllers/keprl/KeprlController'
import { testNetChainInfo } from '../controllers/keprl/testNetChainInfo'

const MIN_AMOUNT = 0
const DENOM = 'uosmo'
const { chainId, rpc } = testNetChainInfo

export const App = () => {
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('')
  const [denom] = useState(DENOM)
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState(0)

  const onChangeRecipient: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setRecipient(e.target.value)
  }, [])

  const onChangeAmount: React.ChangeEventHandler<HTMLInputElement> = useCallback(e => {
    setAmount(Number(e.target.value))
  }, [])

  const onSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async e => {
      e.preventDefault()
      KeprlController.init()

      try {
        await KeprlController.suggestChain(testNetChainInfo)
      } catch {
        alert('Failed to suggest the chain')
      }

      await KeprlController.enable(chainId)
      const myWalletData = await KeprlController.getMyWalletData(chainId, rpc, denom)
      if (myWalletData) {
        setAddress(myWalletData.myAddress)
        setBalance(myWalletData.myBalance)
      }
      await KeprlController.submitTransaction(recipient, amount, denom)
    },
    [denom, recipient, amount],
  )

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Keprl</h1>
      <form onSubmit={onSubmit}>
        <fieldset className={styles.fieldset}>
          <legend>Send Coin</legend>
          <p className={styles.address}>My address: {address}</p>
          <p className={styles.address}>My balance: {balance}</p>
          <p className={styles.address}>Denom: {denom}</p>
          <label className={styles.label}>
            Recipient
            <input className={styles.input} type="text" name="adress" value={recipient} onChange={onChangeRecipient} />
          </label>
          <label className={styles.label}>
            Amount
            <input
              className={styles.input}
              type="number"
              name="amount"
              value={amount}
              min={MIN_AMOUNT}
              onChange={onChangeAmount}
            />
          </label>
          <button className={styles.submitBtn} type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  )
}
