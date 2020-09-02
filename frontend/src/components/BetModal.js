import React, {useCallback} from 'react';
import Modal from 'react-bootstrap/Modal'

const  BetModal = ({show, setShow, betId}) => {
    const handleClose = useCallback(() => {
        setShow(false);
    }, [setShow]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bet N{betId}</Modal.Body>
        </Modal>
    );
};

export default BetModal;