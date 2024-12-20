

interface UserTableRowInterface {
  c1: string | number;
  c2: string;
  c3: string;
  c4: string;
  c5: string;
  c6: string;
  c7: string;
  className?:string
}

function UserTableRow({c1,c2,c3,c4,c5,c6,c7,className}:UserTableRowInterface) {
  return (
    <div className={`border w-full flex  px-3  ${className}`}>
      <div className="w-full max-w-[5vw]  p-2">{c1}</div>
      <div className="w-full  p-2">{c2}</div>
      <div className="w-full  p-2">{c3}</div>
      <div className="w-full  p-2">{c4}</div>
      <div className="w-full  p-2">{c5}</div>
      <div className="w-full  p-2">{c6}</div>
      <div className="w-full  p-2">{c7}</div>
    </div>
  );
}

export default UserTableRow;
