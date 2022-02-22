import Navbar from "../components/Navbar";

const Task = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center min-h-screen pt-14 text-white bg-gradient-to-br from-sky-800 via-purple-800 to-pink-800">
        <div className="w-6/12 h-96 mt-16 bg-gray-800">Tasks</div>
      </div>
    </>
  );
};

export default Task;
