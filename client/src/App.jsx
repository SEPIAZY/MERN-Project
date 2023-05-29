import { memo } from 'react';
import classes from './pages/landing.module.css';
import resets from './components/_resets.module.css';
import { landing } from './components/landing/landing.jsx';

const App = memo(function App(props = {}) {
  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <landing />
    </div>
  );
});

export default App;
