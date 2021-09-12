import React, { useMemo } from "react";
import { SUPPORTED_WALLETS, injected } from "../../config/wallets";

import { AbstractConnector } from "@web3-react/abstract-connector";
import Image from "next/image";
import { NetworkContextName } from "../../constants";
import WalletModal from "../../modals/WalletModal";
import Web3Connect from "../Web3Connect";
import { shortenAddress } from "../../functions/format";
import { useWalletModalToggle } from "../../state/application/hooks";
import { useWeb3React } from "@web3-react/core";
import IconWrapper from "../IconWrapper";

function StatusIcon({ connector }: { connector: AbstractConnector }) {
  if (connector === injected) {
    return (
      <Image
        src="/chef.svg"
        alt="Injected (MetaMask etc...)"
        width={20}
        height={20}
      />
    );
  } else if (connector.constructor.name === "WalletConnectConnector") {
    return (
      <IconWrapper>
        <Image
          src="/images/wallets/wallet-connect.png"
          alt={"Wallet Connect"}
          width="16px"
          height="16px"
        />
      </IconWrapper>
    );
  } else if (connector.constructor.name === "LatticeConnector") {
    return (
      <IconWrapper>
        <Image
          src="/images/wallets/lattice.png"
          alt={"Lattice"}
          width="16px"
          height="16px"
        />
      </IconWrapper>
    );
  } else if (connector.constructor.name === "WalletLinkConnector") {
    return (
      <IconWrapper>
        <Image
          src="/images/wallets/coinbase.svg"
          alt={"Coinbase Wallet"}
          width="16px"
          height="16px"
        />
      </IconWrapper>
    );
  } else if (connector.constructor.name === "FortmaticConnector") {
    return (
      <IconWrapper>
        <Image
          src="/images/wallets/fortmatic.png"
          alt={"Fortmatic"}
          width="16px"
          height="16px"
        />
      </IconWrapper>
    );
  } else if (connector.constructor.name === "PortisConnector") {
    return (
      <IconWrapper>
        <Image
          src="/images/wallets/portis.png"
          alt={"Portis"}
          width="16px"
          height="16px"
        />
      </IconWrapper>
    );
  } else if (connector.constructor.name === "KeystoneConnector") {
    return (
      <IconWrapper>
        <Image
          src="/images/wallets/keystone.png"
          alt={"Keystone"}
          width="16px"
          height="16px"
        />
      </IconWrapper>
    );
  }
  return null;
}

function Web3StatusInner() {
  const { account, connector } = useWeb3React();

  const toggleWalletModal = useWalletModalToggle();

  if (account) {
    return (
      <div
        id="web3-status-connected"
        className="flex items-center px-3 py-2 text-sm rounded-lg bg-dark-1000 text-secondary"
        onClick={toggleWalletModal}
      >
        <div className="mr-2">{shortenAddress(account)}</div>
      </div>
    );
  } else {
    return <Web3Connect style={{ paddingTop: "6px", paddingBottom: "6px" }} />;
  }
}

export default function Web3Status() {
  const { active } = useWeb3React();

  const contextNetwork = useWeb3React(NetworkContextName);

  if (!contextNetwork.active && !active) {
    return null;
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal />
    </>
  );
}
