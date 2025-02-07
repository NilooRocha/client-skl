// src/middlewares/authMiddleware.ts
import { router } from 'expo-router';

import { getRefreshToken } from '~/lib/secureStore';

export const authMiddleware = async () => {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    router.push('/(auth)/login'); // Redireciona para o login se o refresh token não estiver presente
  }

  // Verificar expiração do refresh token aqui, se necessário (por exemplo, com JWT)
  // Caso o refresh token seja inválido ou expirado, faça o logout e redirecione
};
