const todos = [
    {
        id: 100,
        title:"อยากลองเขียนเว็ป",
        checked: true
    },
    {
        id: 200,
        title:"อยากลองขายของ",
        checked: true
    },
    {
        id: 300,
        title:"อยากลองไปเที่ยว",
        checked: true
    }
];

function Item ({ title,chk } : { title: String,chk: boolean }) {
    if(chk)
        return <li className='item'>{title} ✔️</li>;
    else
        return <li className='item'>{title}</li>
}

export default function ToDoLists() {
    const items = todos.map(item =>
      <Item title={item.title} chk={item.checked} />
    );
    return (
    <>
        <h1>My To Do Lists:</h1>
        <ul>{items}</ul>
        </>
    );
}