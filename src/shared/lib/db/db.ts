// src/shared/lib/db/db.ts
import Dexie, { Table } from 'dexie';

export class AppDatabase extends Dexie {
  users!: Table<User>;
  sessions!: Table<AuthSession>;
  worldProgress!: Table<WorldProgress>;
  missionProgress!: Table<MissionProgress>;
  userRewards!: Table<UserReward>;
  flashcards!: Table<Flashcard>;
  playSessions!: Table<PlaySession>;
  settings!: Table<AppSettings>;

  constructor() {
    super('EnglishKidsDB');
    
    this.version(1).stores({
      users: 'id, name, age, createdAt',
      sessions: 'code, deviceId, userId, isActive',
      worldProgress: 'worldId, userId, [userId+worldId]',
      missionProgress: 'missionId, userId, status, [userId+missionId]',
      userRewards: 'rewardId, userId, [userId+rewardId]',
      flashcards: 'id, word, category, worldId',
      playSessions: 'id, userId, startTime',
      settings: 'id',
    });
  }
}

export const db = new AppDatabase();
```

## 🔄 Flujo de Navegación Básico
```
1. Landing (/) 
   → Click "Ingresar"
   
2. Login (/login)
   → Ingresa código único
   → Valida dispositivo (deviceId vs código)
   → Si es primera vez: redirige a /family-access
   → Si ya existe sesión: redirige a /welcome
   
3. Family Access (/family-access)
   → Completa formulario de niño
   → Acepta consentimientos
   → Crea usuario en IndexedDB
   → Redirige a /welcome
   
4. Welcome (/welcome)
   → Video loop de bienvenida
   → Click "Jugar" → redirige a /home
   
5. Home (/home)
   → Hub principal con accesos
   → Click "Jugar" o "Mundos" → /worlds
   
6. Worlds Map (/worlds)
   → Muestra grid de mundos
   → Click en mundo desbloqueado → /worlds/:worldId/missions
   
7. Missions Map (/worlds/:worldId/missions)
   → Muestra camino de misiones
   → Click en misión disponible → /missions/:missionId
   
8. Mission (/missions/:missionId)
   → Ejecuta actividades secuencialmente
   → Al finalizar: muestra resultado con estrellas
   → Actualiza progreso en IndexedDB
   → Desbloquea siguiente misión si aplica
   → Botón "Continuar" → vuelve a /worlds/:worldId/missions