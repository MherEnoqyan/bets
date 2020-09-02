import React, { useState, useEffect, useCallback } from "react";
import { useSelector  , useDispatch } from 'react-redux'
import socketIOClient from "socket.io-client";
import Counter from './components/Counter';
import Bets from './components/Bets';
import './App.css';

const ENDPOINT = "http://127.0.0.1:4001";

const  App = () => {
  const dispatch = useDispatch();
  const {items, updateItems} = useSelector(state => state.bets);

  const [counter, setCounter] = useState(100);
  const [rows, setRows] = useState([]);

  const handleUpdate = useCallback(() => {
    updateItems.forEach(item => {
        setTimeout(() => {
          setCounter(item.id);
          setRows(prevRows => {
            prevRows.pop();
            return [item, ...prevRows];
          });
        }, 0);
    });
  }, [updateItems]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("initialBets", data => {
      setRows(data);
    });
    socket.on("bets", data => {
      dispatch({ type: 'ADD_ITEMS', payload: data });
    });
  }, [dispatch]);

  useEffect(() => {
    let interval;
    
    if (interval && items.length === 0) {
      clearInterval(interval);
    } else if (!interval && items.length > 0) {
      interval = setInterval(() => {
        dispatch({type: 'UPDATE_ITEMS'});
        handleUpdate();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [items.length, handleUpdate, dispatch]);

  return (
      <div className="bets">
        <Counter counter={counter} />
        <Bets rows={rows} />
      </div>
  );
};

export default App;