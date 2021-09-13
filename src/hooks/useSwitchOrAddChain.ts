import { useCallback } from "react";

export interface AddEthereumChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName: string;
    nativeCurrency: {
      name: string;
      symbol: string; // 2-6 characters long
      decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[]; // Currently ignored.
  }

export function useSwitchOrAddChain(): (params: AddEthereumChainParameter) => Promise<boolean>{
    return useCallback(async (params: AddEthereumChainParameter) => {
        if(window.ethereum && window.ethereum.request){
            return window.ethereum.request({method: "wallet_switchEthereumChain", params: [{
              chainId: params.chainId
            }]}).then(() => true).catch((switchError) => {
              if(switchError.code === 4902){
                if(window.ethereum && window.ethereum.request){
                  return window.ethereum?.request({
                    method: "wallet_addEthereumChain",
                    params: [params]
                  }).then(res => true).catch(addError => {
                    console.debug(`Can not add network: ${addError.message}`)
                    return false;
                  })
                }
              }
              console.debug(`Can not switch network: ${switchError.message}`)
              return false
            })
        }
        console.debug("Can not switch network: Window.ethereum is undefined")
        return false
    
    }, [])
}