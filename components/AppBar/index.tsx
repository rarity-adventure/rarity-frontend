import { Popover } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDiscord,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

export default function AppBar(): JSX.Element {
  return (
    <header className="flex-shrink-0 w-full text-white">
      <Popover as="nav" className="z-10 w-full bg-transparent header-border-b">
        <>
          <div className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center uppercase">
                <a
                  href={"/"}
                  className="uppercase text-xl p-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis md:p-3 whitespace-nowrap"
                >
                  <h1>RARITY ANALYTICS</h1>{" "}
                </a>
              </div>
              <div className="fixed bottom-0 left-0 z-10 flex flex-row items-center justify-center w-full p-4 lg:w-auto bg-custom-background lg:relative lg:p-0 lg:bg-transparent">
                <a
                  className="p-2 mx-2 bg-custom-selected border-white border-2"
                  target="_blank"
                  rel="noreferrer"
                  href="https://ftmscan.com/address/0x5eC86d4d826bF3e12Ee2486B9dF01d7CFa99B6Ca"
                >
                  Donate
                </a>
                <a
                  className="mx-2 text-3xl"
                  href="https://twitter.com/RarityGame"
                >
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a
                  className="mx-2 text-3xl"
                  href="https://discord.gg/NUrfGsUkmd"
                >
                  <FontAwesomeIcon icon={faDiscord} />
                </a>
                <a
                  className="mx-2 text-3xl"
                  href="https://github.com/rarity-adventure"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
              </div>
            </div>
          </div>
        </>
      </Popover>
    </header>
  );
}
