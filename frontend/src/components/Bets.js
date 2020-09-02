import React, {useCallback, useState} from 'react';
import Table from 'react-bootstrap/Table'
import BetModal from './BetModal';

const  Bets = ({rows}) => {
    const [show, setShow] = useState(false);
    const [betId, setBetId] = useState();

    const handleClick = useCallback((id) => () => {
        setBetId(id);
        setShow(true);
    }, []);
    
    const handleTableHeader = useCallback(() => {
        if (rows.length === 0) return null;

        const header = Object.keys(rows[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        });
    }, [rows]);

    const handleTableData = useCallback(() => {
        if (rows.length === 0) return null;

        return rows.map(item => {
            const { id, user, time, bet, multiplier, game } = item;
            return (
                <tr key={id} onClick={handleClick(id)}>
                    <td>{id}</td>
                    <td>{user}</td>
                    <td>{time}</td>
                    <td>{bet}</td>
                    <td>{multiplier}</td>
                    <td>{game}</td>
                </tr>
            )
        })
    }, [handleClick, rows]);

    return (
        <>
            <Table striped bordered hover size="sm">
                <tbody>
                <tr>{handleTableHeader()}</tr>
                {handleTableData()}
                </tbody>
            </Table>
            <BetModal betId={betId} setShow={setShow} show={show}/>
        </>
    );
};

export default Bets;