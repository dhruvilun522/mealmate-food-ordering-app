import React, { useEffect, useRef } from 'react'
import { Usecart, Usedispatch } from './Contextreducer';
import { useState } from 'react';

export default function Card(props) {

    let options = props.options;
    let priceop = Object.keys(options);
    let fooditem = props.fooditems;
    const ref = useRef();
    let dispatch = Usedispatch();
    let data = Usecart();
    const [qty, setqty] = useState(1);
    const [size, setsize] = useState("");
    const addtocart = async () => {

        let food = []
        for (const item of data) {
            if (item.id === fooditem._id) {
                food = item;

                break;
            }
        }
        if (food !== []) {
            if (food.size === size) {
              await dispatch({ type: "UPDATE", id: fooditem._id, price:totprice, qty: qty })
              return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: fooditem._id, name: fooditem.name, price: totprice, qty: qty, size: size, img: fooditem.img });
                return
              }
              return
        }


        await dispatch({ type: "ADD", id: fooditem._id, name: fooditem.name, price: totprice, qty: qty, size: size, img: fooditem.img });
        console.log(data);

    }
    let totprice = qty * parseInt(options[size]);

    useEffect(() => {
        setsize(ref.current.value)
    }, [])

    return (
        <div>
            <div>
                <div className="card mt-3 mb-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img src={fooditem.img} className="card-img-top" style={{ height: "120px", objectFit: "fill" }} alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{fooditem.name}</h5>
                        <div className='container w-100'>
                            <select className='m-2 h-100 bg-success rounded' onChange={(e) => setqty(e.target.value)}>
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1} > {i + 1}</option>
                                    )
                                })}

                            </select>
                            <select className='m-2 h-100 bg-success rounded' ref={ref} onChange={(e) => setsize(e.target.value)}>
                                {
                                    priceop.map((data) => {
                                        return (
                                            <option key={data} value={data} >{data}</option>
                                        )
                                    })
                                }

                            </select>
                            <div className='d-inline h-100 fs-5'>
                                rs. {totprice}

                            </div>

                        </div>
                        <hr />
                        <button className='btn btn-success justify-center m-2' onClick={addtocart}>add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
