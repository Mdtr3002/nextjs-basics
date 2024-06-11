import { ConnectButton } from "@rainbow-me/rainbowkit";

export const ConnectBtn = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className="text-black border-[1px] border-black hover:bg-[#4285f4] hover:text-white p-2 rounded-lg hover:border-white"
                    onClick={openConnectModal}
                    type="button"
                  >
                    Connect MetaMask Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return <div className="text-black">Loading...</div>;
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
