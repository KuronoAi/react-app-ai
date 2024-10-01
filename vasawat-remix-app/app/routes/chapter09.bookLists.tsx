import { useState, useEffect } from "react";
import { useNavigate  } from "@remix-run/react";
import { l } from "node_modules/vite/dist/node/types.d-aGj9QkWt";
import { fetchData } from "@remix-run/react/dist/data";
export default function BookFists(){
    const navigate = useNavigate();
    const [relStatus, setStatus] = useState(true);
    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async() => {
                const data= await fetch(
                    'http://localhost:3000/api/getBooks'
                );
                if(data.ok){
                    const myJson = await data.json();
                    setBooksData(myJson);
                }else{
                    alert('[ERR] เกิดข้อผิดพลาดหลังจากโหลดข้อมูล');
                }
            };
            fetchData();
            setStatus(false);
        }catch (error){
            alert('[ERR] เกิดข้อผิดพลาดระหว่างการโหลดข้อมูล');
        }
      
    }, [relStatus]);

    if(!Array.isArray(booksData)){
        return <div className="m-5">[ERR] ข้อมูลที่อ่านไม่ใช่รูปแบบของ  Array</div>;
    }
    const handleDelete = (bookCode) => {
        alert (`กำลังลบหนังสือรหัส: ${bookCode}`);
        try {
            const fetchData = async() => {
                const data = await fetch(
                    `http://localhost:3000/api/deleteBook/${bookCode}`,
                    { 
                        method: 'DELETE'
                    }
                );
                if(data.ok){
                    const myJson = await data.json();
                    alert(myJson.message);
                }else{
                    alert('[ERR] การลบข้อมูลไม่สำเร็จ!!');
                }
                
            }
             fetchData();
            setStatus(true);
        } catch (error) {
            alert('[ERR] เกิดข้อผิดพลาดในระหว่างการลบข้อมูล!!');
        }
    }
    
    return (
        <div className="m-3">
            <h1 className="font-bold text-xxl">รายการหนังสือในร้าน</h1>
            {
               booksData.length === 0?(
                <div className="p-3">[INFO] ไม่มีหนังสือในร้าน</div>
               ) : (
                booksData.map((item, index) =>
                    <div key={index} className="m-2 p-3 border-2">
                        {item.bookTitle}<br/>
                        <a href={`/chapter09/bookDetail/${item.bookCode}`}>[Detail]</a> |
                        <a href={`/chapter09/bookEditForm/${item.bookCode}`}>[Edit]</a> |
                        <a href="#" onClick={(e) => handleDelete(`${item.bookCode}`)}>[Delete]</a>
                    </div>
                )
               )
            }
        </div>
    );
}