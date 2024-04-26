import { Ball } from './Ball';
import { Maze } from './Maze';
import { Rectangle } from './Rectangle';

const App = () => (
    <div>
        <h1>Собачка и мячик</h1>
        <Rectangle>
            <Ball />
            <Maze />
        </Rectangle>
    </div>
);

export default App
