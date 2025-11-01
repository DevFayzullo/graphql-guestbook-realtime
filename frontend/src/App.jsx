import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { useMemo, useState } from "react";
import { QUERY_MESSAGES, MUTATION_ADD, SUB_MESSAGE_ADDED } from "./graphql";

export default function App() {
  const [name, setName] = useState("Admin");
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all");

  const { data, loading, error } = useQuery(QUERY_MESSAGES, {
    variables: { limit: 30, offset: 0 },
  });

  const [addMessage, addState] = useMutation(MUTATION_ADD, {
    optimisticResponse: {
      addMessage: {
        __typename: "Message",
        id: `temp-${Date.now()}`,
        name,
        text,
        createdAt: new Date().toISOString(),
      },
    },
    update: (cache, { data }) => {
      const newMsg = data?.addMessage;
      if (!newMsg) return;
      const vars = { limit: 30, offset: 0 };
      const prev = cache.readQuery({
        query: QUERY_MESSAGES,
        variables: vars,
      }) || {
        messages: [],
      };

      if (prev.messages.some((m) => m.id === newMsg.id)) return;

      cache.writeQuery({
        query: QUERY_MESSAGES,
        variables: vars,
        data: {
          messages: [newMsg, ...prev.messages].slice(0, 30),
        },
      });
    },
  });

  useSubscription(SUB_MESSAGE_ADDED, {
    onData: ({ client, data }) => {
      const msg = data.data?.messageAdded;
      if (!msg) return;
      const vars = { limit: 30, offset: 0 };
      const prev = client.readQuery({
        query: QUERY_MESSAGES,
        variables: vars,
      }) || {
        messages: [],
      };

      if (prev.messages.some((m) => m.id === msg.id)) return;

      client.writeQuery({
        query: QUERY_MESSAGES,
        variables: vars,
        data: {
          messages: [msg, ...prev.messages].slice(0, 30),
        },
      });
    },
  });

  const onSend = async (e) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;
    await addMessage({
      variables: { name: name.trim(), text: text.trim() },
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
    <div className="min-h-screen bg-linear-to-b from-slate-100 via-slate-100 to-slate-200 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white/60 backdrop-blur shadow-xl rounded-2xl border border-white/50 overflow-hidden">
        <header className="px-6 py-5 border-b border-slate-200 flex items-center justify-between gap-4 bg-white/70">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-slate-900 flex items-center gap-2">
              🪶 GraphQL Guestbook
              <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                Realtime
              </span>
            </h1>
            <p className="text-sm text-slate-500">
              Query • Mutation • Subscription • Optimistic UI
            </p>
          </div>
          <div className="hidden md:flex text-xs text-slate-400 gap-2">
            <span>HTTP: /graphql</span>
            <span>WS: /graphql</span>
          </div>
        </header>

        <form
          onSubmit={onSend}
          className="px-6 pt-5 pb-3 flex flex-col md:flex-row gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full md:w-1/5 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            placeholder="Your name"
          />
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300"
            placeholder="Say something..."
          />
          <button
            type="submit"
            disabled={addState.loading}
            className="md:w-auto w-full bg-sky-500 disabled:bg-sky-300 hover:bg-sky-600 transition text-white text-sm font-medium px-5 py-2 rounded-xl shadow-sm">
            {addState.loading ? "Sending..." : "Send"}
          </button>
        </form>

        <div className="px-6 pb-2 flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-xs rounded-full border transition ${
              filter === "all"
                ? "bg-sky-100 text-sky-700 border-sky-200"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            }`}>
            All
          </button>
          <button
            onClick={() => setFilter("mine")}
            className={`px-3 py-1.5 text-xs rounded-full border transition ${
              filter === "mine"
                ? "bg-sky-100 text-sky-700 border-sky-200"
                : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
            }`}>
            Mine
          </button>
        </div>

        <div className="px-6 pb-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {loading && <p className="text-sm text-slate-400">Loading...</p>}
          {error && <p className="text-sm text-red-500">❌ {error.message}</p>}

          {!loading && filtered.length === 0 && (
            <p className="text-sm text-slate-400 text-center py-12">
              No messages yet. Be the first ✨
            </p>
          )}

          {filtered.map((m) => {
            const isMine = m.name === name.trim();
            return (
              <div
                key={m.id}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`rounded-2xl px-4 py-2.5 max-w-[80%] shadow-sm ${
                    isMine
                      ? "bg-sky-500 text-white rounded-br-sm"
                      : "bg-slate-50 text-slate-900 rounded-bl-sm border border-slate-100"
                  }`}>
                  <div
                    className={`flex items-center gap-2 text-[11px] mb-1 ${
                      isMine ? "text-sky-100/90" : "text-slate-400"
                    }`}>
                    <span className="font-semibold">{m.name}</span>
                    <span>
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-sm leading-snug whitespace-pre-wrap">
                    {m.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
