import React, { useState } from 'react';
import { OrientationAlert } from '../../shared/ui/OrientationAlert/OrientationAlert';
import { Button } from '../../shared/ui/Button/Button';
import { Input } from '../../shared/ui/Input/Input';
import { motion } from 'framer-motion';
import styles from './ParentZonePage.module.css';

const ParentZonePage: React.FC = () => {
	const [activeSection, setActiveSection] = useState<'dashboard'>('dashboard');
	const [childName, setChildName] = useState('Camila');
	const [childAge, setChildAge] = useState('7-8');
	const [dailyLimit, setDailyLimit] = useState('60');
	const [sessionLimit, setSessionLimit] = useState('30');
	const [timeRestriction, setTimeRestriction] = useState(true);

	const handleSectionChange = (section: typeof activeSection) => {
		setActiveSection(section);
	};

	return (
		<>
		<OrientationAlert />
		<div className={styles.page}>

			{/* Main Content */}
			<main className={styles.mainContent}>
				{/* Dashboard Section */}
				{activeSection === 'dashboard' && (
					<section className={styles.section}>
						{/* Top Summary Cards */}
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
							{/* Card 1: Student Name */}
							<div style={{ background: 'white', borderRadius: '15px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
								<div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>👧</div>
								<h3 style={{ margin: '0.5rem 0', fontSize: '1rem', fontWeight: 'bold' }}>Camila</h3>
								<p style={{ margin: '0', fontSize: '0.85rem', color: '#666' }}>7-8 años</p>
							</div>

							{/* Card 2: Coins */}
							<div style={{ background: 'white', borderRadius: '15px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
								<div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>🪙</div>
								<h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem', fontWeight: 'bold' }}>240</h3>
								<p style={{ margin: '0', fontSize: '0.85rem', color: '#666' }}>Monedas</p>
							</div>

							{/* Card 3: Streak */}
							<div style={{ background: 'white', borderRadius: '15px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
								<div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>🔥</div>
								<h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem', fontWeight: 'bold' }}>24</h3>
								<p style={{ margin: '0', fontSize: '0.85rem', color: '#666' }}>Días seguidos</p>
							</div>

							{/* Card 4: Words */}
							<div style={{ background: 'white', borderRadius: '15px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
								<div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>📚</div>
								<h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem', fontWeight: 'bold' }}>45</h3>
								<p style={{ margin: '0', fontSize: '0.85rem', color: '#666' }}>Palabras</p>
							</div>

							{/* Card 5: Premios */}
							<div style={{ background: 'white', borderRadius: '15px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
								<div style={{ fontSize: '2rem', marginBottom: '0.8rem' }}>🎁</div>
								<h3 style={{ margin: '0.5rem 0', fontSize: '1.5rem', fontWeight: 'bold' }}>3</h3>
								<p style={{ margin: '0', fontSize: '0.85rem', color: '#666' }}>Premios</p>
							</div>
						</div>

						{/* Forms Grid */}
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
							{/* Profile Settings */}
							<div style={{ background: 'white', borderRadius: '15px', padding: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
								<h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>Perfil del Niño</h3>
								<form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
									<Input
										id="child-name"
										label="Nombre del Niño"
										placeholder="Nombre"
										value={childName}
										onChange={(e) => setChildName(e.target.value)}
										type="text"
									/>
									<div>
										<label style={{ display: 'block', marginBottom: '1rem', fontSize: '0.9rem', fontWeight: 'bold', color: '#666' }}>Selecciona la edad</label>
										<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
											{['3-4', '5-6', '7-8'].map((age) => (
												<motion.button
													key={age}
													type="button"
													onClick={() => setChildAge(age)}
													whileHover={{ scale: 1.05 }}
													whileTap={{ scale: 0.95 }}
													style={{
														padding: '1rem',
														borderRadius: '10px',
														border: '2px solid #E0E0E0',
														background: childAge === age ? '#E8F5FF' : 'white',
														borderColor: childAge === age ? '#00A8E8' : '#E0E0E0',
														fontWeight: 'bold',
														fontSize: '0.95rem',
														cursor: 'pointer',
														transition: 'all 0.3s ease',
													}}
												>
													🧒 {age}
												</motion.button>
											))}
										</div>
									</div>
									<Button className={styles.cta} onClick={() => console.log('Guardar perfil')}>
										GUARDAR
									</Button>
								</form>
							</div>

							{/* Time Limits */}
							<div style={{ background: 'white', borderRadius: '15px', padding: '2rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
								<h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.2rem', fontWeight: 'bold' }}>Límites de Tiempo</h3>
								<form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
									<Input
										id="daily-limit"
										label="Límite diario (minutos)"
										placeholder="60"
										value={dailyLimit}
										onChange={(e) => setDailyLimit(e.target.value)}
										type="number"
									/>
									<Input
										id="session-limit"
										label="Duración máxima de sesión (minutos)"
										placeholder="30"
										value={sessionLimit}
										onChange={(e) => setSessionLimit(e.target.value)}
										type="number"
									/>
									<label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
										<input 
											type="checkbox" 
											checked={timeRestriction}
											onChange={(e) => setTimeRestriction(e.target.checked)}
											style={{ cursor: 'pointer', width: '18px', height: '18px' }} 
										/>
										<span style={{ fontSize: '0.9rem', color: '#666' }}>Activar restricción de tiempo</span>
									</label>
									<Button className={styles.cta} onClick={() => console.log('Guardar límites')}>
										GUARDAR
									</Button>
								</form>
							</div>
						</div>
					</section>
				)}
			</main>
		</div>
		</>
	);
};

export default ParentZonePage;