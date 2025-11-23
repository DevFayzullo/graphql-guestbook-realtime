import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { QUERY_MESSAGES, MUTATION_ADD, SUB_MESSAGE_ADDED } from "./graphql";

const VARS = { limit: 30, offset: 0 };

export default function App() {
  
  const [name, setName] = useState("Guest");
  const [text, setText] = useState("");
  
  const [filter, setFilter] = useState("all");
  const { data, loading, error } = useQuery(QUERY_MESSAGES, {
    variables: VARS,
    fetchPolicy: "network-only",
  });

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (data?.messages) {
      setMessages(data.messages);
    } else if (data?.getMessages) {
      setMessages(data.getMessages);
    }
  }, [data]);

  const [addMessage, { loading: sending }] = useMutation(MUTATION_ADD, {
    onCompleted: (res) => {
      const newMsg = res?.addMessage ?? res?.createMessage;
      if (!newMsg) return;
      setMessages((prev) => {
        if (prev.some((m) => m.id === newMsg.id)) return prev;
        return [newMsg, ...prev].slice(0, VARS.limit);
      });
    },
  });

  useSubscription(SUB_MESSAGE_ADDED, {
    onData: ({ data: subData }) => {
      const msg = subData?.data?.messageAdded;
      if (!msg) return;
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [msg, ...prev].slice(0, VARS.limit);
      });
    },
  });

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedText = text.trim();
    if (!trimmedName || !trimmedText) return;
    try {
      await addMessage({ variables: { name: trimmedName, text: trimmedText } });
      setText("");
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending the message.");
    }
  };

  const displayedMessages = useMemo(() => {
    if (filter === "mine") {
      const me = name.trim();
      return messages.filter((m) => m.name === me);
    }
    return messages;
  }, [messages, filter, name]);

   return (
    <div>
      {/* Outer container controlling the page background and text colours */}
      <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <div className="w-full max-w-4xl">
          <div className="relative bg-white/85 dark:bg-slate-900/75 border border-slate-200/80 dark:border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 pt-6 pb-4 border-b border-slate-200/70 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-linear-to-br from-violet-500 to-indigo-500 flex items-center justify-center shadow-md">
                  <span className="text-white text-xl">⚡</span>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
                    GraphQL Guestbook
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Realtime messages • Apollo • Subscriptions • Optimistic UI
                  </p>
                </div>
              </div>
              {/* Theme toggle removed. The application now automatically
                  follows the browser’s colour scheme preference. */}
            </div>

            {/* Body */}
            <div className="px-6 sm:px-8 pb-7 pt-4 space-y-5">
              {/* Top controls: name input and filter buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Your name
                  </span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3 py-1.5 text-sm rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400/70 focus:border-transparent"
                    placeholder="Type your name"
                  />
                </div>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-500 dark:text-slate-400">
                    Filter:
                  </span>
                  <div className="inline-flex rounded-full bg-slate-100/80 dark:bg-slate-800/80 p-0.5 border border-slate-200 dark:border-slate-700">
                    <button
                      type="button"
                      onClick={() => setFilter("all")}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        filter === "all"
                          ? "bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-slate-100"
                          : "text-slate-500 dark:text-slate-400"
                      }`}>
                      All
                    </button>
                    <button
                      type="button"
                      onClick={() => setFilter("mine")}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        filter === "mine"
                          ? "bg-white dark:bg-slate-900 shadow-sm text-slate-900 dark:text-slate-100"
                          : "text-slate-500 dark:text-slate-400"
                      }`}>
                      Mine
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages list */}
              <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/40 shadow-inner max-h-80 overflow-y-auto">
                {loading && (
                  <div className="p-5 text-sm text-slate-500 dark:text-slate-400">
                    Loading messages…
                  </div>
                )}
                {error && (
                  <div className="p-5 text-sm text-rose-500">
                    Error loading messages.
                  </div>
                )}
                {!loading && !error && displayedMessages.length === 0 && (
                  <div className="p-6 text-sm text-slate-500 dark:text-slate-400">
                    No messages yet. Try being the first to write 😉
                  </div>
                )}

                <ul className="divide-y divide-slate-200/70 dark:divide-slate-800">
                  {displayedMessages.map((msg) => (
                    <li
                      key={msg.id}
                      className="px-4 sm:px-5 py-3.5 flex gap-3 hover:bg-white/60 dark:hover:bg-slate-900/70 transition">
                      <div className="mt-1">
                        <div className="h-8 w-8 rounded-2xl bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-xs font-semibold text-white shadow-sm">
                          {msg.name?.[0]?.toUpperCase() || "?"}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-medium text-slate-900 dark:text-slate-50">
                            {msg.name}
                          </span>
                          <span className="text-[10px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
                            {msg.createdAt
                              ? new Date(msg.createdAt).toLocaleTimeString(
                                  undefined,
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )
                              : ""}
                          </span>
                        </div>
                        <p className="mt-0.5 text-sm text-slate-700 dark:text-slate-200 wrap-break-word">
                          {msg.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Message form */}
              <form
                onSubmit={handleSend}
                className="mt-2 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/85 dark:bg-slate-900/85 px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-end shadow-sm">
                <div className="flex-1 flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Your message
                  </label>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={2}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-950/40 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400/70 focus:border-transparent"
                    placeholder="Write something nice…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending || !text.trim()}
                  className="sm:self-end h-10 px-5 rounded-xl text-sm font-semibold inline-flex items-center justify-center bg-linear-to-r from-indigo-500 to-violet-500 text-white shadow-md hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition">
                  {sending ? "Sending…" : "Send 🚀"}
                </button>
              </form>

              <p className="text-[10px] text-slate-400 dark:text-slate-500 text-right">
                Connected via Apollo Client • HTTP + WebSocket
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
