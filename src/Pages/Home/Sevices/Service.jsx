
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Service = ({ service }) => {
    const {_id, img,title,price } = service
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" className="p-4 rounded-lg" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                
                <div className="card-actions justify-end">
                <p className="text-xl text-orange-600 font-bold">Price: ${price}</p>
                    <Link to={`/checkout/${_id}`}><button className="text-orange-600"><FaArrowRight></FaArrowRight></button></Link>
                </div>
            </div>
        </div>
    );
};


export default Service;