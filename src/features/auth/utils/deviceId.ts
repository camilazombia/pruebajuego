
// En src/features/auth/utils/deviceId.ts:
export const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    deviceId = nanoid();
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
};

// Validación:
const validateSession = async (code: string): Promise<boolean> => {
  const deviceId = getDeviceId();
  const session = await db.sessions.get({ code, isActive: true });
  
  if (!session) return true; // Primera vez
  if (session.deviceId === deviceId) return true; // Mismo dispositivo
  
  return false; // Código activo en otro dispositivo
};