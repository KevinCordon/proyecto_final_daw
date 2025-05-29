import './App.scss';
import Menu from './components/Navbar/navbar';

function App() {
    return (
        <div className="App">
            <Menu />  {/* Navbar arriba */}

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                padding: '0 20px',
                textAlign: 'center',
                backgroundColor: '#f8f9fa'
            }}>
                <div>
                    <h1>Bienvenido a My Goals</h1>
                    <p>
                        Este proyecto te ayuda a gestionar tus metas y tareas personales de manera sencilla.
                        Puedes agregar, ver y eliminar tus metas con una interfaz fácil de usar.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
