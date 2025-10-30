import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { QUERY_MESSAGES, MUTATION_ADD, SUB_MESSAGE_ADDED } from "./graphql";

export default function App() {
  const [name, setName] = useState("Guest");
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const { data, loading, error } = useQuery(QUERY_MESSAGES, {
    variables: { limit: 30, offset: 0 },
  });

  const [addMessage, addState] = useMutation(MUTATION_ADD);

  useSubscription(SUB_MESSAGE_ADDED, {
    onData: ({ client, data }) => {
      const msg = data.data?.messageAdded;
      if (!msg) return;

      const vars = { limit: 30, offset: 0 };
      const prev = client.readQuery({ query: QUERY_MESSAGES, variables: vars });

      if (
        prev?.messages?.some(
          (m) =>
            m.id === msg.id ||
            (m.id?.startsWith?.("temp-") &&
              m.name === msg.name &&
              m.text === msg.text)
        )
      )
        return;

      client.writeQuery({
        query: QUERY_MESSAGES,
        variables: vars,
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
        const deduped = (prev?.messages || []).filter(
          (m) =>
            !(
              m.id === newMsg.id ||
              (m.id?.startsWith?.("temp-") &&
                m.name === newMsg.name &&
                m.text === newMsg.text)
            )
        );
        cache.writeQuery({
          query: QUERY_MESSAGES,
          variables: { limit: 30, offset: 0 },
          data: { messages: [newMsg, ...deduped].slice(0, 30) },
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
        margin: "40px auto",
        padding: 24,
        fontFamily: "Inter, system-ui, sans-serif",
        background: "white",
        borderRadius: 20,
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
      }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: 20,
          fontWeight: 600,
          fontSize: "1.8rem",
        }}>
        🪶 GraphQL Guestbook <span style={{ opacity: 0.6 }}>(Realtime)</span>
      </h1>

      <form
        onSubmit={onSend}
        style={{
          display: "flex",
          gap: 10,
          marginBottom: 20,
          alignItems: "center",
        }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
          }}
        />
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Say something..."
          style={{
            flex: 3,
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #e2e8f0",
            background: "#f8fafc",
          }}
        />
        <button
          type="submit"
          disabled={addState.loading}
          style={{
            padding: "10px 20px",
            borderRadius: 10,
            border: "none",
            background: addState.loading ? "#93c5fd" : "#2563eb",
            color: "white",
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}>
          {addState.loading ? "..." : "Send"}
        </button>
      </form>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          justifyContent: "center",
        }}>
        {["all", "mine"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            style={{
              padding: "8px 16px",
              borderRadius: 20,
              border: "1px solid #2563eb",
              background: filter === t ? "#2563eb" : "transparent",
              color: filter === t ? "white" : "#2563eb",
              cursor: "pointer",
              transition: "0.2s",
            }}>
            {t === "all" ? "All" : "Mine"}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((m) => (
          <div
            key={m.id}
            style={{
              alignSelf: m.name === name.trim() ? "flex-end" : "flex-start",
              maxWidth: "80%",
              background: m.name === name.trim() ? "#2563eb" : "#f1f5f9",
              color: m.name === name.trim() ? "white" : "#0f172a",
              borderRadius: 14,
              padding: "10px 14px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            }}>
            <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>
              <b>{m.name}</b> • {new Date(m.createdAt).toLocaleTimeString()}
            </div>
            <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
          </div>
        ))}

        {!loading && filtered.length === 0 && (
          <p style={{ textAlign: "center", opacity: 0.6 }}>
            No messages yet ✨
          </p>
        )}
      </div>
    </div>
  );
}
