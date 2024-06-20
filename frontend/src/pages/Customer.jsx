import Button from "../components/Button";
import AllAccount from "../components/AllAccount";

export default function Customer() {
  return (
    <div>
      <div>
        <Button 
          classname="bg-blue-500 p-2 m-2"
          text="See Customer"
        />
      </div>
      <div className="bg-blue-200 flex items-center gap-y-2 h-[400px] w-1/2 m-auto shadow-lg flex-col">
        <h2 className="text-2xl font-bold mt-2">Customer</h2>
        <div className="mt-4 overflow-y-auto max-h-[300px] w-full px-4 m-2 shadow-inner">
          <AllAccount />
          <AllAccount />
          <AllAccount />
          <AllAccount />
          <AllAccount />
          <AllAccount />
          <AllAccount />

          
        </div> 
      </div>
    </div>
  );
}
