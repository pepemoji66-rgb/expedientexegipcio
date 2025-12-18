const db = require("./db");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 Usuario conectado:", socket.id);

    // ===============================
    //   UNIRSE A CONVERSACIÓN
    // ===============================
    socket.on("joinConversation", ({ conversationId }) => {
      socket.join(conversationId);

      const sql =
        "SELECT sender_nombre AS senderNombre, content FROM chat_messages WHERE conversation_id = ? ORDER BY created_at ASC";

      db.query(sql, [conversationId], (err, rows) => {
        if (!err) {
          socket.emit("chatHistory", rows);
        }
      });
    });

    // ===============================
    //   ENVIAR MENSAJE
    // ===============================
    socket.on("sendMessage", (data) => {
      const { conversationId, senderId, senderNombre, content } = data;

      const sql =
        "INSERT INTO chat_messages (conversation_id, sender_id, sender_nombre, content) VALUES (?, ?, ?, ?)";

      db.query(
        sql,
        [conversationId, senderId, senderNombre, content],
        () => {
          io.to(conversationId).emit("receiveMessage", {
            senderNombre,
            content
          });
        }
      );
    });

    // ===============================
    //   BORRAR CHAT (🔥 NUEVO)
    // ===============================
    socket.on("clearChat", ({ conversationId }) => {
      const sql = "DELETE FROM chat_messages WHERE conversation_id = ?";

      db.query(sql, [conversationId], (err) => {
        if (err) {
          console.error("❌ Error borrando chat:", err);
          return;
        }

        // Avisar a todos de que el chat está vacío
        io.to(conversationId).emit("chatCleared");
      });
    });

    socket.on("disconnect", () => {
      console.log("🔴 Usuario desconectado:", socket.id);
    });
  });
};
