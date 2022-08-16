import Cell from '../Cell/Cell';
import "./Field.css";

const Field = ({ name, field, onclick }: {
    name: string,
    field: number[][],
    onclick: Function
}) => {

    const topHeader = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const leftHeader = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ж', 'З', 'И', 'К'];

    return (
        <div className='field'>
            <div className='title'>{name}</div>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            {topHeader.map((item, index) => {
                                return <th className='header-top' key={index}>{item}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {field.map((items, y) => {
                            return (
                                <tr key={`tr${y}`} className='cell-row'>
                                    <td key={`td${y}`} className='header-left'>{leftHeader[y]}</td>
                                    {items.map((item, x) =>
                                        <td key={`td${y}${x}`} >
                                            <Cell key={`cell${y}${x}`} onclick={onclick} coord={{ y: y, x: x }}>{item}</Cell>
                                        </td>)
                                    }
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div >
        </div>

    )
}

export default Field;