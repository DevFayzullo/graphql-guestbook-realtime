import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { QUERY_MESSAGES, MUTATION_ADD, SUB_MESSAGE_ADDED } from "./graphql";

export default function App() {
  const [name, setName] = useState("Guest");
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); // 'all' | 'mine'

  const { data, loading, error } = useQuery(QUERY_MESSAGES, {
    variables: { limit: 30, offset: 0 },
  });

  const [addMessage, addState] = useMutation(MUTATION_ADD);

  // Append new messages in real-time
  useSubscription(SUB_MESSAGE_ADDED, {
    onData: ({ client, data }) => {
      const msg = data.data?.messageAdded;
      if (!msg) return;
      // update cache: prepend new message
      const prev = client.readQuery({
        query: QUERY_MESSAGES,
        variables: { limit: 30, offset: 0 },
      });
      client.writeQuery({
        query: QUERY_MESSAGES,
        variables: { limit: 30, offset: 0 },
        data: { messages: [msg, ...(prev?.messages || [])].slice(0, 30) },
      });
    },
  });

  const onSend = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    await addMessage({
      variables: { name: name.trim(), text: text.trim() },
      optimisticResponse: {
        addMessage: {
          __typename: "Message",
          id: `temp-${Date.now()}`,
          name: name.trim(),
          text: text.trim(),
          createdAt: new Date().toISOString(),
        },
      },
      update: (cache, { data }) => {
        const newMsg = data?.addMessage;
        if (!newMsg) return;
        const prev = cache.readQuery({
          query: QUERY_MESSAGES,
          variables: { limit: 30, offset: 0 },
        });
        cache.writeQuery({
          query: QUERY_MESSAGES,
          variables: { limit: 30, offset: 0 },
          data: { messages: [newMsg, ...(prev?.messages || [])].slice(0, 30) },
        });
      },
    });
    setText("");
  };

  const messages = data?.messages || [];
  const filtered = useMemo(() => {
    if (filter === "mine")
      return messages.filter((m) => m.name === name.trim());
    return messages;
  }, [messages, filter, name]);

  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: 24,
        fontFamily: "Inter, system-ui, Arial",
      }}>
      <h1>📝 GraphQL Guestbook (Realtime)</h1>

      <form
        onSubmit={onSend}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr auto",
          gap: 8,
          marginBottom: 16,
        }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Say hello..."
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid #ddd",
          }}
        />
        <button
          type="submit"
          disabled={addState.loading}
          style={{
            padding: "10px 14px",
            borderRadius: 8,
            border: "1px solid #2563eb",
            background: addState.loading ? "#93c5fd" : "#2563eb",
            color: "white",
            cursor: addState.loading ? "not-allowed" : "pointer",
          }}>
          {addState.loading ? "Sending..." : "Send"}
        </button>
      </form>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #0ea5e9",
            background: filter === "all" ? "#0ea5e9" : "transparent",
            color: filter === "all" ? "white" : "#0ea5e9",
            cursor: "pointer",
          }}>
          All
        </button>
        <button
          onClick={() => setFilter("mine")}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #0ea5e9",
            background: filter === "mine" ? "#0ea5e9" : "transparent",
            color: filter === "mine" ? "white" : "#0ea5e9",
            cursor: "pointer",
          }}>
          Mine
        </button>
      </div>

      {loading && <p>⏳ Loading...</p>}
      {error && <p style={{ color: "crimson" }}>❌ {error.message}</p>}

      <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 8 }}>
        {filtered.map((m) => (
          <li
            key={m.id}
            style={{
              border: "1px solid #eee",
              borderRadius: 10,
              padding: 12,
              background: "#fafafa",
            }}>
            <div style={{ fontSize: 14, opacity: 0.7 }}>
              <b>{m.name}</b> • {new Date(m.createdAt).toLocaleString()}
            </div>
            <div style={{ marginTop: 4 }}>{m.text}</div>
          </li>
        ))}
      </ul>

      {!loading && filtered.length === 0 && (
        <p style={{ opacity: 0.7 }}>No messages yet.</p>
      )}
    </div>
  );
}
