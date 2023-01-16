import type { Window as KeplrWindow, Keplr, Key, ChainInfo } from '@keplr-wallet/types'
import { SigningStargateClient } from '@cosmjs/stargate'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

class KeprlController {
  private keprl?: Keplr
  private signingClient?: SigningStargateClient
  private address?: string
  private feeAmount = '5000'
  private feeGas = '200000'

  init(): void {
    if (!window.keplr) {
      alert('You need to install Keplr')
      return
    }

    this.keprl = window.keplr
    return
  }

  async enable(chainIds: string | string[]): Promise<void> {
    this.keprl?.enable(chainIds)
  }

  async getKey(chainId: string): Promise<Key | undefined> {
    return this.keprl?.getKey(chainId)
  }

  async suggestChain(chainInfo: ChainInfo): Promise<void> {
    this.keprl?.experimentalSuggestChain(chainInfo)
  }

  async getMyWalletData(chainId: string, rpcUrl: string, denom: string) {
    const offlineSigner = window.getOfflineSigner?.(chainId)

    if (!offlineSigner) {
      return
    }

    this.signingClient = await SigningStargateClient.connectWithSigner(rpcUrl, offlineSigner)
    console.log(this.signingClient)
    const accounts = await offlineSigner.getAccounts()
    const [account] = accounts
    const { address } = account
    this.address = address
    const coin = await this.signingClient.getBalance(address, denom)
    const myBalance = coin.amount

    return { myAddress: address, myBalance }
  }

  async submitTransaction(recipient: string, amount: number, denom: string) {
    if (!this.signingClient || !this.address) {
      return
    }

    const amountFinal = {
      denom,
      amount: Math.floor(amount * 1000000).toString(),
    }

    const fee = {
      amount: [
        {
          denom,
          amount: this.feeAmount,
        },
      ],
      gas: this.feeGas,
    }

    const result = await this.signingClient.sendTokens(this.address, recipient, [amountFinal], fee)
    console.log(result)
  }
}

export default new KeprlController()
