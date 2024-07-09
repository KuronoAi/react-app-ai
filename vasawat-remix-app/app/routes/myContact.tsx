function MyProfile () {
    const name = "วสวัตติ์ หาญสาริกิจ";
    const profile = "/image/progile.jpg";
    const info = "นักศึกษาปี 2 สาขา เทคโนโลยีสารสนเทศ คณะบริหารธุริกิจและเทคโนโลยีสารสนเทศ ";
  
      return (
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <img className="w-full" src={profile} title={name} />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{name}</div>
      <p className="text-gray-700 text-base">
        {info}
      </p>
    </div>
    <div className="px-6 pt-4 pb-2">
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Black</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Code</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Programing</span>
    </div>
  </div>
      );
  }
  
  export default function MyContact () {
      return (
          <>  
              <h1>MyContact</h1>
              <hr />
              <MyProfile />
          </>
      );
  
  }