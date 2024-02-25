import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import IssueDetailPage from './pages/IssueDetailPage';
import './App.css'

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainPage />
	},
	{
		path: '/:issueId',
		element: <IssueDetailPage />
	}
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
