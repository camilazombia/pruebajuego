export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Mundo Mágico - Backend API</h1>
      <p>Backend funcionando correctamente.</p>
      <ul>
        <li>POST /api/auth/register</li>
        <li>POST /api/auth/signin (NextAuth)</li>
        <li>GET /api/user/me</li>
        <li>GET /api/progress</li>
        <li>GET /api/admin/users (admin only)</li>
        <li>GET /api/mongodb/init</li>
      </ul>
    </main>
  );
}
