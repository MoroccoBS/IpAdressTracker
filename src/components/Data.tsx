import "../App.css";
interface DataProps {
  ipAddress: string;
  Location: string[];
  TimeZone: string;
  ISP: string;
}

function Data({ ipAddress, Location, TimeZone, ISP }: DataProps) {
  return (
    <>
      <div className="data absolute z-20 lg:w-4/6 w-5/6 h-fit rounded-2xl flex flex-col md:flex-row bg-white shadow-2xl lg:top-[40vh] top-[35vh] left-1/2 m-auto -translate-x-1/2 -translate-y-1/2">
        <div className="items-center md:justify-start md:items-start w-full h-full lg:py-8 lg:px-7 py-4 px-3 flex flex-col gap-2 justify-center">
          <h4 className="text-DarkGray uppercase text-xs font-bold tracking-widest">
            Ip Address
          </h4>
          {ipAddress === "" ? (
            <h1 className="lg:text-2xl text-lg font-medium tracking-wider">
              8.8.8.8
            </h1>
          ) : (
            <h1 className="lg:text-2xl text-xl font-medium tracking-wider">
              {ipAddress}
            </h1>
          )}
        </div>
        <div className=" items-center md:justify-start md:items-start w-full h-full lg:py-8 lg:px-7 py-4 px-3 flex flex-col gap-2 justify-center">
          <h4 className="text-DarkGray uppercase text-xs font-bold tracking-widest">
            Location
          </h4>
          {Location[0] === "" && Location[1] === "" ? (
            <h1 className="lg:text-2xl text-xl font-medium tracking-wider">
              US, California, Mountain View
            </h1>
          ) : (
            <h1 className="lg:text-2xl text-xl font-medium tracking-wider">
              {Location[0] + ", " + Location[1] + ", " + Location[2]}
            </h1>
          )}
        </div>
        <div className=" items-center md:justify-start md:items-start w-full h-full lg:py-8 lg:px-7 py-4 px-3 flex flex-col gap-2 justify-center">
          <h4 className="text-DarkGray uppercase text-xs font-bold tracking-widest">
            TimeZone
          </h4>
          {TimeZone === "" ? (
            <h1 className="lg:text-2xl text-xl font-medium tracking-wider">
              UTC -07:00
            </h1>
          ) : (
            <h1 className="lg:text-2xl text-xl font-medium tracking-wider">
              UTC {TimeZone}
            </h1>
          )}
        </div>
        <div className=" items-center md:justify-start md:items-start w-full h-full lg:py-8 lg:px-7 py-4 px-3 flex flex-col gap-2 justify-center">
          <h4 className="text-DarkGray uppercase text-xs font-bold tracking-widest">
            Ips
          </h4>
          {ISP === "" ? (
            <h1 className="lg:text-2xl text-xl font-medium tracking-wider">
              Google LLC
            </h1>
          ) : (
            <h1 className="lg:text-2xl text-xl font-medium tracking-wider">
              {ISP}
            </h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Data;
