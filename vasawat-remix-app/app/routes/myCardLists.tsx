import { useState } from "react";

let nextId = 0;


export default function CardLists (){
    const [name, setName ] = useState('');
    const [pos, setPosition ] = useState('');
    const [location, setLocation ] = useState('');
    const [desc, setDesc ] = useState('');
    const [cards, setCards ] = useState([]);

    function handleClickAdd(n:string, p:string, l:string, d:string) {
        console.log("Card List: ",cards);
        setCards([
           ...cards,
           {
              id: nextId++,
              name: n,
              position: p,
              location: l,
              desc: d
           }
        ]);
    }
    function handleViewCard(card) {
        alert(`Name: ${card.name}\nPosition: ${card.position}\nDescription: ${card.desc}`);
    }

    return(
        <div>
            <h1>Create Card : </h1>
            <label>Name: </label>
            <input
               name="cName"
               className="border-1"
               onChange={(e) => setName(e.target.value)}
            /><br />
            <label>position: </label>
            <input
               name="cPosition"
               className="border-3"
               onChange={(e) => setPosition(e.target.value)}
            /><br />
             <label>location: </label>
            <input
               name="cLocation"
               className="border-4"
               onChange={(e) => setLocation(e.target.value)}
            /><br />
            <label>Description: </label>
            <textarea
               name="cDesc"
               rows={4}
               cols={50}
               className="border-2" onChange={(e) => setDesc(e.target.value)}/>
            <hr />
            <button onClick={() => handleClickAdd(name,pos,location, desc)}className="border bg-green-300 h-18 w-20">
                Add Card
            </button>
            <hr />
            <h1>My Card Lists: </h1>
            {cards.length === 0 ? (
                <p>No cards available</p>
            ) : (
                <table className="border-collapse border border-gray-200 w-full">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">id</th>
                            <th className="border border-gray-300 p-2">ชื่อ - สกุล</th>
                            <th className="border border-gray-300 p-2">ตำแหน่ง</th>
                            <th className="border border-gray-300 p-2">รายละเอียด</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cards.map(card => (
                            <tr key={card.id}>
                                <td className="border border-gray-300 p-2">{card.id+1}</td>
                                <td className="border border-gray-300 p-2">{card.name}</td>
                                <td className="border border-gray-300 p-2">{card.position}</td>
                                <td className="border border-gray-300 p-2">
                                    <button onClick={() => handleViewCard(card)} className="border bg-green-300 px-2 py-1">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}