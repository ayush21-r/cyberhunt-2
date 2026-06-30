fetch("http://localhost:5000/api/v1/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ agentId: "AGENT_ALPHA", accessKey: "secret123" })
})
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
