import MemberForm from "./component/MemberForm";
import "./App.css";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-300">
      <header className="bg-blue-800 text-white p-4 shadow">
        <h1 className="text-4xl font-bold text-center">ทำเนียบสมาชิกสภาผู้แทนราษฎร</h1>
      </header>

      <main className="p-6">
        <MemberForm />
      </main>

      <footer className="bg-gray-300 text-gray-700 text-center p-4 mt-10"></footer>
    </div>
  );
}
