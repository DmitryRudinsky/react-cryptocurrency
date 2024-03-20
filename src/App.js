import React from 'react';
import "./styles/index.scss"
import { Layout } from 'antd';
import AppHeader from "./components/layout/AppHeader";
import AppSider from "./components/layout/AppSider";
import AppContent from "./components/layout/AppContent";

function App() {
    return (
        <div className="App">
            <Layout>
                <AppHeader/>
                <Layout>
                    <AppSider/>
                    <AppContent/>
                </Layout>
            </Layout>
        </div>
    );
}

export default App;
