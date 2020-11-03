import React from 'react';
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper/index";
import {Link} from "react-router-dom";

const AdminDashboard = () =>{

    const {user : {name, email, role}} = isAuthenticated();

    const adminLeft = () =>{
        return(
            <div className="card">
            <h3 className="card-header bg-dark text-white">Admin Navigation</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/create/category">Create Category</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/categories">Manage Category</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/create/product">Create Products</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/orders">Manage Orders</Link>
                </li>
                <li className="list-group-item">
                    <Link className="nav-link text-info" to="/admin/products">Manage Products</Link>
                </li>
            </ul>
            </div>
        )};

    const adminRight = () =>{
        return(
            <div className ="card mb-4">
                <h4 className="card-header">Admin information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Name:</span> {name}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-success mr-2">Email:</span> {email}
                    </li>
                    <li className="list-group-item">
                        <span className="badge badge-danger mr-2">Admin Area</span>
                    </li>
                </ul>
        </div>
        )};
    
    return(
        <Base className="container bg-info p-4" title="Welcome to Admins area" description="Manage all of your products here!!">
            <div className="row">
                <div className="col-3">{adminLeft()}</div>
                <div className="col-9">{adminRight()}</div>
            </div>
        </Base>
    )
}

export default AdminDashboard;