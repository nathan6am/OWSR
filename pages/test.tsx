export default function Test() {
  return (
    <div className="pt-20 w-full flex flex-row">
      <div className="h-full max-w-sm bg-elevation-200 flex flex-col p-4 border-r border-light-100 shadow-r">
        <p className="text-light-400 my-4">Dashboard</p>
        <p className="text-light-300 my-4">Dashboard</p>
        <p className="text-light-300 my-4">Dashboard</p>
        <p className="text-light-300 my-4">Dashboard</p>
        <p className="text-light-300 my-4">Dashboard</p>
      </div>
      <div className="grow grid grid-cols-3 gap-4 p-4 bg-elevation-200">
        <div className=" p-4 rounded-lg ">
          <div className="bg-elevation-300 rounded-md shadow overflow-hidden">
            <div className="bg-elevation-300 px-4 py-2 border-b-2 border-light-100">
              <h2>Header</h2>
            </div>
            <div className="p-4">
              <label className="text-light-400 font-medium text-sm ml-1">Input Label</label>
              <input
                placeholder="Input Placeholder"
                className="appearance-none bg-elevation-400 rounded-md py-1 px-3 placeholder-light-300 border-light-100 border w-full box-border focus:ring-1 focus:ring-light-300 focus:border-light-300 ring-offset-0 focus:outline-none mt-1 mb-2"
              />
              <button className="py-1 px-3 bg-light-400 text-elevation-300 rounded-md shadow mr-4 hover:opacity-80 my-2">
                Button A
              </button>
              <button className="py-1 px-3 text-light-300 bg-elevation-500 rounded-md shadow mr-4 hover:bg-elevation-600 hover:text-light-400 my-2">
                Button B
              </button>
              <button className="py-1 px-3 text-light-400 bg-success-500 rounded-md shadow mr-4 hover:bg-success-400 my-2">
                Button C
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
