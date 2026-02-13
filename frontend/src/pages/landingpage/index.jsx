import { useSelector } from "react-redux";
import Header from "../../components/header";

export default function  LandingPage() {
  const user = useSelector(state => state.userTask)
  console.log(user)
  return (
    <div className="">
      <Header/>
      DEVDEEP
    </div>
  );
}