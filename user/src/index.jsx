import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <React.StrictMode>
      <PersistGate persistor={persistor} >
        <Router >
            <App/>
        </Router>
      </PersistGate>
    </React.StrictMode>
    </Provider>
  
);
reportWebVitals();