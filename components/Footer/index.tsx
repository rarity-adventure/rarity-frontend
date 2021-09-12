import useActiveWeb3React from "../../hooks/useActiveWeb3React";

const Footer = () => {
  const { chainId } = useActiveWeb3React();

  return <footer className="flex-shrink-0 w-full"></footer>;
};

export default Footer;
