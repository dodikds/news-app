//import useState and useEffect
import { useState, useEffect } from 'react';

//import api
import Api from '../../api';

//import js cookie
import Cookies from 'js-cookie';

//import layout
import LayoutDefault from "../../layouts/Default";

//import permissions
import hasAnyPermission from '../../utils/Permissions.jsx';

//import pagination component
import Pagination from "../../components/Pagination";

export default function SlidersIndex() {

    //title page
    document.title = "Sliders - NewsApp Administartor";

    //define state "sliders"
    const[sliders, setSliders] = useState([]);

    //define state "pagination"
    const[pagination, setPagination] = useState({
        currentPage: 0,
        perPage: 0,
        total: 0
    });

    //token from cookies
    const token = Cookies.get('token');

    //function fetchData
    const fetchData = async (pageNumber=1) => {

        //define variable "page"
        const page = pageNumber ? pageNumber : pagination.currentPage;

        await Api.get(`/api/admin/sliders?page=${page}`, {

            //header
            headers: {
                //header Bearer + Token
                Authorization: `Bearer ${token}`,
            }
        })
            .then(response => {

                //set data response to state "setSliders"
                setSliders(response.data.data.data);

                //set data pagination to state "pagination"
                setPagination(() => ({ 
                    currentPage: response.data.data.current_page,
                    perPage: response.data.data.per_page,
                    total: response.data.data.total
                }));

            })

    }

    //useEffect
    useEffect(() => {

        //call function "fetchData"
        fetchData();

    }, []);

    return (
        <LayoutDefault>
            <div className="container-fluid mb-5 mt-5">
                <div className="row mt-1">
                    <div className="col-md-12">
                        <div className="card border-0 shadow">
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered table-centered mb-0 rounded">
                                        <thead className="thead-dark">
                                            <tr className="border-0">
                                                <th className="border-0" style={{ width: '5%' }}>No.</th>
                                                <th className="border-0">Image</th>
                                                <th className="border-0">Link</th>
                                                <th className="border-0" style={{ width: '15%' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                //cek apakah data ada
                                                sliders.length > 0

                                                //looping data "sliders" dengan "map"
                                                ?   sliders.map((slider, index) => (
                                                        <tr key={index}>
                                                            <td className="fw-bold text-center">{++index + (pagination.currentPage-1) * pagination.perPage}</td>
                                                            <td className="text-center">
                                                                <img src={slider.image} width="70"/>
                                                            </td>
                                                            <td>{slider.link}</td>
                                                            <td className="text-center">

                                                                {hasAnyPermission(['sliders.delete']) &&
                                                                    <button className="btn btn-danger btn-sm"><i className="fa fa-trash"></i></button>
                                                                }

                                                            </td>
                                                        </tr>
                                                    ))
                                                
                                                    //tampilkan pesan data belum tersedia
                                                :   <tr>
                                                        <td colSpan={4}>
                                                            <div className="alert alert-danger border-0 rounded shadow-sm w-100" role="alert">
                                                                Data Belum Tersedia!.
                                                            </div>
                                                        </td>
                                                    </tr>

                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination 
                                    currentPage={pagination.currentPage} 
                                    perPage={pagination.perPage} 
                                    total={pagination.total} 
                                    onChange={(pageNumber) => fetchData(pageNumber, keywords)}
                                    position="end"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDefault>
    )
}