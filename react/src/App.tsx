import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ApenasUmTest } from './components/apenas-test'
import { ComponentClass } from './components/component-class'
import Relogio from './components/clock'
import { ReducerCount } from './components/reducer-count'
import { ThemeProvider } from './contexts/theme-context'
import { ContextBTN } from './components/context-btn'
import { Counter } from './components/counter'
import { UserList } from './components/user-list'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider>
      <div>
        <UserList />
        <Counter />
        <ReducerCount />
        <Relogio />
        <ApenasUmTest />
        <ComponentClass title="Apenas um testes" />
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <ContextBTN />
    </ThemeProvider>
  )
}

export default App
