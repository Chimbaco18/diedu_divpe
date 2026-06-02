/**
 * FUNCIÓN DE LOGIN ADAPTADA A CONEXIÓN REAL SQL
 * Modificación dentro de: navyspeak/client.js
 */
async function login(email, password) {
  const loginMessage = byId("loginMessage");
  setMessage(
    "loginMessage",
    "Validando credenciales en el servidor...",
    "neutral"
  );

  try {
    // Reemplazamos la búsqueda en array local por una petición HTTP POST al backend
    const response = await fetch("/navyspeak/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!data.success) {
      setMessage("loginMessage", data.message, "error");
      return;
    }

    // Si el backend autoriza, creamos la sesión con los datos reales de la BD
    session = {
      userId: data.user.id,
      mfaVerified: data.user.mfaRequired,
      trustedMfa: false,
    };

    // Guardamos temporalmente el token o estado de sesión
    saveState();

    // Inyectamos los datos reales del usuario en el objeto state para que el resto del archivo dibuje la interfaz
    const userIndex = state.users.findIndex(
      (u) => u.email === normalizeEmail(email)
    );
    if (userIndex !== -1) {
      state.users[userIndex].lastAccess = nowStamp();
    }

    byId("loginForm").reset();
    setMessage("loginMessage", "");

    // Mostramos el portal con los páneles correspondientes a su rol real
    showPortal();
  } catch (error) {
    console.error("Error de comunicación con el backend:", error);
    setMessage(
      "loginMessage",
      "No se pudo establecer conexión con el servidor de la Armada.",
      "error"
    );
  }
}
