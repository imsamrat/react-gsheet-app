import React, { useState } from "react";
import Papa from "papaparse";

const MerchantList = () => {
  const [data, setData] = useState({});

  
  const [q, setQ] = useState("");
  const [searchParam] = useState(["merchantName", "shopId"]);
  Papa.parse(
    "https://docs.google.com/spreadsheets/d/1yMdYTyauOPJoRf-c-mXMT-OAhDp3kVZdEMFWgJFS-G4/pub?output=csv",
    {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
      },
    }
  );
  const items = Array.from(data);

  const searchResult =(items) => {
    return items.filter((item) => {
        return searchParam.some((newItem) => {
            return (
                item[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(q.toLowerCase()) > -1
            );
        });
    });
} 
  return (
    <>
      <div className="wrapper">
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              value={q}
              /*
                                // set the value of our useState q
                                //  anytime the user types in the search box
                                */
              onChange={(e) => setQ(e.target.value)}
            />
            <span className="sr-only">Search Merchant here</span>
          </label>
        </div>
        <ul className="card-grid">
          <p>Total Merchant: {items.length}</p>
          {searchResult(items).map((item) => (
            <li>
              <article className="card" key={data.item}>
                <div className="card-image">
                  {/* <img src={item.flag} alt={item.name} /> */}
                </div>
                <div className="card-content">
                  <h2 className="card-name">{item.merchantName}</h2>
                  <ol className="card-list">
                    <li>
                      Shop Id: <span>{item.shopId}</span>
                    </li>
                    <li>
                      KAM Name: <span>{item.kamName}</span>
                    </li>
                  </ol>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </>
    // <ul>
    //   {movies.map((data) => (
    //     <li key={data.movie}>
    //       {data.merchantName} ({data.shopId}) - KAM {data.kamName}
    //     </li>
    //   ))}
    // </ul>
  );
};

export default MerchantList;
