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
            <h1>Bienvenido a My Goals</h1>
            <p>Administra tus metas personales fácilmente.</p>
        </div>
    );
}

function TasksPage() {
    return (
        <div className="tasks-page" style={{ padding: '20px' }}>
            <TaskForm />
            <TaskItem />
        </div>
    );
}

function GoalsPage() {
    return (
        <div className="tasks-page" style={{ padding: '20px' }}>
            <GoalForm />
            <GoalItem />
        </div>
    );
}


function App() {
    return (
        <>
            <Menu />
            <Routes>
                <Route path="/goals" element={<GoalsPage />} />
                <Route path="/tasks" element={<TasksPage />} />
            </Routes>
        </>
    );
}

export default App;
