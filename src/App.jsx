import React from 'react'

import {createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom"
import Layout from './Componets/Layout/Layout'

import NotFound from './Componets/NotFound/NotFound';
import CustomerTable from './Componets/CustomerTable/CustomerTable';
import Graph from './Componets/Graph/Graph';



let routes = createHashRouter(
  [{
    path: '/', element: <Layout/>,children:[
      {index:true,element: <CustomerTable/>},
    {path: "Customer-Transactions",element: <CustomerTable/>},
    {path: "graph",element: <Graph/>},
    {path: "*",element: <NotFound/>},   
    
  ]
  }]
)

export default function App() {
  return <>
     <RouterProvider router={routes}> 
     </RouterProvider>
  </>

  
}
