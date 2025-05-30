import './App.scss';
import Menu from './components/Navbar/navbar';
import TaskForm from './components/Tasks/TaskForm/taskform';
import TaskItem from './components/Tasks/TaskItem/taskitem';
import GoalForm from './components/Goals/GoalForm/goalform';
import GoalItem from './components/Goals/GoalItem/goalitem';
import { Routes, Route } from 'react-router-dom';

function Landing() {
    return (
        <div className="landing">
            <h1>Bienvenido</h1>
            <p>Administra tus metas personales fácilmente.</p>
            <div className="landing-actions">
                <a href="/goals" className="btn btn-primary">Ver Goals</a>
                <a href="/tasks" className="btn btn-secondary">Ver Tasks</a>
            </div>
        </div>
    );
}

function TasksPage() {
    return (
        <div className="tasks-page" style={{ padding: '20px' }}>
            <h2>Task Management</h2>
            <TaskForm />
            <div className="tasks-list">
                <TaskItem />

            </div>
        </div>
    );
}

function GoalsPage() {
    return (
        <div className="goals-page" style={{ padding: '20px' }}>
            <h2>Goal Management</h2>
            <GoalForm />
            <div className="goals-list">
                <GoalItem />
            </div>
        </div>
    );
}

function App() {
    return (
        <>
            <Menu />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="*" element={<Landing />} />
            </Routes>
        </>
    );
}

export default App;