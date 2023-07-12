async function addUser(params) {
  const { auth, email, password, displayName } = params;

  const user = await auth.createUser({
    email,
    password,
    displayName,
  });
  return user;
}



//Obtener el usuario xd
async function getUser(params) {
  const { email, auth } = params;

  const user = await auth.getUserByEmail(email);

  return user;
}


//Función actualizar atributos  del usuario con condiciones.

async function updateUser(params) {
  const { auth, newDisplayName, newPassword, email } = params;

  try {
    const user = await getUser({ auth, email });

    const uid = user.uid;
    let resultPassword = null;
    let resultDisplayName = null;

    if (newDisplayName) {
      resultDisplayName = await updateDisplayName({
        newDisplayName,
        uid,
        auth,
      });
    }

    if (newPassword) {
      resultPassword = await updatePassword({ email, newPassword, auth });
    }

    if (!newDisplayName && !newPassword) {
      throw new Error("Error: los campos están vacíos");
    }

    return [resultPassword, resultDisplayName];
  } catch (error) {
    return error;
  }
}



//Actualiza el displayName del usario 
async function updateDisplayName(params) {
  const { newDisplayName, uid, auth } = params;

  const result = await auth.updateUser(uid, {
    displayName: newDisplayName,
  });
  return result;
}


//Si todo va bien retorna un link para reestablecer la contraseña del usuario.
async function updatePassword(params) {
  const { email, auth } = params;

  const result = await auth.generatePasswordResetLink(email);

  return result;
}

module.exports = {
  addUser,
  getUser,
  updateUser,
};
