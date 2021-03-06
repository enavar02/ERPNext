import React, {useReducer} from 'react';
import PedidoContext from './PedidoContext';
import PedidoReducer from './PedidoReducer';

import{
SELECIONAR_CLIENTE,
SELECIONAR_PRODUCTO,
CANTIDAD_PRODUCTOS,
ACTUALIZAR_TOTAL
} from '../../types';

const PedidoState = ({children}) =>{
    //state de pedidos
    const initialState = {
        cliente: {},
        productos: [],
        total: 0
    }
    const [state, dispatch] = useReducer(PedidoReducer, initialState);

    const agregarCliente = cliente =>{
        //console.log(cliente);
        dispatch({
            type: SELECIONAR_CLIENTE,
            payload: cliente
        })
    }

    //Modificar los productos
    const agregarProducto = productosSeleccionados => {

        let nuevoState;
        if (state.productos === null || productosSeleccionados === null) {
            nuevoState = productosSeleccionados;
        } else {
            if (state.productos.length > 0) {
                //Tomar del segundo arreglo, una copia para asignarlo al primero
                nuevoState = productosSeleccionados.map(producto => {
                    const nuevoObjeto = state.productos.find(productoState => productoState.id === producto.id);
                    return { ...producto, ...nuevoObjeto }
                })
            } else {
                nuevoState = productosSeleccionados;
            }
        }
       console.log(nuevoState);
        dispatch({
            type:SELECIONAR_PRODUCTO,
            payload: nuevoState
        })
    }

    //Modificar las cantidades de los productos
    const cantidadProductos = nuevoProducto => {
        dispatch({
            type: CANTIDAD_PRODUCTOS,
            payload: nuevoProducto
        })
    }

    const actualizarTotal = () =>{
        dispatch({
            type: ACTUALIZAR_TOTAL
            
        })
    }
   
    return(
        <PedidoContext.Provider
        value={{   
            cliente: state.cliente,
            productos: state.productos,
            total: state.total, 
            agregarCliente,
            agregarProducto,
            cantidadProductos,
            actualizarTotal      
        }}>{children}

        </PedidoContext.Provider>
    )
}

export default PedidoState;