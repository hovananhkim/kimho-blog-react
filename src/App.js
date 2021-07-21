import Layout from 'antd/lib/layout/layout';
import './App.css';
import ContentLayout from './components/Body/ContentLayout';
import HeaderLayout from './components/Navbar/HederLayout';
function App() {
  return (
    <div className="App">
      <Layout>
        <HeaderLayout />
        <ContentLayout />
      </Layout>
    </div>
  );
}

export default App;
