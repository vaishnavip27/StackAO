import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createDataItemSigner, message } from "@permaweb/aoconnect";

export default function JoinPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage on component mount
    const connected = localStorage.getItem("walletConnected") === "true";
    setWalletConnected(connected);
  }, []);

  const handleJoinClick = () => {
    if (walletConnected == false) {
      connectWallet();
    }

    console.log("inside handleJoinClick");

    Register();
    navigate("/join");

    async function Register() {
      const signer = createDataItemSigner(window.arweaveWallet);

      const msg = await message({
        process: "sY6Yn2-zHdTtxwGhN0osNcecM3Gz1m_AtZwK-XjKpI0",
        signer,
        tags: [{ name: "Action", value: "Register" }],
      });
    }
  };

  async function connectWallet() {
    try {
      await window.arweaveWallet.connect([
        "ACCESS_ADDRESS",
        "SIGN_TRANSACTION",
      ]);
      localStorage.setItem("walletConnected", "true");
      setWalletConnected(true);
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  }

  async function disconnectWallet() {
    try {
      await window.arweaveWallet.disconnect();
      localStorage.setItem("walletConnected", "false");
      setWalletConnected(false);
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  }

  return (
    <div>
      <div className="nav-bar">
        <button onClick={walletConnected ? disconnectWallet : connectWallet}>
          {walletConnected ? "Disconnect Wallet" : "Connect Wallet"}
        </button>
      </div>
      <div className="flex">
        <div className="heading">
          Let the community clear your doubts, with StackAO
        </div>
      </div>
      <button className="join" onClick={handleJoinClick}>
        Join Community
      </button>
    </div>
  );
}
