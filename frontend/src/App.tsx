import './App.css';
import { BookCarousel } from './components/books';
// import {Greet} from "../wailsjs/go/main/App";

function App() {
    // const [resultText, setResultText] = useState("Please enter your name below 👇");
    // const [name, setName] = useState('');
    // const updateName = (e: any) => setName(e.target.value);
    // const updateResultText = (result: string) => setResultText(result);


    return (
        <div id="App">
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-8">Welcome to the App</h1>
            <nav className="space-x-4">
                <a href="/" className="text-blue-600 hover:text-blue-800">Home</a>
                <a href="/book" className="text-blue-600 hover:text-blue-800">Book</a>
                <BookCarousel />
            </nav>
        </div>

        </div>
    )
}

export default App
