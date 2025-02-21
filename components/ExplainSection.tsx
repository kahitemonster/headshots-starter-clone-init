export default function ExplainSection () {
  const numbers = [];

  for (let i = 1; i <= 4; i++) {
    numbers.push(i);
  }

  return (
    <div className="flex flex-col items-center gap-8 p-8 max-w-6xl w-full mt-20">
      <div className="space-y-4 w-full">
        <h1 className="text-5xl font-bold text-center">Upload selfies and start taking AI photos now</h1>
      </div>
      <div className="flex sm:flex-col lg:flex-row md:flex-row flex-col items-center">
        <div className="md:w-1/2 lg:w-1/2 block p-10">
          {numbers.map((number) => {
            return (
              <div className="w-1/2 inline-block p-2" key={`explain${number}`}>
                <img
                  src={`/explain/${number}.jpg`}
                  className="rounded-[20px]"
                >
                </img>
              </div>
            )
          })}
        </div>
        <div className="sm:w-full md:w-1/2 lg:w-1/2 p-12">
          <img
            src="/explain/explain.jpg"
          ></img>
        </div>
      </div>
    </div>
  )
}