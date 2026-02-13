import Header from "../../components/header";
import DashboardComponent from "../../components/dashboard/components/index.jsx";
import { TaskProvider } from "../../store/task-store/index.jsx";

export default function DashboardPage() {
  return (
    <TaskProvider>

    <div className="h-screen overflow-auto bg-primary">
      <Header />
      <div className="">
        <DashboardComponent/>
      </div>
    </div>
    </TaskProvider>
  );
}
