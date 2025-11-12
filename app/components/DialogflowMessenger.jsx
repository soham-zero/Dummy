"use client";

import { useEffect } from "react";

export default function DialogflowMessenger() {
  useEffect(() => {
    if (!document.querySelector('script[src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"]')) {
      const s = document.createElement("script");
      s.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
      s.async = true;
      document.head.appendChild(s);
    }
  }, []);


  const agentId = process.env.NEXT_PUBLIC_DF_AGENT_ID;

  if (!agentId) return null;

  return (
    <df-messenger
      intent="WELCOME"
      chat-title="CompareFi Assistant"
      agent-id={agentId}
      language-code="en"
    ></df-messenger>
  );
}